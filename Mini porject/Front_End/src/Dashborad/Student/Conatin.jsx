import React from 'react';
import Overview from './Overview';
import StudentAca from './StudentAca';

function Conatin(props) {
  return (
    <div className='centre'>
      {/* {props.buttonid === 'Overview' && <Overview username={props.username} />} */}
      {props.buttonid === 'StudentAca' && <StudentAca username={props.username} />}
      {/* Add other components and conditions as needed */}
    </div>
  );
}

export default Conatin;
