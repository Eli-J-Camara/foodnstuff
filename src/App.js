import { useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

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
      {(cartIsShown === true) && <Cart onHide={hideCartHandler} />}
      <Header onReveal={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
