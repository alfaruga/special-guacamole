import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    let transformedIngredients = null;
    transformedIngredients = props.ingredients ? Object.keys(props.ingredients)/* Makes an array with each ingredient */
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i}/*Concat salad1 salad2 etc*/ type={igKey} />;

            })//[ , ]
        }).reduce((arr, el) => {
            return arr.concat(el)
        }, [])
        : null;

    if (transformedIngredients && transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>

    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'></BurgerIngredient>

        </div>
    );
}
export default burger;