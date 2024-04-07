import React, { useState, useEffect } from 'react';
import { read, utils } from 'xlsx';
import axios from 'axios';
import "./ExcelInput.css";

const ExcelFileInput = () => {
  const [data, setData] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [academic, setAcademic] = useState('');
  const [year, setYear] = useState('');
  const [examType, setExamType] = useState(''); // New state for examType
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [teacherOptions, setTeacherOptions] = useState([]);

  // Fetch subject options from the backend API
  useEffect(() => {
    const fetchSubjectOptions = async () => {
      try {
        const response = await axios.get('http://localhost:1000/subjects');
        const subjects = response.data;
        setSubjectOptions(subjects); // Set subject options to the received data
      } catch (error) { 
        console.error('Error fetching subject options:', error);
      }
    };
    
    fetchSubjectOptions();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      const workbook = read(reader.result, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(worksheet);

      setData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  const handleSubmit = async () => {
    // Check if all fields are filled
    if (!subjectName  || !subjectCode || !academic || !year || !data.length) {
      alert("fill the Input")
      return;
    }
    
    if (!window.confirm("Are you sure you want to submit? Please double-check all details before submitting.")) {
      return; // Do nothing if the admin cancels
    }

    try {
      await axios.post("http://localhost:1000/excel", {
        data,
        subjectName,
        teacherName,
        subjectCode,
        academic,
        year,
        examType // Include examType in the request
      });
      console.log("Request sent successfully");
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className='body'>
      <div className='Sub-name'>
        <label>Subject Name:</label>
        <select value={subjectName} onChange={(e) => setSubjectName(e.target.value)} required>
          <option value="">Select Subject</option>
          {subjectOptions.map(subject => (
            <option key={subject.subject_id} value={subject.subject_name}>{subject.subject_name}</option>
          ))}
        </select>
      </div>
      
      {/* <div className='Tea-Name'>
        <label>Teacher Name:</label>
        <input type="text" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} required />
      </div> */}
      
      <div className='Subject-code'>
        <label>Subject Code:</label>
        <input type="text" value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)} required />
      </div>

      <div className='Year'>
        <label>Year:</label>
        <select value={year} onChange={(e) => setYear(e.target.value)} required>
          <option value="">Select Year</option>
          <option value="2022-23">2022-23</option>
          <option value="2023-24">2023-24</option>
        </select>
      </div>

      <div className='Academic'>
        <label>Academic:</label>
        <select value={academic} onChange={(e) => setAcademic(e.target.value)} required>
          <option value="">Select Academic</option>
          <option value="Semester 1">Semester 1</option>
          <option value="Semester 2">Semester 2</option>
        </select>
      </div>
      
      <div className='ExamType'>
        <label>Exam Type:</label>
        <select value={examType} onChange={(e) => setExamType(e.target.value)} required>
          <option value="">Select Exam Type</option>
          <option value="ISE">ISE</option>
          <option value="ESE">ESE</option>
          <option value="ISE + ESE">ISE + ESE</option>
          <option value="OverAll">OverAll</option>
        </select>
      </div>
      
      <div className='File-Input'>
        <input type="file" onChange={handleFileUpload} required />
      </div>
      
      <button className='Submit-Button' onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ExcelFileInput;
