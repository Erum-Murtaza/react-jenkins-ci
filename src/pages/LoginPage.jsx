import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import image from "../assets/okieeee.png";
import { userSchema } from "../Validations/UserValidation";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault(); 

    const formData = { email, password };
    try {
      await userSchema.validate(formData, { abortEarly: false });
   
      console.log("Login successful!");
      navigate("/dashboard/genre");
    } catch (err) {
      
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1 className="logo">AUDIOSED</h1>
        <h2>Log in</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group11">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="input-group11">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="studio-image-wrapper">
        <img src={image} alt="Studio" className="studio-image" />
      </div>
    </div>
  );
}

export default LoginPage;