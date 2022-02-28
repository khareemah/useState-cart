import React from 'react';
import { useGlobalContext } from './context';
import Navbar from './Navbar';
import CartContainer from './CartContainer';

const App = () => {
  const { cart } = useGlobalContext();

  if (cart.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
};

export default App;
