// src/components/ReportLayout.jsx
import React from 'react'

const ReportLayout = ({ serial, doctorName, speciality, reportFile }) => {
  return (
    <tr className="report-row">
      <td>{serial}</td>
      <td>{doctorName}</td>
      <td>{speciality}</td>
      <td>
        {/* abre en nueva pestaña */}
        <a
          href={reportFile}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-view"
        >
          View Report
        </a>
      </td>
      <td>
        {/* fuerza descarga del PDF */}
        <a
          href={reportFile}
          download="patient_report.pdf"
          className="btn btn-download"
        >
          Download Report
        </a>
      </td>
    </tr>
  )
}

export default ReportLayout
