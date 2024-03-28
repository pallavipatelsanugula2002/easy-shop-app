import React, { useState } from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} style={{margin:'1%'}}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="product-image"
      />
      </Link>
      <div className="product-details">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">Price: ${product.price}</p>
        <p className="product-rating">Rating: {product.rating}/5</p>
        <div className="action-buttons">
          <Link to={`/product/${product.id}`} style={{margin:'1%'}}>
            <button className="view-details-btn">View Details</button>
          </Link>
          <button className="add-to-cart-btn" onClick={handleAddToCart} style={{margin:'1%'}}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
