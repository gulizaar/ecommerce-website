import "./index.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import { ProtectedRoute, CreateOrderPage } from "./pages/CreateOrderPage";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailPage";
import { ShopProvider } from "./context/ShopContext";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import About from "./pages/About";

import TestApi from "./pages/TestApi";
import md5 from "md5";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api, { setAuthToken } from "./api/axios";
import { setUser } from "./redux/client/clientActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "./redux/category/categoryThunk";
import { fetchProducts } from "./redux/product/productThunk";
import Kadin from "./pages/Kadin";
import Erkek from "./pages/Erkek";
import AlisverisSepeti from "./pages/AlisverisSepeti";
import FavoritePage from "./pages/FavoritePage";
import OrderSucessPage from "./pages/OrderSucessPage";
import OrdersPages from "./pages/OrdersPages";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const autoLogin = async () => {
      if (!token) return;

      try {
        setAuthToken(token);

        const res = await api.get("/verify");

        const hash = md5(res.data.email.trim().toLowerCase());
        const avatar = `https://www.gravatar.com/avatar/${hash}?d=identicon`;

        dispatch(setUser({ ...res.data, avatar }));
      } catch (err) {
        localStorage.removeItem("token");
        setAuthToken(null);
      }
    };

    autoLogin();
  }, [dispatch]);


  return (
    <ShopProvider>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop/kadin" element={<Kadin />} />
        <Route path="/shop/erkek" element={<Erkek />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:gender/:categoryName/:categoryId" element={<ShopPage />} />
        <Route path="/shop/:gender/:categoryName/:categoryId/:productSlug/:productId" element={<ProductDetailPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/test" element={<TestApi />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sepet" element={<AlisverisSepeti />} />
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path="/order-success" element={<OrderSucessPage />} />
        <Route
          path="/order/create"
          element={<ProtectedRoute><CreateOrderPage /></ProtectedRoute>}

        />
        <Route path="/orders" element={<ProtectedRoute><OrdersPages /></ProtectedRoute>} />
      </Routes>
    </ShopProvider>
  )
}

export default App
