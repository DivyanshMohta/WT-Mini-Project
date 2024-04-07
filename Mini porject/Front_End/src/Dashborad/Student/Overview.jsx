import React, { useState, useEffect } from 'react';
import './overview.css';

function Overview(props) {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bardMessage, setBardMessage] = useState(null);
  const [bardMessageLoading, setBardMessageLoading] = useState(false); // New state for bard message loading

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await fetch('http://localhost:1000/fetchOveralldata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: props.username })
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setStudentData(data.Data[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching student data:', error);
      setError('Error fetching student data');
      setLoading(false);
    }
  };

  const postMessageToBard = async () => {
    if (studentData) {
      setBardMessageLoading(true); // Set loading state before fetching bard message

      const message = `Analysis the result of student and write paragph with texts and numbers in detail in 400 words. The name of student is ${studentData["Name"]}. The student scored an SGPA of ${studentData["SGPA SEM I"]} with a CGPA of ${studentData["CGPA"]}. The total marks obtained by student in the exam is ${studentData["Obtained marks"]} out of 720 marks with credits of ${studentData["Obtained Credits"]} out of 24 and the student rank in class is ${studentData["Sr.No"]} among 78 students also  type of student using SGPA and marks dont repeat the senetence again if a=sgpa and vgpa is above 8.5 excellent above 7.5 good 6.5 need more improvement and below 6 worst score use this to classfication. Analyze the student's performance.`;

      try {
        const response = await fetch('http://localhost:1000/bard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message })
        });

        if (!response.ok) {
          throw new Error('Failed to post message to Bard');
        }

        const data = await response.json();
        setBardMessage(data.message); // Set Bard message in state
      } catch (error) {
        console.error('Error posting message to Bard:', error);
      } finally {
        setBardMessageLoading(false); // Reset loading state after fetching bard message
      }
    }
  };

  useEffect(() => {
    if (studentData) {
      postMessageToBard();
    }
  }, [studentData]);

  return (
    <div className="container">
      <div className="box-1">
        <div className="overview-container">
          <h2>Student Overview</h2>
          {loading && <p className="loading">Loading...</p>}
          {error && <p className="error">{error}</p>}
          {studentData && (
            <div className="student-details">
              <div className="pair-container">
                <p>Name: {studentData["Name"]}</p>
                <p>PRN NO.: {studentData["PRN.No."]}</p>
              </div>
              <div className="pair-container">
                <p>Obtained Marks: {studentData["Obtained marks"]}</p>
                <p>SGPA SEM I: {studentData["SGPA SEM I"]}</p>
              </div>
              <div className="pair-container">
                <p>SGPA SEM II: {studentData["SGPA SEM II"]}</p>
                <p>Avg SGPA: {studentData["Avg. SGPA"]}</p>
              </div>
              <div className="pair-container">
                <p>CGPA: {studentData["CGPA"]}</p>
                <p>Obtained Credits: {studentData["Obtained Credits"]}</p>
              </div>
              <div className="pair-container">
                <p>Percentage: {studentData["Percentage(%)"]}</p>
                <p>Result: {studentData["Result"]}</p>
              </div>
              <div className="pair-container">
                <p>Shift: {studentData["Shift"]}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="box-2 overview-container">
      <h2>Student Overall Analysis</h2>
        {bardMessageLoading && <p>Loading Analysis message...</p>}
        <div className='student-Analsysis'>
        {bardMessage && !bardMessageLoading && <p>{bardMessage}</p>} 
        </div>{/* Render Bard message if available */}
      </div>
    </div>
  );
}

export default Overview;
