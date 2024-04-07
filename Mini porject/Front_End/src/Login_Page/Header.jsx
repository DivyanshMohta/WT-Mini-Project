import React from "react";

function Header(){
    return(
    <div>
       <div className="nav-bar">
        <a className="float-left ">⭐⭐</a>
        <div className="float-right">
        <button className="btn btn-nav" >Sign IN</button>
        <button className="btn" >Log Out</button>
        </div>
       </div>

    </div>);
}
export default Header;