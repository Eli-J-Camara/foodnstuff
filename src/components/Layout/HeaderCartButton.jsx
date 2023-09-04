import { React, useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context'
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const context = useContext(CartContext);
    const { items } = context;
    const num_items = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);


    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (context.items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300)

        return () => {
            clearTimeout(timer);
        };
    }, [items]);
    
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{num_items}</span>
        </button>
    )
}

export default HeaderCartButton;