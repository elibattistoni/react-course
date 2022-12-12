import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import { useState } from "react";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

/*
- use useState to manage the opening and closing of the modal window (therefore, through props)
- use useContext to manage the overall cart data because we will need it in different places of the application
*/

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onCloseCart={hideCartHandler} />}
      {/* NB for showing the popup Cart Modal, you have 2 levels of components
      through which you pass props for clicking on the Cart button in the Header.
      two levels are still manageable, but you couls also do it with useContext */}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
