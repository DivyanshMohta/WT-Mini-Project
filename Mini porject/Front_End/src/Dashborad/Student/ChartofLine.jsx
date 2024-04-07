import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function ChartOfLine(props) {
  return (
    <div>
      <div className='bg'>
        <h1>Student Data</h1>
        <LineChart width={800} height={400} data={props.studentData} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cgpa" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sgpa" name="Avg. SGPA" stroke="#8884d8" />
          <Line type="monotone" dataKey="cgpa" name="CGPA" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
}

export default ChartOfLine;
