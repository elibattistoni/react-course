import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

/*
The HeaderCartButton returns a button with 3 builtin span components inside:
the first one for the icon, the second one for the text, and the third one for the batch (total amount of items in cart)

the CartIcon component simly contains an SVG
*/

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((accumulator, item) => {
    return accumulator + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClickHandler}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
