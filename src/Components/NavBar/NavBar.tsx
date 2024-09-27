import { useState, useEffect } from "react";
import { BsBag } from "react-icons/bs";
import { ImGift } from "react-icons/im";
import { Link } from "react-router-dom";
import Sidebar from "./../Sidebar/Sidebar";
import { useCart } from "./../CartContext/CartContext"; // استيراد الدالة المساعدة

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const { cartCount, cartItems } = useCart(); // الحصول على عدد العناصر وقائمة العناصر

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 right-0 h-16 px-8 lg:px-16 flex flex-row justify-between items-center z-10 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <ImGift className="text-5xl text-red-950 hover:text-red-900" />
        <div className="flex flex-row items-center gap-x-5">
          <Link to="/login" className="font-medium tracking-widest text-red-300 hover:text-red-950">
            Login
          </Link>
          <div className="relative">
            <BsBag 
              className="text-3xl text-red-950 hover:text-red-900 cursor-pointer"
              onClick={toggleSidebar} // استدعاء toggleSidebar عند النقر
            />
            {cartCount > 0 && (
              <div className="bg-red-300 absolute top-[21px] -right-[6px] -bottom-2 w-[18px] h-[18px] rounded-full flex items-center justify-center text-xs font-semibold text-white">
                {cartCount}
              </div>
            )}
          </div>
        </div>
      </nav>
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        cartItems={cartItems} // تمرير cartItems هنا
      />
    </div>
  );
};

export default NavBar;
