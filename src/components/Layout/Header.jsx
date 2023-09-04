import { Fragment } from 'react';
import mealsIMG from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Meals</h1>
                <HeaderCartButton onClick={props.onReveal} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsIMG} alt='Meals Image' />
            </div>
        </Fragment>
    )
};

export default Header;
