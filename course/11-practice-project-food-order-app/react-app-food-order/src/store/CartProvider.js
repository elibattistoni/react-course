/*
the goal of this component is to manage the cart context data and provide that
context to all components that want to access it

and this allows us to wrap any component that should get access to the cart data context
withi this CartProvider component
*/
import { useReducer } from "react";
import CartContext from "./cart-context";

const initialCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  // NB concat() adds a new element to an array but it creates a new array, it does not overwrite the original one
  // NB same as push() but push() edits the original array

  if (action.actionType === "ADD_CART_ITEM") {
    // console.log("action.type: ", action.actionType);
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.actionType.amount;
    // return an updated state snapshot
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return initialCartState;
};

const CartProvider = (props) => {
  // we want to manage the "add item" functionality with state, so that this component,
  // and therefore all the components affected by the context,
  // are re-evaluated whenever the cart data changes

  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    initialCartState
  );

  const addItemToCartHandler = (item) => {
    // console.log("addItemToCartHandler: ", addItemToCartHandler);
    dispatchCartAction({ actionType: "ADD_CART_ITEM", item: item });
    // this is linked to MealItem (in the MealItem the addItem function will be called)
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ actionType: "REMOVE_CART_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
