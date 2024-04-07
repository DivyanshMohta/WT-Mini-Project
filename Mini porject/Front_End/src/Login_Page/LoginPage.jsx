import React from "react";
import Header from "./Header";
import Login from "./Login";
import './LoginPageCSS.css'

function LoginPage(){
    return (
    <div className="main">
        <Header />
        <Login />
    </div>
    );
}

export default LoginPage;