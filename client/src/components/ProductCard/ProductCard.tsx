import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

interface ProductCardProps {
  product :  {
    _id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
  };
  onAddToCart: (productId: string) => void;
  quantity: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, quantity }) => {
    
    for(var i = 0; i < 4; i++)
    

  return (
    <div className="product-card">
      <img 
      src={`../../assets/images/StockCake-${product.category}${i}.jpg`}
       alt={product.name} className="product-image" />
      <div className="product-details">
        <h2>{product.name}</h2>
        <p>${product.price.toFixed(2)}</p>
        <button onClick={() => onAddToCart(product._id)}>Add to Cart</button>
        <p>Quantity: {quantity}</p>
        <Link to={`/product/${product._id}`} className="view-details">View Details</Link>
      </div>
    </div>
  );
};


export default ProductCard;
