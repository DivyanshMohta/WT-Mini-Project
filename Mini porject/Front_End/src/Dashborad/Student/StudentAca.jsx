import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentAca.css'; // Import CSS file

function StudentAca(props) {
  const [academicData, setAcademicData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedExamType, setSelectedExamType] = useState('');

  useEffect(() => {
    // Fetch academic data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:1000/tracksubjectrecord', { username: props.username });
        console.log(response.data.trackRecords)
        setAcademicData(response.data.trackRecords);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching academic data:', error);
        setError('Error fetching academic data');
        setLoading(false);
      }
    };

    fetchData();
  }, [props.username]); // Add props.username to the dependency array to fetch data when the username changes

  const getUniqueValues = (data, key) => {
    return [...new Set(data.map(item => item[key]))];
  };

  const handleClick = (year, semester, examType) => {
    setSelectedYear(year);
    setSelectedSemester(semester);
    setSelectedExamType(examType);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Academic Data</h2>
      <div className="button-container">
        {getUniqueValues(academicData, 'year').map(year => (
          getUniqueValues(academicData.filter(subject => subject.year === year), 'semester').map(semester => (
            getUniqueValues(academicData.filter(subject => subject.year === year && subject.semester === semester), 'exam_type').map(examType => (
              <button 
                key={`${year}-${semester}-${examType}`} 
                className={`custom-button ${year === selectedYear && semester === selectedSemester && examType === selectedExamType ? 'selected' : ''}`}
                onClick={() => handleClick(year, semester, examType)}
              >
                {year} - {semester} - {examType}
              </button>
            ))
          ))
        ))}
      </div>
      <div className="selected-info">
        {selectedYear && selectedSemester && selectedExamType && (
          <p>Selected: {selectedYear} - {selectedSemester} - {selectedExamType}</p>
        )}
      </div>
    </div>
  );
}

export default StudentAca;
