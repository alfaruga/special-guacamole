import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false

            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,

            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email'
                },
                value: '',
                validation: {
                    required: true,
                },
                touched: false,
                valid: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    placeholder: 'none',
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'Cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                valid: false,
                validation: {}
            }
        },
        isValid: false,
        loading: false,

    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const formData = {}
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key]['value'];
        };
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderDta: formData
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(error => { this.setState({ loading: false }) });
    }
    confirmValidation(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }
    changedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.confirmValidation(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let isValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            isValid = updatedOrderForm[inputIdentifier].valid && isValid
        }
        console.log(isValid)

        this.setState({
            orderForm: updatedOrderForm, isValid: isValid
        })
    }

    render() {
        const fromElementsArray = [];
        for (let key in this.state.orderForm) {
            fromElementsArray.push(
                {
                    id: key,
                    config: this.state.orderForm[key],
                }
            )
        }
        let form = (
            <form onSubmit={this.orderHandler} style={{ width: '100%' }}>
                {fromElementsArray.map(formElement => {
                    return (<Input
                        shouldValidated={formElement.config.validation}
                        invalid={!formElement.config.valid}
                        changed={(event) => this.changedHandler(event, formElement.id)}
                        key={formElement.id}
                        touched={formElement.config.touched}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}

                    />)
                })}
                <button disabled={!this.state.isValid}>ORDER NOW</button>
            </form>)

        if (this.state.loading === true) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;