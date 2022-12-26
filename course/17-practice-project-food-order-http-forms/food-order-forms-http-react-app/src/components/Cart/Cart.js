import { Fragment, useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

//| IMPORTANT you should not trust client-side data
// NB on the server you should never trust the data you get from a client because validation can always be circumvented
// NB therefore on the backend you want to always validate the incoming data

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [error, setError] = useState(null);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 }); //NB fixed bug
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
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

  // order handler
  const orderHandler = () => {
    setIsCheckout(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  //- submit order handler
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_FIREBASE_API}${process.env.REACT_APP_FIREBASE_ORDERS_TABLE}`,
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Could not submit the cart data!");

      const data = await response.json();
      setDidSubmit(true);
      setIsSubmitting(false);
      // remove all items from cart
      cartCtx.clearCart();
    } catch (err) {
      setError(`💥💥 ${err.message}`);
      setDidSubmit(false);
      setIsSubmitting(false);
    }
  };

  const modalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onClose} onSubmitOrder={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );
  const errorModalContent = <p>{error}</p>;

  return (
    <Modal onClose={props.onClose}>
      {error && errorModalContent}
      {!isSubmitting && !didSubmit && modalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
