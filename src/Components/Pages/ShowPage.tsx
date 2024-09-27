import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useCart } from "../CartContext/CartContext"; // استيراد useCart لإضافة العناصر إلى العربة

interface Product {
  id: number;
  image: string;
  category: string;
  description: string;
  title: string;
  rating: {
    count: number;
    rate: number;
  };
  price: number;
}

const ShowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart(); // استخدام الدالة لإضافة المنتج إلى العربة

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
          if (response.data) {
            setProduct(response.data);
          } else {
            setError("Product not found.");
          }
        } catch (error) {
          setError("Error fetching product data.");
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    } else {
      setError("Invalid product ID.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No product found for the provided ID.</p>
      </div>
    );
  }

  // دالة لإضافة المنتج إلى العربة
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        image: product.image,
        title: product.title,
        price: product.price,
        quantity: 1,
      });
    }
  };

  return (
    <>
      <NavBar />
      <div className="py-40 px-4 sm:px-6 lg:px-16 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 mb-7">
          <img src={product.image} alt={product.title} className="w-full h-64 object-contain" />
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
          <p className="text-xl text-red-500 font-semibold mb-2">${product.price.toFixed(2)}</p>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-sm text-gray-500">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
          <button
            className="bg-red-300 text-white mt-3 px-4 py-4 hover:bg-red-200"
            onClick={handleAddToCart} // استدعاء دالة الإضافة للعربة عند النقر
          >
            Add To Cart
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShowPage;
