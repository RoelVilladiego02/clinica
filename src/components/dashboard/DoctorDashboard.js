import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [sessionNotes, setSessionNotes] = useState('');
  const [vitalSigns, setVitalSigns] = useState({
    temperature: '',
    bloodPressure: '',
    heartRate: '',
    respiratoryRate: '',
    oxygenSaturation: ''
  });

  // Updated stats using existing metrics
  const stats = {
    todayPatients: 8,
    pendingRecords: 5,
    pendingDiagnostics: 3,
    pendingPrescriptions: 4
  };

  // Keep and update teleconsultations data
  const upcomingTeleconsults = [
    {
      id: 1,
      patientName: 'John Doe',
      time: '10:00 AM',
      date: '2024-02-20',
      concern: 'Follow-up Consultation',
      status: 'Scheduled',
      meetingLink: '#'
    },
    {
      id: 2,
      patientName: 'Sarah Wilson',
      time: '2:30 PM',
      date: '2024-02-22',
      concern: 'Medication Review',
      status: 'Ready',
      meetingLink: 'https://meet.clinica.com/abc123'
    }
  ];

  // Updated today's appointments section
  const todaysAppointments = [
    { id: 1, time: '9:00 AM', patient: 'John Doe', type: 'Follow-up', status: 'Waiting' },
    { id: 2, time: '10:30 AM', patient: 'Jane Smith', type: 'New Patient', status: 'Scheduled' },
    { id: 3, time: '2:00 PM', patient: 'Mike Johnson', type: 'Check-up', status: 'Confirmed' }
  ];

  const handleStartSession = (appointment) => {
    setSelectedPatient(appointment);
    setShowSessionModal(true);
  };

  const handleEndSession = () => {
    // Here you would typically save the session data
    console.log('Session ended:', {
      patient: selectedPatient,
      notes: sessionNotes,
      vitals: vitalSigns,
      endTime: new Date().toISOString()
    });
    
    setShowSessionModal(false);
    setSelectedPatient(null);
    setSessionNotes('');
    setVitalSigns({
      temperature: '',
      bloodPressure: '',
      heartRate: '',
      respiratoryRate: '',
      oxygenSaturation: ''
    });
  };

  const handleUpdateMedicalRecord = () => {
    setShowSessionModal(false);
    navigate('/medical-records/all', { 
      state: { 
        patientInfo: selectedPatient,
        vitalSigns: vitalSigns,
        notes: sessionNotes
      }
    });
  };

  const handleCreatePrescription = () => {
    setShowSessionModal(false);
    navigate('/prescriptions/all', {
      state: {
        patientInfo: selectedPatient,
        consultationNotes: sessionNotes
      }
    });
  };

  return (
    <div className="container-fluid py-4">
      {/* Stats Cards - Keep existing metrics */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Today's Patients</h6>
                  <h3 className="mb-0">{stats.todayPatients}</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(227, 25, 55, 0.1)' }}>
                  <i className="bi bi-people-fill" style={{ fontSize: '1.5rem', color: '#E31937' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Pending Records</h6>
                  <h3 className="mb-0">{stats.pendingRecords}</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(227, 25, 55, 0.1)' }}>
                  <i className="bi bi-file-earmark-medical" style={{ fontSize: '1.5rem', color: '#E31937' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Pending Diagnostics</h6>
                  <h3 className="mb-0">{stats.pendingDiagnostics}</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(227, 25, 55, 0.1)' }}>
                  <i className="bi bi-file-earmark-text" style={{ fontSize: '1.5rem', color: '#E31937' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Pending Prescriptions</h6>
                  <h3 className="mb-0">{stats.pendingPrescriptions}</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(227, 25, 55, 0.1)' }}>
                  <i className="bi bi-prescription" style={{ fontSize: '1.5rem', color: '#E31937' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        {/* Today's Appointments Table */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="card-title mb-0">Today's Schedule</h5>
                <Link to="/doctors/schedule" className="btn btn-sm" style={{ backgroundColor: '#E31937', color: 'white' }}>
                  View Full Schedule
                </Link>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Patient</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todaysAppointments.map(apt => (
                      <tr key={apt.id}>
                        <td>{apt.time}</td>
                        <td>{apt.patient}</td>
                        <td>{apt.type}</td>
                        <td>
                          <span className={`badge bg-${apt.status === 'Waiting' ? 'danger' : 
                                                      apt.status === 'Confirmed' ? 'success' : 'warning'}`}>
                            {apt.status}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="btn btn-sm" 
                            style={{ backgroundColor: '#E31937', color: 'white' }}
                            onClick={() => handleStartSession(apt)}
                          >
                            Start Session
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Teleconsultations */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Upcoming Teleconsultations</h5>
              {upcomingTeleconsults.length > 0 ? (
                upcomingTeleconsults.map(consult => (
                  <div key={consult.id} className="consultation-card p-3 mb-3 border rounded">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="mb-1">{consult.patientName}</h6>
                        <p className="mb-1 text-muted">
                          <i className="bi bi-calendar me-2"></i>
                          {new Date(consult.date).toLocaleDateString()} at {consult.time}
                        </p>
                        <p className="mb-0 small">{consult.concern}</p>
                      </div>
                      {consult.status === 'Ready' && (
                        <a 
                          href={consult.meetingLink} 
                          className="btn btn-sm" 
                          style={{ backgroundColor: '#E31937', color: 'white' }}
                        >
                          <i className="bi bi-camera-video-fill me-2"></i>Join
                        </a>
                      )}
                    </div>
                    <div className="mt-2">
                      <span className={`badge bg-${consult.status === 'Ready' ? 'success' : 'primary'}`}>
                        {consult.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <i className="bi bi-calendar-x text-muted fs-1"></i>
                  <p className="mt-2 text-muted">No upcoming teleconsultations</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showSessionModal && selectedPatient && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: '#E31937', color: 'white' }}>
                <h5 className="modal-title">Patient Session</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowSessionModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6 className="mb-3">Patient Information</h6>
                    <p className="mb-1"><strong>Name:</strong> {selectedPatient.patient}</p>
                    <p className="mb-1"><strong>Appointment Type:</strong> {selectedPatient.type}</p>
                    <p className="mb-0"><strong>Time:</strong> {selectedPatient.time}</p>
                  </div>
                  <div className="col-md-6">
                    <h6 className="mb-3">Vital Signs</h6>
                    <div className="row g-2">
                      <div className="col-6">
                        <label className="form-label small">Temperature (°C)</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={vitalSigns.temperature}
                          onChange={(e) => setVitalSigns({...vitalSigns, temperature: e.target.value})}
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label small">Blood Pressure</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="120/80"
                          value={vitalSigns.bloodPressure}
                          onChange={(e) => setVitalSigns({...vitalSigns, bloodPressure: e.target.value})}
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label small">Heart Rate (bpm)</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={vitalSigns.heartRate}
                          onChange={(e) => setVitalSigns({...vitalSigns, heartRate: e.target.value})}
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label small">Respiratory Rate</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={vitalSigns.respiratoryRate}
                          onChange={(e) => setVitalSigns({...vitalSigns, respiratoryRate: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="mb-3">Session Notes</h6>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                    placeholder="Enter consultation notes..."
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <button 
                      className="btn btn-outline-primary w-100 mb-2"
                      onClick={handleUpdateMedicalRecord}
                    >
                      <i className="bi bi-file-earmark-medical me-2"></i>Update Medical Record
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button 
                      className="btn btn-outline-primary w-100 mb-2"
                      onClick={handleCreatePrescription}
                    >
                      <i className="bi bi-prescription me-2"></i>Create Prescription
                    </button>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowSessionModal(false)}
                >
                  Cancel Session
                </button>
                <button 
                  type="button" 
                  className="btn btn-success"
                  onClick={handleEndSession}
                >
                  Complete Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
