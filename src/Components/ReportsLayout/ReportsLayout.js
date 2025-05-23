// src/components/ReportsLayout.jsx
import React from 'react'
import ReportLayout from './ReportLayout'
import './ReportsLayout.css'

const ReportsLayout = () => {
  // datos quemados de ejemplo
  const reports = [
    {
      id: '1',
      doctorName: 'Dr. John Doe',
      speciality: 'Cardiology',
      // asumimos que el PDF está en public/patient_report.pdf
      reportFile: '/patient_report.pdf'
    },
    {
      id: '2',
      doctorName: 'Dr. Jane Smith',
      speciality: 'Dermatology',
      reportFile: '/patient_report.pdf'
    }
  ]

  return (
    <div className="reports-container">
      <h2 className="reports-title">Reports</h2>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r, i) => (
            <ReportLayout
              key={r.id}
              serial={i + 1}
              doctorName={r.doctorName}
              speciality={r.speciality}
              reportFile={r.reportFile}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReportsLayout
