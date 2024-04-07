import React from "react";
import '../Navbar.css'

function SideNavbar({ handleButtonClick }) {
  const submit = (event) => {
      const buttonId = event.target.id;
      console.log('Clicked button id:', buttonId);
      handleButtonClick(buttonId); // Calling the function passed as prop
  };


  return (
    <div className="bg-light height width" onClick={submit}>
      <div className="row row-offcanvas row-offcanvas-left">
        <div
          className="col-md-3 col-lg-2 sidebar-offcanvas pl-0"
          id="sidebar"
          role="navigation"
        >
          <ul className="nav flex-column sticky-top pl-0 pt-5 mt-3">
            <li className="nav-item">
              <a className="nav-link" id="Overview">
              Overview
              </a>
            </li>

            {/* Add more interactive links */}
            <li className="nav-item">
              <a className="nav-link" id="StudentAca" >
              StudentAca
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="export" >
                Export
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="snippets" >
                Snippets
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="flexbox" >
                Flexbox
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="layouts" >
                Layouts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="templates" >
                Templates
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="themes" >
                Themes
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideNavbar;
