//NB we call this file "cart-actions" but it means cart actions created by us
import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

//% ACTION FOR EDITING CART
//% CREATE ACTION CREATOR (not always, it is IN ALTERNATIVE TO USING useEffect FOR ASYNC OPERATIONS!)
export const sendCartDataActionCreator = (cart) => {
  //| here we create an action creator that returns another function, and this function should receive the dispatch function as input argument
  //| and inside the returned function we can dispatch the actual action that we want to perform (like showing a notifiction,adding a cart item)
  //IMPORTANT before dispatch, we can perform any async code, any side effect, because we
  /// we are not running this in a reducer, it is a separate, standalone Javascript function

  return async (dispatch) => {
    //NB we can do this because redux-toolkit it does not accept only action objects (like for the automatically created action creators)
    //NB but it also accepts action creators that return functions
    //NB and if it sees that you are dispatching an action that is a function (instead of an object), it will execute that funciton fot you (i.e. the "dispatch" function)
    //NB it will give us the dispatch argument automatically, so that inside the returned function, we can dipatch again
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      //| after dispatchingg the first notification, we can execute this:
      const dbUrl =
        "https://fir-shopping-cart-redux-async-default-rtdb.europe-west1.firebasedatabase.app/cart.json";
      const response = await fetch(dbUrl, {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

//% ACTION FOR FETCHING DATA
export const retrieveCartDataActionCreator = () => {
  return async (dispatch) => {
    //| define function for getting data from DB
    const fetchData = async () => {
      const dbUrl =
        "https://fir-shopping-cart-redux-async-default-rtdb.europe-west1.firebasedatabase.app/cart.json";
      const response = await fetch(dbUrl);
      if (!response.ok) {
        throw new Error("Retrieving cart data failed.");
      }
      const data = await response.json();

      return data;
    };

    //| error handling
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Retrieving cart data failed!",
        })
      );
    }
  };
};
