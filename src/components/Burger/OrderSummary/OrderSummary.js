import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    /*Este componente puede ser funcional, se hizo classbased para 
    ejecutar: 
    componentDidUpdate() {
            console.log('[OrderSummary] WillUpdate')
        }
    Con el objetivo de optimizar la carga del [Modal]. [Modal] 
    ahora solo carga cuando ocurre un cambio en [this.State.show]
    
    */


    render() {


        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(elem => {
                return (<li key={elem}>
                    <span style={{ textTransform: 'capitalize' }}>{elem}</span>:{this.props.ingredients[elem]}
                </li>)
            });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price ${this.props.price.toFixed(2)}</strong> </p>
                <p>Continue to checkout?</p>
                <Button
                    btnType='Danger'
                    clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button
                    btnType='Success'
                    clicked={this.props.purchaseContinues}>Continue</Button>
            </Aux>);
    }
};

export default OrderSummary;