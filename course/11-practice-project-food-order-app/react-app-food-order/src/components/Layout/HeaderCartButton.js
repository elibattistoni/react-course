import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

/*
The HeaderCartButton returns a button with 3 builtin span components inside:
the first one for the icon, the second one for the text, and the third one for the batch (total amount of items in cart)

the CartIcon component simly contains an SVG
*/

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((accumulator, item) => {
    return accumulator + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    // bump effect only if there are n > 0 items in the cart
    if (cartCtx.items.length === 0) return;
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    // 300 because it is the duration of the animation (cfr css)
    // NB even if the button is not going to be removed, it is a best practice
    // NB to clear any timers or side eddects that might be ongoing because you started them in useEffect
    // NB IMPORTANT this timer could be set again before it expires, therefore you MUST clear it!
    // so return the cleanup function:
    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);

  return (
    <button className={btnClasses} onClick={props.onClickHandler}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
