import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ doctorName, speciality }) => {
  const [showForm, setShowForm] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Feedback enviado para el Dr./Dra. ${doctorName}: ${feedback}`);
    setFeedback('');
    setShowForm(false);
  };

  return (
    <div className="review-form">
      {!showForm ? (
        <div className="info-section">
          <p><strong>Doctor:</strong> {doctorName}</p>
          <p><strong>Especialidad:</strong> {speciality}</p>
          <button className="feedback-button" onClick={() => setShowForm(true)}>
            Proveer Feedback
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="feedback-form">
          <h3>Formulario de Comentarios</h3>
          <textarea
            placeholder="Escribe tu comentario aquí..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="submit-button">
            Enviar
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => setShowForm(false)}
          >
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
