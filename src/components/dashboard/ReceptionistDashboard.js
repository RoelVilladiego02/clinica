import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
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

const ReceptionistDashboard = () => {
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Mock data for today's appointments
  const todaysAppointments = [
    { 
      id: 1, 
      time: '9:00 AM', 
      patient: 'John Doe', 
      doctor: 'Dr. Smith', 
      concern: 'Fever and Headache',
      type: 'Walk-in',
      status: 'Waiting' 
    },
    { 
      id: 2, 
      time: '9:30 AM', 
      patient: 'Jane Smith', 
      doctor: 'Dr. Johnson', 
      concern: 'Regular Check-up',
      type: 'Online',
      status: 'Checked In' 
    },
    { 
      id: 3, 
      time: '10:00 AM', 
      patient: 'Robert Brown', 
      doctor: 'Dr. Wilson', 
      concern: 'Follow-up Consultation',
      type: 'Teleconsult',
      status: 'Scheduled' 
    }
  ];

  // Hourly check-ins data
  const checkInsData = {
    labels: ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM'],
    datasets: [{
      label: 'Patient Check-ins',
      data: [2, 4, 3, 5, 2, 3, 4, 1],
      borderColor: '#E31937',
      backgroundColor: 'rgba(227, 25, 55, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  const handleCheckIn = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCheckInModal(true);
  };

  return (
    <div className="container-fluid py-4">
      {/* Stats Summary */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Today's Appointments</h6>
                  <h3 className="mb-0">12</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(227, 25, 55, 0.1)' }}>
                  <i className="bi bi-calendar-check" style={{ fontSize: '1.5rem', color: '#E31937' }}></i>
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
                  <h6 className="text-muted mb-2">Checked In</h6>
                  <h3 className="mb-0">5</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(227, 25, 55, 0.1)' }}>
                  <i className="bi bi-person-check" style={{ fontSize: '1.5rem', color: '#E31937' }}></i>
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
                  <h6 className="text-muted mb-2">Waiting</h6>
                  <h3 className="mb-0">3</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(227, 25, 55, 0.1)' }}>
                  <i className="bi bi-hourglass-split" style={{ fontSize: '1.5rem', color: '#E31937' }}></i>
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
                  <h6 className="text-muted mb-2">New Patients</h6>
                  <h3 className="mb-0">2</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(227, 25, 55, 0.1)' }}>
                  <i className="bi bi-person-plus" style={{ fontSize: '1.5rem', color: '#E31937' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        {/* Appointments Table */}
        <div className="col-lg-8 mb-4 mb-lg-0">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="card-title mb-0">Today's Schedule</h5>
                <Link to="/appointments/new" className="btn btn-sm" style={{ backgroundColor: '#E31937', color: 'white' }}>
                  New Appointment
                </Link>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Patient</th>
                      <th>Doctor</th>
                      <th>Concern</th>
                      <th>Type</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todaysAppointments.map(apt => (
                      <tr key={apt.id}>
                        <td>{apt.time}</td>
                        <td>{apt.patient}</td>
                        <td>{apt.doctor}</td>
                        <td>{apt.concern}</td>
                        <td>
                          <span className={`badge ${
                            apt.type === 'Walk-in' ? 'bg-primary' :
                            apt.type === 'Online' ? 'bg-success' :
                            'bg-info'  // for Teleconsult
                          }`}>
                            {apt.type}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="btn btn-sm" 
                            style={{ backgroundColor: '#E31937', color: 'white' }}
                            onClick={() => handleCheckIn(apt)}
                            disabled={apt.status === 'Checked In'}
                          >
                            Check In
                          </button>
                          <button className="btn btn-sm btn-outline-secondary ms-2">
                            Details
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

        {/* Quick Actions */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4">Quick Actions</h5>
              <div className="d-grid gap-2">
                <Link to="/patients/register" className="btn btn-outline-primary">
                  <i className="bi bi-person-plus me-2"></i>Register New Patient
                </Link>
                <Link to="/billing" className="btn btn-outline-primary">
                  <i className="bi bi-receipt me-2"></i>Process Payment
                </Link>
              </div>
            </div>
          </div>

          {/* Check-ins Chart */}
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Today's Check-ins</h5>
              <Line 
                data={checkInsData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    title: { display: false }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Check-in Modal */}
      {showCheckInModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Check In Patient</h5>
                <button type="button" className="btn-close" onClick={() => setShowCheckInModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <strong>Patient:</strong> {selectedAppointment.patient}
                </div>
                <div className="mb-3">
                  <strong>Appointment:</strong> {selectedAppointment.time} with {selectedAppointment.doctor}
                </div>
                <div className="mb-3">
                  <label className="form-label">Payment Method</label>
                  <select className="form-select">
                    <option value="">Select payment method</option>
                    <option value="cash">Cash</option>
                    <option value="credit">Credit Card</option>
                    <option value="gcash">GCash</option>
                    <option value="paymaya">PayMaya</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Consultation Fee</label>
                  <div className="input-group">
                    <span className="input-group-text">₱</span>
                    <input type="number" className="form-control" defaultValue="500" />
                  </div>
                </div>
                <div className="form-check mb-3">
                  <input className="form-check-input" type="checkbox" id="verifyPayment" />
                  <label className="form-check-label" htmlFor="verifyPayment">
                    Payment Received
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCheckInModal(false)}>Cancel</button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  style={{ backgroundColor: '#E31937', borderColor: '#E31937' }}
                >
                  Complete Check-in
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceptionistDashboard;
