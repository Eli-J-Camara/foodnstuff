import { useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

const App: React.FC = () => {
  const [cartIsShown, setCartIsShown] = useState<boolean>(false);

  const showCartHandler = (): void => {
    setCartIsShown(true);
  };

  const hideCartHandler = (): void => {
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