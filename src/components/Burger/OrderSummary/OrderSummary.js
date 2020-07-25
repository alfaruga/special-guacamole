import React from 'react';
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(elem => {
            return (<li key={elem}>
                <span style={{ textTransform: 'capitalize' }}>{elem}</span>:{props.ingredients[elem]}
            </li>)
        }

        )   /* espera un objeto */
    return (<Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p><strong>Total Price ${props.price.toFixed(2)}</strong> </p>
        <p>Continue to checkout?</p>
        <Button
            btnType='Danger'
            clicked={props.purchaseCancelled}>Cancel</Button>
        <Button
            btnType='Success'
            clicked={props.purchaseContinues}>Continue</Button>

    </Aux>)
};

export default orderSummary;