import { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateDetails() {
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [batch, setBatch] = useState('');

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/update-details',
        { enrollment_number: enrollmentNumber, batch },
        { withCredentials: true }
      );
      alert('Details updated');
    } catch (error) {
      alert('Failed to update details');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Your Details</h1>
      <input
        type="text"
        placeholder="Enrollment Number"
        value={enrollmentNumber}
        onChange={(e) => setEnrollmentNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Batch"
        value={batch}
        onChange={(e) => setBatch(e.target.value)}
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateDetails;
