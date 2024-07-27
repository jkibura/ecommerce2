
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageOrders.css';

const ManageOrdersPage: React.FC = () => {
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

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      await axios.patch('http://localhost:2000/api/orders', { id: orderId, status });
      setOrders(prevOrders => prevOrders.map(order =>
        order._id === orderId ? { ...order, status } : order
      ));
    } catch (err) {
      console.error('Failed to update status');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="manage-orders-page">
      <h1>Manage Orders</h1>
      {orders.length === 0 && <p>No orders found.</p>}
      {orders.map(order => (
        <div key={order._id} className="order-item">
          <h2>Order ID: {order._id}</h2>
          <p>User Email: {order.user.email}</p>
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
          <select
            value={order.status}
            onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default ManageOrdersPage;
