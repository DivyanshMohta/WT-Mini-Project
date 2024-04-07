import React from "react";
import './Navbar.css'

function SideNavbar() {
  function submit(event) {
    const buttonId = event.target.id;
    console.log('Clicked button id:', buttonId);
  }

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
              <a className="nav-link" id="overview">
              StudentAca
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="reports"
                href="#submenu1"
                data-toggle="collapse"
                data-target="#submenu1"
              >
                Reports▾
              </a>
              <ul
                className="list-unstyled flex-column pl-3 collapse"
                id="submenu1"
                aria-expanded="false"
              >
                <li className="nav-item">
                  <a className="nav-link" id="report1" >
                    Report 1
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="report2" >
                    Report 2
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="analytics" >
                Analytics
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
