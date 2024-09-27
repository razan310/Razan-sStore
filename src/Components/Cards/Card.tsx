import { IoIosAdd, IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";

interface CardProps {
  id: number;
  image: string;
  category: string;
  description: string;
  price: number;
  onAddToCart: () => void; // إضافة دالة لإضافة العنصر إلى العربة
}

const Card: React.FC<CardProps> = ({ id, image, category, description, price, onAddToCart }) => {
  return (
    <div className="max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <div className="relative h-[300px] overflow-hidden border group">
        <img
          src={image}
          alt={category}
          className="w-full h-full object-contain p-8 hover:scale-95 transition-transform duration-300"
        />
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            className="bg-red-950 text-white px-4 py-4 hover:bg-red-900"
            onClick={onAddToCart} // استدعاء دالة إضافة العنصر إلى العربة
          >
            <IoIosAdd />
          </button>
          <Link to={`/show/${id}`}>
            <button className="bg-red-400 text-white px-4 py-4 hover:bg-red-300">
              <IoMdEye />
            </button>
          </Link>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-gray-500 font-normal">{category}</h3>
        <p className="text-lg font-semibold tracking-tight">{description}</p>
        <p className="text-lg font-semibold">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Card;
