import { PropsWithChildren } from 'react';

import classes from './Card.module.css';

interface CardPropsType extends PropsWithChildren {
    className?: string;
}

const Card = (props: CardPropsType) => {
    return (
        <div className={`${classes.card} ${props.className}`}>
            {props.children}
        </div>
    )
};

export default Card;