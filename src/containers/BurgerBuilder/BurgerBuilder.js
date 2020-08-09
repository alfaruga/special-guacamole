import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Aux/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        showTotal: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        console.log('[BurgerBuilder] did mount')

        axios.get('ingredients.json')
            .then(response => {
                console.log(response)
                this.setState({
                    ingredients: response.data
                });
            })
            .catch(error => {
                this.setState({ error: true })
            })
    };
    updatePurchaseState(updatedIngredients) {
        const sum = Object.keys(updatedIngredients).map(elem => {
            return updatedIngredients[elem];
        }).reduce((prev, sig) => {
            return prev + sig;
        }, 0);
        this.setState({ purchaseable: sum > 0 })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);

    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) { return }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceReduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceReduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);

    }
    purchaseHandler = () => {
        this.setState({ showTotal: true })
    }
    purchaseCancelHandler = () => {
        this.setState({ showTotal: false })
    }
    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        //Now we need to add the price along with the ingredients, this is done
        //right before we push the query string into the history object
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }
    render() {
        const disabledInfo = { ...this.state.ingredients }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients Can't be loaded</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (<Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    price={this.state.totalPrice}
                    ingredientRemoved={this.removeIngredientHandler}
                    ingredientAdded={this.addIngredientHandler}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable}
                    purchase={this.purchaseHandler} />;

            </Aux>)
            orderSummary = (
                <OrderSummary
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinues={this.purchaseContinueHandler}
                />)
        };

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (<Aux>
            <Modal modalClosed={this.purchaseCancelHandler} show={this.state.showTotal}>
                {orderSummary}
            </Modal>
            {burger}

        </Aux>);
    }
}

export default withErrorHandler(BurgerBuilder, axios);