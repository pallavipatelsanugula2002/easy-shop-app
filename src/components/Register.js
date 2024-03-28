import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [registerValidation, setRegisterValidation] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // alert(e.target.value);
    setRegisterData({ ...registerData, [name]: value });
    setRegisterValidation({ ...registerValidation, [name]: "" });
  };

  const handleSubmit = () => {
    const { id, email, username, password } = registerData;
    let valid = true;
    // Simple validations
    if (!email) {
      setRegisterValidation((prevState) => ({
        ...prevState,
        email: "Email field is required",
      }));
      valid = false;
    }
    if (!username) {
      setRegisterValidation((prevState) => ({
        ...prevState,
        username: "Username field is required",
      }));
      valid = false;
    } else if (username.length < 6) {
      setRegisterValidation((prevState) => ({
        ...prevState,
        username: "Username should be at least 6 characters long",
      }));
      valid = false;
    } else if (isUsernameTaken(username)) {

      setRegisterValidation((prevState) => ({
        ...prevState,
        username: "Username is already taken",
      }));
      valid = false;
    }
    if (!password) {
      setRegisterValidation((prevState) => ({
        ...prevState,
        password: "Password field is required",
      }));
      valid = false;
    }
     else {
      // Password validation using regex
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(password)) {
        setRegisterValidation({
          ...registerValidation,
          password:
            "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        });
        valid = false;
      }
    }

    if (valid) {
      const storedUsers =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];
      storedUsers.push({  email, username, password });
      localStorage.setItem("registeredUsers", JSON.stringify(storedUsers));
      // alert("Registration successful");
      toast.success("Registration successful!");
      navigate("/login");
      setRegisterData({});
    }
  };    

  const isUsernameTaken = (username) => {
    const storedUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];
    return storedUsers.some((user) => user.username === username);
  };

  return (
    <div id="registrationSection" className="form-container">
      <h2>Registration</h2>
      <form id="registrationForm">
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={registerData.username}
          onChange={handleChange}
          required
        />
        <span id="usernameError" className="error">
          {registerValidation.username}
        </span>
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={registerData.email}
          onChange={handleChange}
          required
        />
        <span id="emailError" className="error">
          {registerValidation.email}
        </span>
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={registerData.password}
          onChange={handleChange}
          required
        />
        <span id="passwordError" className="error">
          {registerValidation.password}
        </span>
        <button type="button" id="registerButton" onClick={handleSubmit}>
          Register
        </button>
        <span id="registrationError" className="error" />
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
