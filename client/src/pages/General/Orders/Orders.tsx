import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orders.css';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/orders');
        setOrders(response.data.orders);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await axios.delete(`http://localhost:2000/api/orders/${orderId}`);
      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
    } catch (err) {
      console.error('Failed to delete order');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="orders-page">
      <h1>Your Orders</h1>
      {orders.length === 0 && <p>No orders found.</p>}
      {orders.map(order => (
        <div key={order._id} className="order-item">
          <h2>Order ID: {order._id}</h2>
          <p>Status: {order.status}</p>
          {order.products.map((product: any) => (
            <div key={product.product} className="order-product">
              <img src={product.image} alt={product.name} className="order-image" />
              <div className="order-details">
                <h3>{product.name}</h3>
                <p>Price: ${product.price.toFixed(2)}</p>
                <p>Quantity: {product.quantity}</p>
              </div>
            </div>
          ))}
          {order.status === 'pending' && (
            <button onClick={() => handleDeleteOrder(order._id)}>Delete Order</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
