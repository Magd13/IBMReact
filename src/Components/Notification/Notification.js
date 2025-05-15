import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';  

const Notification = ({ children }) => {
  // Estados
  const [isLoggedIn, setIsLoggedIn]         = useState(false);
  const [username, setUsername]             = useState("");
  const [doctorData, setDoctorData]         = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    console.log('storage', localStorage)
    const storedUsername        = sessionStorage.getItem('email');
    const storedDoctorData      = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(
      localStorage.getItem(storedDoctorData?.name)
    );

    console.log('appotment', storedAppointmentData, storedDoctorData, storedUsername)
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
    }
  }, []);

  useEffect(() => {
    if (appointmentData?.status === 'cancelled') {
      setShowNotification(false);
    }
  }, [appointmentData]);

  const formatDate = isoString => {
    if (!isoString) return '';
    const d = new Date(isoString);
    return d.toLocaleDateString();     // p.e. "14/5/2025"
  };
  const formatTime = isoString => {
    if (!isoString) return '';
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  console.log('log', isLoggedIn, showNotification, appointmentData)
  return (
    <div>
      <Navbar />

      {children}

      {isLoggedIn && showNotification && appointmentData && (
        <div className="notification-container">
          <button 
            className="notification-close-btn"
            onClick={() => setShowNotification(false)}
          >
            ×
          </button>
          <h4 className="notification-title">Nueva Cita Reservada</h4>
          <p><strong>Usuario:</strong> {username}</p>
          <p><strong>Médico:</strong> {doctorData?.name}</p>
          <p><strong>Fecha:</strong> {formatDate(appointmentData.datetime)}</p>
          <p><strong>Hora:</strong> {formatTime(appointmentData.datetime)}</p>
          <p><strong>Estado:</strong> {appointmentData.status}</p>
        </div>
      )}
    </div>
  );
};

export default Notification;
