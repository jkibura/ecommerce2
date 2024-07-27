import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Cart.css';

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Load cart items from localStorage or API if logged in
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/cart'); // Adjust based on your cart API
        setCart(response.data.cart);
      } catch (err) {
        console.error('Failed to fetch cart');
      }
    };

    fetchCart();
  }, [isLoggedIn]);

  const handleCheckout = async (productId: string) => {
    if (isLoggedIn) {
      try {
        await axios.post('http://localhost:2000/api/orders', { productId });
        setCart(prevCart => prevCart.filter(item => item._id !== productId));
      } catch (err) {
        console.error('Failed to checkout');
      }
    } else {
      window.location.href = '/login'; // Redirect to login
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      {cart.map(item => (
        <div key={item._id} className="cart-item">
          <img src={item.image} alt={item.name} className="cart-image" />
          <div className="cart-details">
            <h2>{item.name}</h2>
            <p>${item.price.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleCheckout(item._id)}>Checkout</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartPage;
