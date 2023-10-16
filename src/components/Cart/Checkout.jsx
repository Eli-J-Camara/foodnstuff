import { useContext } from "react";
import classes from "./Checkout.module.css";
import CartContext from "../../store/cart-context";
import useValidation from "../../hooks/use-validation";

const emptyCheck = (value) => value.trim() !== "";

const Checkout = (props) => {
  const {
    value: firstName,
    valueIsValid: firstNameIsValid,
    inputHasError: firstNameInputInvalid,
    inputValueHandler: updateFirstNameHandler,
    inputFocusHandler: firstNameFocusHandler,
    inputReset: firstNameReset,
  } = useValidation(emptyCheck);

  const {
    value: lastName,
    valueIsValid: lastNameIsValid,
    inputHasError: lastNameInputInvalid,
    inputValueHandler: updateLastNameHandler,
    inputFocusHandler: lastNameFocusHandler,
    inputReset: lastNameReset,
  } = useValidation(emptyCheck);

  const {
    value: address,
    valueIsValid: addressIsValid,
    inputHasError: addressInvalid,
    inputValueHandler: updateAddressHandler,
    inputFocusHandler: addressFocusHandler,
    inputReset: addressReset,
  } = useValidation(emptyCheck);

  const {
    value: phoneNumber,
    valueIsValid: phoneNumberIsValid,
    inputHasError: phoneNumberInvalid,
    inputValueHandler: updatePhoneHandler,
    inputFocusHandler: phoneNumberFocusHandler,
    inputReset: phoneNumberReset,
  } = useValidation((phoneNumber) => {
    const phoneNumValid = new RegExp(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/);
    return phoneNumValid.test(phoneNumber.trim());
  });

  let formIsValid = false;

  formIsValid =
    firstNameIsValid && lastNameIsValid && addressIsValid && phoneNumberIsValid;

  const context = useContext(CartContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const userData = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      phoneNumber: phoneNumber,
    };

    const customerOrder = {
      user: userData,
      cartItems: context.items,
      totalPrice: context.totalPrice.toFixed(2),
    };

    props.onSubmission(customerOrder);

    firstNameReset();
    lastNameReset();
    addressReset();
    phoneNumberReset();
  };

  const firstNameClass = !firstNameInputInvalid
    ? classes.name_inputs
    : `${classes.name_inputs} ${classes.error}`;
  const lastNameClass = !lastNameInputInvalid
    ? classes.name_inputs
    : `${classes.name_inputs} ${classes.error}`;
  const addressClass = !addressInvalid
    ? classes.info_inputs
    : `${classes.info_inputs} ${classes.error}`;
  const phoneNumberClass = !phoneNumberInvalid
    ? classes.info_inputs
    : `${classes.info_inputs} ${classes.error}`;

  return (
    <form onSubmit={submitHandler} className={classes.checkout_form}>
      <div className={firstNameClass}>
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onBlur={firstNameFocusHandler}
          onChange={updateFirstNameHandler}
        />
        {firstNameInputInvalid && (
          <p className={classes.error_message}>
            Please provide your first name
          </p>
        )}
      </div>
      <div className={lastNameClass}>
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onBlur={lastNameFocusHandler}
          onChange={updateLastNameHandler}
        />
        {lastNameInputInvalid && (
          <p className={classes.error_message}>Please provide your last name</p>
        )}
      </div>
      <div className={addressClass}>
        <label>Address</label>
        <input
          className={classes.contact}
          value={address}
          onBlur={addressFocusHandler}
          onChange={updateAddressHandler}
        />
        {addressInvalid && (
          <p className={classes.error_message}>
            Please provide your address for drivers
          </p>
        )}
      </div>
      <div className={phoneNumberClass}>
        <label>Phone Number</label>
        <input
          type="text"
          className={classes.contact}
          value={phoneNumber}
          onBlur={phoneNumberFocusHandler}
          onChange={updatePhoneHandler}
        />
        {phoneNumberInvalid && (
          <p className={classes.error_message}>
            Please provide your phone number
          </p>
        )}
      </div>
      <button disabled={!formIsValid}>Place Order</button>
    </form>
  );
};

export default Checkout;
