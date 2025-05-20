import React, { useState } from 'react';
import './FormFeedBack.css';

const FormFeedBack = ({ doctor, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    feedback: '',
    rating: 0,
  });

  const handleRatingChange = (ratingValue) => {
    setFormData((prev) => ({ ...prev, rating: ratingValue }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(doctor.id, formData)
    setFormData(null)
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Comentarios para {doctor.name}</h2>
        <p>Especialidad: {doctor.speciality}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Ingresa tu nombre"
            required
          />
          <textarea
            name="feedback"
            id="feedback"
            value={formData.feedback}
            onChange={handleChange}
            placeholder="Escribe tu opinión..."
            required
          />
          <div className="rating">
            <label>Rating:</label>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingChange(star)}
                className={formData.rating >= star ? 'star selected' : 'star'}
                style={{ cursor: 'pointer', fontSize: '1.5rem', color: formData.rating >= star ? '#FFD700' : '#ccc' }}
              >
                ★
              </span>
            ))}
          </div>
          <div className="buttons">
            <button type="submit" className="submit-button">Enviar</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );  
}

export default FormFeedBack