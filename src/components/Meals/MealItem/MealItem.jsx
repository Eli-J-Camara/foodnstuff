import { React, useContext } from 'react';

import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

const MealItem = props => {
    const context = useContext(CartContext);
    const prices = props.price.toFixed(2)

    const addToCartHandler = amount => {
        context.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        });
    };

    return (
        <div className={classes.item}>
            <div className={classes.title__description}>
                <h2>{props.name}</h2>
                <p>{props.description}</p>
            </div>
            <MealItemForm onAddToCart={addToCartHandler} price={prices} id={props.id} />
        </div>
    ) 
}

export default MealItem