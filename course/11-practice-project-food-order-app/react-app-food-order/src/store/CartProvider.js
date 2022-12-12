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
  if (action.actionType === "ADD_CART_ITEM") {
    // console.log("action.type: ", action.actionType);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // is the newly added item already part of the array items? if so, increase the amount; if not present, add new item
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // concat() adds a new element to an array but it creates a new array, it does not overwrite the original one
      // same as push() but push() edits the original array
      updatedItems = state.items.concat(action.item);
    }

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
