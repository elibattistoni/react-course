import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// import { uiActions } from "./store/ui-slice"; //% refactored: moved into an action creator in cart-slice.js

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import {
  sendCartDataActionCreator,
  retrieveCartDataActionCreator,
} from "./store/cart-actions";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  /*
  //% refactored: moved into an action creator in cart-slice.js
  //% this is if instead of using an action creator, you want to use useEffect inside of this component
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data.",
        })
      );
      const dbUrl =
        "https://fir-shopping-cart-redux-async-default-rtdb.europe-west1.firebasedatabase.app/cart.json";
      const response = await fetch(dbUrl, {
        method: "PUT",
        body: JSON.stringify(cart),
      });
      if (!response.ok) throw new Error("Sending cart data failed!");

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    });
  }, [cart, dispatch]);
  */

  //% if we want to use the action creator (thunk) cart-slice
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) dispatch(sendCartDataActionCreator(cart));
  }, [cart, dispatch]);

  //% for retrieving data from the DB
  useEffect(() => {
    dispatch(retrieveCartDataActionCreator());
  }, [dispatch]); // basically no dependencies tso it will run only when the page loads (when the component is rendered)

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
