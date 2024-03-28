import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [productId]);

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "2px" }}>
        Product Details
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
          padding: "10px",
        }}
      >
        { product ? (
          <div
            // className="product-card"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              maxWidth: "450px",
              width: "100%",
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ maxWidth: "60%", height: "auto", marginBottom: "0" }}
            />
            <div
              className="product-details"
              style={{ textAlign: "center", width: "70%", marginTop: "1px" }}
            >
              <h2 style={{ color: "blue", marginTop: "1px", marginBottom: "3px" }}>
                {product.title}
              </h2>
              <p style={{ marginTop: "1px", marginBottom: "3px" }}>
                Brand: {product.brand}
              </p>
              <p style={{ marginTop: "1px", marginBottom: "3px" }}>
                Category: {product.category}
              </p>
              <p style={{ marginTop: "1px", marginBottom: "3px" }}>
                Price: ${product.price}
              </p>
              <p style={{ marginTop: "1px" }}>
                Discount: ${product.discountPercentage}
              </p>
              <p
                style={{
                  color: "violet",
                  marginTop: "1px",
                  marginBottom: "3px",
                  wordWrap: "break-word",
                }}
              >
                Description: {product.description}
              </p>
              <p style={{ marginTop: "1px" }}>Rating: {product.rating}</p>

              <Link
                to="/products"
                style={{
                  marginTop: "10px",
                  backgroundColor: "#3498db",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  textDecoration: "none",
                }}
              >
                Back to Products
              </Link>
            </div>
          </div>
        ) : (
          <p>No product found.</p>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
