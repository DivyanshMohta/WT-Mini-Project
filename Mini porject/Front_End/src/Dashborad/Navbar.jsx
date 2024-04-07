import React from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "./vit_logo-removebg-preview.png"; // Importing the image

function Navbar() {
  const navigate = useNavigate();

  async function LogOut() {
    // Perform logout logic here
    navigate("/");
  }

  return (
    <div>
      <div className="nav-bar bg-light">
        {/* Using the imported image */}
        <a className="float-left no-color">
          <img className="log-height" src={logoImage} alt="Logo" />
        </a>
        <div className="float-right">
          <button className="btn btn-logout" onClick={LogOut}>Log Out</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
