import { useContext, useState } from "react";

import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BsFillEmojiFrownFill } from "react-icons/bs";

const Cart = (props) => {
  const [toggleCart, setToggleCart] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const checkoutHandler = () => {
    setToggleCart(true);
  };

  const backHandler = () => {
    setToggleCart(false);
  };

  const context = useContext(CartContext);
  const totalPrice = `$${context.totalPrice.toFixed(2)}`;
  const hasItems = context.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    context.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    context.addItem({ ...item, amount: 1 });
  };

  let backNav = props.onHide;
  toggleCart && (backNav = backHandler);
  didSubmit && (backNav = props.onHide);

  const serveOrderHandler = async (order) => {
    setIsSubmitting(true);
    await fetch(
      "https://foodnstuff-1aa70-default-rtdb.firebaseio.com/customer_orders.json",
      {
        method: "POST",
        body: JSON.stringify(order),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    context.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {context.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartModalContent = (
    <>
      {hasItems ? (
        <>
          {cartItems}
          <div className={classes.actions}>
            <button className={classes.button} onClick={checkoutHandler}>
              Checkout
            </button>
          </div>
        </>
      ) : (
        <div className={classes.actions}>
          <p className={classes.cart_empty_msg}>
            There are no items in your cart. <BsFillEmojiFrownFill />
          </p>
        </div>
      )}
    </>
  );

  const checkOut = (
    <>
      {!didSubmit ? (
        <Checkout onSubmission={serveOrderHandler} />
      ) : (
        <>
          {!isSubmitting ? (
            <div className={classes.order_success_msg}>
              <h2>Your order has been recieved!</h2>
              <p>
                Thank you for shopping on Food n' Stuff. Your order will arrive
                shortly.
              </p>
            </div>
          ) : (
            <p>Sending order data...</p>
          )}
        </>
      )}
    </>
  );

  return (
    <Modal onBackdropClick={props.onHide}>
      <div className={classes.return} onClick={backNav}>
        <IoMdArrowRoundBack />
      </div>
      {!didSubmit && (
        <div className={classes.total}>
          <span>Total Price</span>
          <span>{totalPrice}</span>
        </div>
      )}
      {!toggleCart ? cartModalContent : checkOut}
    </Modal>
  );
};

export default Cart;
