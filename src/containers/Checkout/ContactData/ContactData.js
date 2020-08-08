import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false,
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Alexis Ruiz',
                address: {
                    street: 'Sesame street',
                    zipCode: 67189,
                    country: 'Memexico',
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fast'

        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(error => { this.setState({ loading: false }) });
    }

    render() {
        let form = (<form >
            <input className={classes.Input} type='text' name='name' placeholder='your name'></input>
            <input className={classes.Input} type='text' name='email' placeholder='your email'></input>
            <input className={classes.Input} type='text' name='street' placeholder='your street'></input>
            <input className={classes.Input} type='text' name='postal' placeholder='your postal code'></input>
            <Button btnType='Success'
                clicked={this.orderHandler}
            >ORDER NOW</Button>
        </form>);
        if (this.state.loading === true) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter our contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;