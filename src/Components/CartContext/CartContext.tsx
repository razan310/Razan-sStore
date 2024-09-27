import React, { createContext, useState, ReactNode, useContext } from 'react';

// تصدير واجهة بيانات العربة
export interface CartItem {
    id: number;
    image: string;
    title: string;
    price: number;
    quantity: number; // كمية العنصر
  }
  

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number; // حساب إجمالي السعر
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void; // دالة لإزالة العنصر من العربة
  updateQuantity: (id: number, quantity: number) => void; // دالة لتحديث الكمية
}

// إنشاء السياق الافتراضي
const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // حساب عدد العناصر في العربة
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // حساب إجمالي السعر
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // دالة لإضافة عنصر إلى العربة
  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(cartItem => cartItem.id === item.id);
      if (existingItemIndex > -1) {
        // إذا كان العنصر موجودًا، قم بتحديث الكمية فقط
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        return updatedItems;
      } else {
        // إذا كان العنصر غير موجود، أضف عنصرًا جديدًا
        return [...prevItems, item];
      }
    });
  };

  // دالة لإزالة عنصر من العربة
  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // دالة لتحديث الكمية
  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(prevItems => {
      if (quantity <= 0) {
        return prevItems.filter(item => item.id !== id);
      }
      return prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// دالة لتسهيل استخدام السياق في المكونات
const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
