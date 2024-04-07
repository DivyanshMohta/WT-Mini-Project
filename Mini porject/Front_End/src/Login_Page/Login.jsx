import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  async function submit(e) {
    try {
      e.preventDefault(); // Prevent default form submission behavior

      const response = await axios.post("http://localhost:1000/login", {
        username,
        password,
      });

      if (response.status === 200) {
        console.log("Login successful");
        const role = response.data.Role;
        // Redirect the user to the dashboard after successful login
        navigate("/Dashboard", { state: { Role: role, Username: username } }); // Pass the role as state
        setErrorMessage(""); // Clear error message if login successful
      } else {
        console.log("Login failed");
        setErrorMessage("Invalid username or password.");
      }
    } catch (error) {
      console.log("Error:", error);
      setErrorMessage("Invalid username or password.");
    }
  }
  return (
    <div className="main">
      <div className="box flex">
        <div className="img Divide-50">
          <a>
            <img
              className="img-login"
              src={require("./images/login.png")}
              alt=""
            />
          </a>
        </div>
        <div className="form Divide-50">
          <h3>Login To Analysis</h3>
          <div className="form-box">
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter E-Mail"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Enter Password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="padding-top">
              <button onClick={submit} type="button" className="btn btn-submit">
                Sign-In
              </button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
