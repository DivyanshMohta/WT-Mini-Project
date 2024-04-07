import React, { useState } from 'react';
import Navbar from '../Navbar';
import SideNavbar from './SideNavbar';
import Conatin from './Conatin';

function Student(props) {
  const [buttonid, setButtonId] = useState('Overview');

  const handleButtonClick = (buttonId) => {
    console.log('Sending request from Student.js for button:', buttonId);
    setButtonId(buttonId);
  };

  return (
    <div>
      <Navbar />
      <div className="">
        <div className="flex">
          <SideNavbar handleButtonClick={handleButtonClick}/>
          <Conatin username={props.username} buttonid={buttonid}/>

        </div>
      </div>
    </div>
  );
}

export default Student;
