import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminConatainer from './AdminConatainer';
import Student from './Student/Student';

function render(Role, Username) {
    if (Role === 'Admin') {
        return <AdminConatainer />;
    }
    else if(Role === "Student"){
        return <Student role={Role} username={Username} />; // Pass role and username as props to Student component
    }
    // You might want to handle other roles here
    return null; // Default return if Role doesn't match any condition
}

function Dashboard() {
    const location = useLocation();
    console.log(location.state);

    // Check if location.state exists before accessing its properties
    return (
        <div>
            {location.state && render(location.state.Role, location.state.Username)}
        </div>
    );
}

export default Dashboard;
