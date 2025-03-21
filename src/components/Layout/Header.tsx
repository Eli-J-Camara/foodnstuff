import { Fragment } from 'react';
import mealsIMG from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

//This is a type alias, you could also just use an anonymous type alias in the interface.
type revealFunction = () => void;

interface Reveal {
    onReveal: revealFunction;
}

const Header: React.FC<Reveal>= ({ onReveal }) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Food n' Stuff</h1>
                <HeaderCartButton onClick={onReveal} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsIMG} alt='Meals Image' />
            </div>
        </Fragment>
    )
};

export default Header;
