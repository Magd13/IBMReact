// src/components/BookingConsultation/BookingConsultation.js
import React, { useEffect, useState } from 'react';
import './InstantConsultation/InstantConsultation.css';                  // reutilizamos el mismo CSS
import FindDoctorSearch from "./FindDoctorSearch/FindDoctorSearch";
import DoctorCard       from './DoctorCard/DoctorCard';

const BookingConsultation = () => {
  const [doctors, setDoctors]               = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched]         = useState(false);

  // Traemos la lista de doctores al montar
  useEffect(() => {
    fetch('https://api.npoint.io/9a5543d36f1460da2f63')
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
      })
      .catch(err => console.error(err));
  }, []);

  // Función que recibe el texto de búsqueda desde FindDoctorSearch
  const handleSearch = (searchText) => {
    if (!searchText.trim()) {
      setFilteredDoctors([]);
      setIsSearched(false);
      return;
    }
    const filtered = doctors.filter(doc =>
      doc.speciality.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDoctors(filtered);
    setIsSearched(true);
  };

  return (
    <center>
      <div className="searchpage-container">
        {/* 1) Campo de búsqueda */}
        <FindDoctorSearch onSearch={handleSearch} />

        {/* 2) Resultados */}
        <div className="search-results-container">
          {isSearched && (
            <>
              <h2>{filteredDoctors.length} doctors available</h2>
              <h3>
                Book appointments with minimum wait-time & verified details
              </h3>

              {filteredDoctors.length > 0 ? (
                filteredDoctors.map(doctor => (
                  <DoctorCard
                    className="doctorcard"
                    key={doctor.id || doctor.name}
                    {...doctor}
                  />
                ))
              ) : (
                <p>No doctors found.</p>
              )}
            </>
          )}
        </div>
      </div>
    </center>
  );
};

export default BookingConsultation;
