import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { ContextProvider } from "./components/auth/ContextProvider";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    document.title = "EasyShop"; //setting new title
  }, []);
  return (
      <ContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
        <ToastContainer/>
        <Footer />
      </ContextProvider>
  );
}

export default App;
