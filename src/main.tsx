import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Components/Pages/Login.tsx';
import Home from './Components/Pages/Home.tsx';
import ShowPage from './Components/Pages/ShowPage.tsx';
import { CartProvider } from './Components/CartContext/CartContext.tsx'; // استيراد CartProvider

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/show/:id",
    element: <ShowPage />
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider> {/* تغليف RouterProvider بـ CartProvider */}
      <RouterProvider router={routes} />
    </CartProvider>
  </StrictMode>
);
