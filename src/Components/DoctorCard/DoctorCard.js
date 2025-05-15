import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentFormIC';
import { v4 as uuidv4 } from 'uuid';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCancel = (appointmentId) => {
    setAppointments((prev) =>
      prev.filter((appointment) => appointment.id !== appointmentId)
    );
    setShowModal(false);
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
    };
    setAppointments((prev) => [...prev, newAppointment]);
    setShowModal(false);
  };

  const latestAppointmentId = appointments.length
    ? appointments[appointments.length - 1].id
    : null;

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            fill="currentColor"
            className="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">
            {experience} years experience
          </div>
          <div className="doctor-card-detail-consultationfees">
            Ratings: {ratings}
          </div>
        </div>
      </div>

      <div className="doctor-card-options-container">
        {appointments.length > 0 ? (
          <button
            className="cancel-appointment-btn"
            onClick={() => handleCancel(latestAppointmentId)}
          >
            Cancel Appointment
          </button>
        ) : (
          <button
            className="book-appointment-btn"
            onClick={handleBooking}
          >
            <div>Book Appointment</div>
            <div>No Booking Fee</div>
          </button>
        )}

        <Popup
          modal
          open={showModal}
          onClose={handleCloseModal}
          contentStyle={{ padding: '20px', maxWidth: '500px' }}
        >
          {(close) => (
            <div className="doctorbg">
              <button className="modal-close-btn" onClick={() => { close(); handleCloseModal(); }}>
                &times;
              </button>

              <div className="doctor-card-profile-image-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="46"
                  height="46"
                  fill="currentColor"
                  className="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </div>
              <div className="doctor-card-details">
                <div className="doctor-card-detail-name">{name}</div>
                <div className="doctor-card-detail-speciality">
                  {speciality}
                </div>
                <div className="doctor-card-detail-experience">
                  {experience} years experience
                </div>
                <div className="doctor-card-detail-consultationfees">
                  Ratings: {ratings}
                </div>
              </div>

              {appointments.length > 0 ? (
                <>
                  <h3 style={{ textAlign: 'center' }}>
                    Appointment Booked!
                  </h3>
                  {appointments.map((appointment) => (
                    <div className="bookedInfo" key={appointment.id}>
                      <p>Name: {appointment.name}</p>
                      <p>Phone: {appointment.phoneNumber}</p>
                      <p>
                        Date: {appointment.date} at {appointment.time} (
                        {appointment.slot})
                      </p>
                      <button onClick={() => handleCancel(appointment.id)}>
                        Cancel Here
                      </button>
                    </div>
                  ))}
                </>
              ) : (
                /* Si no hay citas, mostramos el formulario */
                <AppointmentForm
                  doctorName={name}
                  doctorSpeciality={speciality}
                  onSubmit={handleFormSubmit}
                />
              )}
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCard;
