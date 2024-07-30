import React, { useState } from "react";
import { validateLoginForm } from "../helperFunctions/validation";
import { login } from "../../apiServices/api";
import { useNavigate } from "react-router-dom";
const Login = ({ setToken }) => {
  const [data, setData] = useState({
    username: "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateLoginForm(data);
    setErrors(formErrors);
    console.log(errors);
    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      try {
        const response = await login(data.username, data.otp);
        const token = response.data.token;
        setToken(token);
        localStorage.setItem("token", token);
        // Redirect to the quotes page
        navigate("/listing");
      } catch (error) {
        console.error("Login failed", error);
        setErrors({ api: "Login failed. Please check your credentials." });
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <h1>Login in</h1>
          <label>Enter username</label>
          <input
            type="text"
            name="username"
            placeholder="enter username"
            onChange={handleChange}
          />
          {errors.username && (
            <span style={{ color: "red" }}>{errors.username}</span>
          )}
          <label>Enter otp</label>
          <input
            type="password"
            name="otp"
            placeholder="Enter otp"
            onChange={handleChange}
          />
          {errors.otp && <span style={{ color: "red" }}>{errors.otp}</span>}
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
export default Login;
