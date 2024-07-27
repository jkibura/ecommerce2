import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/api/products/${id}`);
        setProduct(response.data.product);
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Handle add to cart
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-details-page">
      {product && (
        <>
          <img src={product.image} alt={product.name} className="product-image-large" />
          <h1>{product.name}</h1>
          <p>${product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
          <Link to="/" className="back-to-products">Back to Products</Link>
        </>
      )}
    </div>
  );
};

export default ProductDetailsPage;
