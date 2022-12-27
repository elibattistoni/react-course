import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/ui-slice";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

// variable set in order to not run the effect function (i.e. the http request) when the component is intially rendered (i.e. when loading page)
let isInitial = true;

function App() {
  //% LISTEN TO STORE (TO CONDITIONALLY SHOW/HIDE THE CART)
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  //% send HTTP request when cart changes (first: perform the updating of the state in the frontend, adding or removing items with the reducers, then communicate it to the backend)
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    //NB we have to make sure that this effect is not executed when the component
    //NB is rendered for the first time (i.e. when loading the page) because it
    //NB will send an http request and overwrite the existing cart in the DB
    //NB we do that with isInitial

    const sendCartData = async () => {
      //| dispatch notification
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data.",
        })
      );
      //| send http request
      const dbUrl =
        "https://fir-shopping-cart-redux-async-default-rtdb.europe-west1.firebasedatabase.app/cart.json";
      const response = await fetch(dbUrl, {
        method: "PUT",
        body: JSON.stringify(cart),
      });
      if (!response.ok) throw new Error("Sending cart data failed!");

      //| send notification
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    };

    if (isInitial) {
      // do not continue if the first time the component is rendered (the first time the app starts)
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      //| send notification
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    });
  }, [cart, dispatch]);
  //NB react-redux ensures that dispatch is a function that never changes (but you should add it for completeness)

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
