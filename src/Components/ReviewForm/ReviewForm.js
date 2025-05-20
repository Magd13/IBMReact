import './ReviewForm.css';
import React, { useState } from 'react';
import FormFeedBack from './FormFeedBack'

const dummyData = [
  { id: 1, name: 'Dr. John Doe', speciality: 'Cardiology', reviewed: false, feedback: '', rating: 0 },
  { id: 2, name: 'Dr. Jane Smith', speciality: 'Dermatology', reviewed: false, feedback: '', rating: 0 },
];

const ReviewForm = () => {
  const [reviews, setReviews] = useState(dummyData)
	const [showForm, setShowForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  const handleOpen = (doctor) => {
    setSelectedDoctor(doctor);
    setShowForm(true);
  };  
  const handleClose = () => {
    setShowForm(false);
    setSelectedDoctor(null);
  };
  const handleSubmit = (id, formData) => {
    console.log('form', id, formData)
    setReviews(prev => prev.map(doc => 
      doc.id === id
        ? { ...doc, rating:formData.rating, reviewed: true, feedback: `${formData.name}: ${formData.feedback}` }
        : doc
    ));
  };

  return (
     <div className="reviews-container">
      <h1>Reviews</h1>
      <table className="reviews-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((doc, idx) => (
            <tr key={doc.id}>
              <td>{idx + 1}</td>
              <td>{doc.name}</td>
              <td>{doc.speciality}</td>
              <td>
                <button 
                  className="feedback-button" 
                  onClick={() => handleOpen(doc)}
                  disabled={doc.reviewed}
                >
                  Click Here
                </button>
              </td>
              <td>{doc.reviewed ? `${doc.feedback} (Rating: ${doc.rating}/5)` : 'WithOut FeedBack'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && selectedDoctor && (
        <FormFeedBack doctor={selectedDoctor} onClose={handleClose} onSubmit={handleSubmit}/>
      )}
    </div>
  );
};

export default ReviewForm;