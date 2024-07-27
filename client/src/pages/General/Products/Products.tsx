import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../../../components/ProductCard/ProductCard'
import './Products.css'

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/products');
        setProducts(response.data.products);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId: string) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="products-page">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="product-list">
      {filteredProducts.map(product => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={handleAddToCart}
          quantity={cart[product._id] || 0}
        />
        ))}
      </div>
    </div>
  );
};

export default Products;


/* import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/products')

        console.log('Response Data:', response.data.products);
        console.log('Type of Response Data:', typeof response.data.products);
        console.log('Is Array:', Array.isArray(response.data.products))

        setProducts(response.data.products)
        if(response.data.products.length === 0){
          setError('Products array is empty')
        }
      } catch (err) {
        console.error('Error fetching products:', err)

        if (err.response) {
          setError(`Error: ${err.response.status} - ${err.response.statusText}`);
        } else if (err.request) {
          setError('Error: No response received from the server');
        } else {
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
    }}

    fetchProducts();
  }, )

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;

  return (
    <div>
      <h1>Products</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <h2>{product.name}</h2>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default ProductsPage
  */
//import React, { useState, useEffect } from 'react';
//import axios from 'axios';

// Define the type for a product
/* interface Product {
  _id: string;
  name: string;
  price: number;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);  
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:2000/api/products'); 
        setProducts(response.data);
      } catch (err) {
      
        if (axios.isAxiosError(err) && err.message) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products: {error}</p>;

  return (
    <div>
      <h1>Products</h1>
      <div className="product-list">
        {products.length >= 1 && products.map(product => (
          <div key={product._id} className="product-card">
            <h2>{product.name}</h2>
            <p>${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
 */