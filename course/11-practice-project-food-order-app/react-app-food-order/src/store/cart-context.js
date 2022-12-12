import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
// this context needs to be managed in some component with useState or useReducer
// so that this context can also change over time and can update parts of the application over time
// we could do it in a new compoenet here or in a component in another file: CartProvider
