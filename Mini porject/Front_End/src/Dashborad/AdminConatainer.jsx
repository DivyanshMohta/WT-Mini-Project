import React from 'react';
import Navbar from './Navbar';
import SideNavbar from './SideNavbar';
import AdminControl from './AdminControl';

import './Navbar.css'; // Import your CSS file for styling

function AdminContainer() {
  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <SideNavbar />
       <AdminControl />
      </div>
    </div>
  );
}

export default AdminContainer;
