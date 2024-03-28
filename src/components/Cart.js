import React, { useState, useEffect } from "react";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const loggedInUsername = userData.username;

  useEffect(() => {
    const fetchCartItems = () => {
      if (loggedInUsername) {
        const userCart = JSON.parse(localStorage.getItem("cart")) || {};
        const userCartItems = userCart[loggedInUsername] || [];
        setCartItems(userCartItems);
      } else {
        setCartItems([]);
      }
    };
    fetchCartItems();
  }, []);

  const handleRemoveItem = (productId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    updateCartItems(updatedCartItems);
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    updateCartItems(updatedCartItems);
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    updateCartItems(updatedCartItems);
  };

  const updateCartItems = (updatedCartItems) => {
    if (loggedInUsername) {
      const userCart = JSON.parse(localStorage.getItem("cart")) || {};
      userCart[loggedInUsername] = updatedCartItems;
      localStorage.setItem("cart", JSON.stringify(userCart));
    }
    
    setCartItems(updatedCartItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDiscountedTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity * (1 - item.discountPercentage / 100)), 0);
  };

  return (
    <div className="cart-container">
      <h3 className="cart-header">Cart</h3>
      {cartItems.length === 0 ? (
        <div className="cart-empty">No items in the cart</div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.thumbnail} alt={item.title} className="product-thumbnail" />
                <div className="product-details">
                  <h3>{item.title}</h3>
                  <div className="quantity-controls">
                    <button class="cart-minus" onClick={() => handleDecreaseQuantity(item.id)}>&nbsp;-&nbsp;</button>&nbsp;
                    <span>{item.quantity}</span>&nbsp;
                    <button class="cart-plus" onClick={() => handleIncreaseQuantity(item.id)}>&nbsp;+&nbsp;</button>
                  </div>
                  <div>
                    <p>Price: ${item.price}</p>
                    <p>Discount: {item.discountPercentage.toFixed(2)}%</p>
                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button className="remove-cart" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
            <h3>Discounted Total: ${calculateDiscountedTotal().toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
