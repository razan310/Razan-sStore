import React, { useEffect, useState } from 'react';
import Card from './../Cards/Card';
import axios from 'axios';
import { useCart } from '../CartContext/CartContext';

interface Product {
  id: number;
  image: string;
  category: string;
  title: string;
  price: number;
}

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const filteredProducts = response.data.filter((product: Product) =>
          ["men's clothing", "women's clothing"].includes(product.category)
        );
        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map(product => (
        <Card
          key={product.id}
          id={product.id}
          image={product.image}
          category={product.category}
          description={product.title}
          price={product.price}
          onAddToCart={() => handleAddToCart(product)}
        />
      ))}
    </div>
  );
};

export default Shop;
