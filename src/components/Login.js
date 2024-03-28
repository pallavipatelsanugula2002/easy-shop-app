import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./auth/ContextProvider";
import './Login.css'
import { toast } from "react-toastify";

const Login = () => {
  const { handleLogin } = useContext(DataContext);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [loginValidation, setLoginValidation] = useState({
    username: "",
    password: "",
  });

  const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    setLoginValidation({ ...loginValidation, [name]: "" });
  };

  const handleSubmit = () => {
    const { username, password } = loginData;
    let valid = true;

    // Simple validations
    if (!username) {
      setLoginValidation(prevState => ({
        ...prevState,
        username: "Username field is required",
      }));
      valid = false;
    }
    if (!password) {
      setLoginValidation(prevState => ({
        ...prevState,
        password: "Password field is required",
      }));
      valid = false;
    }

    if (valid) {
      // Check if the entered credentials match with any registered user
      const user = storedUsers.find(user => user.username === username && user.password === password);
      if (user) {
        // If a user is found, log them in
        handleLogin(user);
        // alert("Login successful");
        toast.success("Login successful!");
        navigate("/products");
      } else {
        // If no matching user is found, display an error message
        // alert("Invalid credentials");
        toast.error("Invalid credentials!");
      }
    }
  };

  return (
      <div id="loginSection" className="form-container">
        <h2>Login</h2>
        <form id="loginForm">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={loginData.username}
            onChange={handleChange}
            required
          />
          <span id="usernameError" className="error">
            {loginValidation.username}
          </span>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
          <span id="passwordError" className="error">
            {loginValidation.password}
          </span>
          <button type="button" id="loginButton" onClick={handleSubmit}>
            Login
          </button>
          <span id="loginError" className="error" />
          <p>
            Don't have an account?{" "}
            <a href="/register">Register here</a>
          </p>
        </form>
      </div>
  );
};

export default Login;
