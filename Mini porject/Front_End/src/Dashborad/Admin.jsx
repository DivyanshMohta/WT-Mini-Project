import React from 'react';

function Admin() {
  const handleClick = () => {
    alert('dhu');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Handle the file here (e.g., read it, parse it)
    console.log('Selected file:', file);
  };

  return (
    <div>
      <div className='box1'>
        <input type='file' onChange={handleFileChange}></input>
      </div>
    </div>
  );
}

export default Admin;
