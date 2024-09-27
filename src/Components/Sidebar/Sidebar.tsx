import React from "react";
import { GoArrowRight } from "react-icons/go";
import { CartItem, useCart } from "../CartContext/CartContext"; // استيراد CartItem

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[]; // إضافة cartItems إلى الواجهة
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, cartItems }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 w-64 lg:w-96 h-full bg-white text-gray-900 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ zIndex: 1000 }}
    >
      <button
        className="absolute top-8 right-5 text-xl"
        onClick={onClose}
      >
        <GoArrowRight className="text-2xl text-red-700 hover:text-red-400" />
      </button>
      <div className="flex flex-col h-full"> {/* جعل الحاوية flex و column لتكون مرنة */}
        <div className="flex-1 overflow-y-auto p-4"> {/* الحاوية القابلة للتمرير */}
          <h2 className="text-xl font-bold py-3 px-1 outline outline-offset-2 outline-1 outline-red-700 text-red-400">
            Shopping Bag
          </h2>
          {cartItems.length > 0 ? (
            <div>
              <ul className="py-2">
                {cartItems.map((item) => (
                  <li key={item.id} className="py-2 flex gap-2 items-center">
                    <img src={item.image} alt={item.title} className="w-12 h-12 object-cover" />
                    <div>
                      <p>{item.title}</p>
                      <p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
                      <p className="text-sm">Quantity: {item.quantity}</p>
                      <div className="flex gap-2 mt-2">
                        <button
                          className="bg-red-300 text-white px-2 py-1 rounded hover:bg-red-200"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                        <button
                          className="bg-red-300 text-white px-2 py-1 rounded hover:bg-red-200"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="py-2">No items in the cart.</p>
          )}
        </div>
        <div className="bg-white py-2 px-4 border-t border-gray-200"> {/* العنصر الثابت */}
          <div className="font-bold">
            Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
