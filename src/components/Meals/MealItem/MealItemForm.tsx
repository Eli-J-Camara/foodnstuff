import { useRef, useState } from 'react';

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

type addToCartType = (amount: number) => void;

interface mealFormProps {
    id: string;
    //The toFixed(); method makes this to a string.
    price: string;
    onAddToCart: addToCartType;
}

const MealItemForm = (props: mealFormProps) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef<HTMLInputElement | null>(null);
  
    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (amountInputRef.current) {
            const enteredAmount = amountInputRef.current.value;
            const enteredAmountNumber = +enteredAmount;

            if (
                enteredAmount.trim().length === 0 || 
                enteredAmountNumber < 1 || 
                enteredAmountNumber > 5
            ) {
                setAmountIsValid(false);
                return;
            }
            props.onAddToCart(enteredAmountNumber);
        }
        
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef}
                label="Amount"
                input={{
                    id: "amount_" + props.id,
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                }}
            />
            <button>${props.price}</button>
            {!amountIsValid && <p>Please enter a valid amount that is between 1 & 5.</p>}
        </form>
    );
};

export default MealItemForm;
