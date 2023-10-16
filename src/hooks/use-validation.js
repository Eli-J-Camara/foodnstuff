import { useState, useReducer } from 'react';

const useValidation = (validateLogic) => {
    const [value, setValue] = useState('');
    const [inputTouched, setInputTouched] = useState(false);
    
    let valueIsValid = validateLogic(value);
    const inputHasError = !valueIsValid && inputTouched;
    
    const inputValueHandler = event => {
        setValue(event.target.value);
    };

    const inputFocusHandler = () => {
        setInputTouched(true);
    };

    const inputReset = () => {
        setValue('');
        setInputTouched(false);
    };

    return {
        value,
        valueIsValid,
        inputHasError,
        inputValueHandler,
        inputFocusHandler,
        inputReset,
    }
};

export default useValidation;