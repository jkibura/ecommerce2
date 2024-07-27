// pages/AdminProductsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:2000/api/products', newProduct);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        image: ''
      });
      // Refetch or update products
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:2000/api/products/${productId}`);
      // Refetch or update products
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateProduct = async (productId, updates) => {
    try {
      await axios.patch(`http://localhost:2000/api/products/${productId}`, updates);
      // Refetch or update products
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="admin-products-page">
      <div className="add-product-form">
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      {loading ? <p>Loading...</p> : (
        <div className="products-list">
          {products.map(product => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <p>Category: {product.category}</p>
              <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              <button onClick={() => handleUpdateProduct(product._id, { ...product })}>Update</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;

