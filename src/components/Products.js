import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./Products.css";
import { toast } from "react-toastify";

const Products = () => {
  const [productsList, setProductsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [sortBy, setSortBy] = useState("");

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = productsList.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filtered);
  };

  const handleSortBy = (type) => {
    setSortBy(type);
    let sortedProducts;
    if (type === "price-low-high") {
      sortedProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (type === "price-high-low") {
      sortedProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    } else if (type === "name-a-z") {
      sortedProducts = [...filteredProducts].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (type === "name-z-a") {
      sortedProducts = [...filteredProducts].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    } else {
      sortedProducts = [...productsList];
    }
    setFilteredProducts(sortedProducts);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products"
        );
        setProductsList(response.data.products);
        setFilteredProducts(response.data.products);
      } catch (error) {
        alert("Error Fetching Products: " + error.message);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        discountPercentage: product.discountPercentage,
      };

      // Retrieve the logged-in user's data from local storage
      const userData = JSON.parse(localStorage.getItem("userData"));
      const username = userData.username;
      // Check if the user is logged in
      if (username) {
         // Retrieve the user's cart from local storage
      const userCart = JSON.parse(localStorage.getItem("cart")) || {};

      // Check if the username already exists in the cart
      if (!userCart[username]) {
        // If the username does not exist, create a new entry with an empty array
        userCart[username] = [];
      }

      // Check if the product is already in the user's cart
      const existingProductIndex = userCart[username].findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        // If the product is already in the cart, increase its quantity
        const updatedCartItem = { ...userCart[username][existingProductIndex] };
        updatedCartItem.quantity += 1;
        userCart[username][existingProductIndex] = updatedCartItem;
      } else {
        // If the product is not in the cart, add it to the cart
        cartItem.quantity = 1; // Set initial quantity
        userCart[username].push(cartItem);
      }
      
      // Update the user's cart in local storage
      localStorage.setItem("cart", JSON.stringify(userCart));
      // alert("Product added to cart successfully!"); // Show success alert
      toast.success("Product added to cart successfully!");
    } else {
      // If the user is not logged in, show an error message
      // alert("You need to login to add items to your cart.");
      toast.error("You need to login first, to add items to your cart!");
    }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      // alert("Failed to add product to cart. Please try again later."); // Show error alert
      toast.error("Failed to add product to cart. Please try again later.");
    }
  };

  // Calculate indexes for displaying current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Products</h1>
        <input
          type="text"
          name="searchTerm"
          style={{
            margin: "20px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            color: "#555",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            fontSize: "16px",
            outline: "none",
            width: "40%",
            boxSizing: "border-box",
          }}
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by title or description"
        ></input>
        <select
          onChange={(e) => handleSortBy(e.target.value)}
          style={{
            margin: "20px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            color: "#555",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            fontSize: "16px",
            outline: "none",
          }}
        >
          <option value="">Sort By</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="name-a-z">Name: A-Z</option>
          <option value="name-z-a">Name: Z-A</option>
        </select>
      </div>
      <div className="products-container">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={() => addToCart(product)}
          />
        ))}
      </div>
      <div className="pagination" style={{ textAlign: "center" }}>
        {Array.from(
          { length: Math.ceil(filteredProducts.length / productsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              style={{
                margin: "7px",
                background: currentPage === i + 1 ? "#007bff" : "#fff",
                color: currentPage === i + 1 ? "#fff" : "#000",
                border: "1px solid #ccc",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              &nbsp;{i + 1}&nbsp;
            </button>
          )
        )}
      </div>
    </>
  );
};

export default Products;
