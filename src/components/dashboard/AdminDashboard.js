import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  // Patient visits data
  const patientVisitsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Patient Visits',
      data: [45, 39, 53, 47, 54, 48],
      borderColor: '#E31937',
      backgroundColor: 'rgba(227, 25, 55, 0.1)',
      tension: 0.3,
      fill: true
    }]
  };

  const patientVisitsOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Patient Visits',
        color: '#333',
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Visits'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Month'
        }
      }
    }
  };

  // Appointment types distribution
  const appointmentTypesData = {
    labels: ['Check-up', 'Follow-up', 'Consultation', 'Procedure', 'Emergency'],
    datasets: [{
      data: [35, 25, 22, 15, 3],
      backgroundColor: [
        '#E31937',
        '#FF6384',
        '#FF9F40',
        '#36A2EB',
        '#4BC0C0'
      ],
      borderWidth: 1
    }]
  };

  const appointmentTypesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Appointment Types',
        color: '#333',
        font: {
          size: 16
        }
      }
    }
  };

  // Today's appointments
  const todaysAppointments = [
    { id: 1, time: '9:00 AM', patient: 'John Doe', type: 'Follow-up', status: 'Checked In', image: 'https://via.placeholder.com/150' },
    { id: 2, time: '10:30 AM', patient: 'Jane Smith', type: 'Consultation', status: 'Scheduled', image: 'https://via.placeholder.com/150' },
    { id: 3, time: '1:00 PM', patient: 'Robert Johnson', type: 'Check-up', status: 'Scheduled', image: 'https://via.placeholder.com/150' },
    { id: 4, time: '2:30 PM', patient: 'Emily Davis', type: 'Procedure', status: 'Confirmed', image: 'https://via.placeholder.com/150' },
    { id: 5, time: '4:00 PM', patient: 'Michael Wilson', type: 'Follow-up', status: 'Scheduled', image: 'https://via.placeholder.com/150' }
  ];

  // Recent patients who need follow-up
  const needFollowUp = [
    { id: 1, patient: 'Sarah Johnson', lastVisit: '2025-04-20', reason: 'Post-surgery check', image: 'https://via.placeholder.com/150' },
    { id: 2, patient: 'Thomas Brown', lastVisit: '2025-04-19', reason: 'Test results review', image: 'https://via.placeholder.com/150' }
  ];

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Checked In':
        return 'bg-success';
      case 'Confirmed':
        return 'bg-primary';
      case 'Scheduled':
        return 'bg-warning text-dark';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="container-fluid py-4">
      {/* Welcome and summary section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm" style={{ borderLeft: '4px solid #E31937' }}>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-auto">
                  <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(227, 25, 55, 0.1)' }}>
                    <i className="bi bi-calendar-check" style={{ fontSize: '2rem', color: '#E31937' }}></i>
                  </div>
                </div>
                <div className="col">
                  <h4 className="mb-1">Today's Schedule</h4>
                  <p className="text-muted mb-0">You have 5 appointments scheduled for today</p>
                </div>
                <div className="col-auto">
                  <Link to="/doctor-schedules" className="btn" style={{ backgroundColor: '#E31937', color: 'white' }}>
                    View All Appointments
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats summary */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3 mb-md-0">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Today's Patients</h6>
                  <h3 className="mb-0">5</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(227, 25, 55, 0.1)' }}>
                  <i className="bi bi-people" style={{ fontSize: '1.5rem', color: '#E31937' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3 mb-md-0">
          <div className="card border-0 shadow-sm h-100">
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
        <div className="col-md-3 mb-3 mb-md-0">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Pending Reports</h6>
                  <h3 className="mb-0">3</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(227, 25, 55, 0.1)' }}>
                  <i className="bi bi-clipboard-data" style={{ fontSize: '1.5rem', color: '#E31937' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Teleconsults</h6>
                  <h3 className="mb-0">1</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(227, 25, 55, 0.1)' }}>
                  <i className="bi bi-camera-video" style={{ fontSize: '1.5rem', color: '#E31937' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and appointments */}
      <div className="row mb-4">
        <div className="col-lg-8 mb-4 mb-lg-0">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-4">Today's Appointments</h5>
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
                    {todaysAppointments.map(appointment => (
                      <tr key={appointment.id}>
                        <td className="fw-bold">{appointment.time}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="avatar me-2">
                              <div className="avatar-placeholder rounded-circle bg-secondary" style={{ width: '40px', height: '40px' }}></div>
                            </div>
                            <div>{appointment.patient}</div>
                          </div>
                        </td>
                        <td>{appointment.type}</td>
                        <td>
                          <span className={`badge ${getStatusBadgeClass(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <button 
                              type="button" 
                              className="btn btn-sm" 
                              style={{ backgroundColor: '#E31937', color: 'white' }}
                            >
                              <i className="bi bi-clipboard-plus me-1"></i> Start
                            </button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">
                              <i className="bi bi-three-dots"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-4">Appointment Distribution</h5>
              <Doughnut data={appointmentTypesData} options={appointmentTypesOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Patient visits chart and follow-ups */}
      <div className="row">
        <div className="col-lg-8 mb-4 mb-lg-0">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-4">Patient Visits Trend</h5>
              <Line data={patientVisitsData} options={patientVisitsOptions} />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-4">Patients Needing Follow-up</h5>
              <div className="list-group list-group-flush">
                {needFollowUp.map(patient => (
                  <div key={patient.id} className="list-group-item px-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div className="avatar me-3">
                          <div className="avatar-placeholder rounded-circle bg-secondary" style={{ width: '40px', height: '40px' }}></div>
                        </div>
                        <div>
                          <h6 className="mb-0">{patient.patient}</h6>
                          <small className="text-muted">Last visit: {patient.lastVisit}</small>
                          <p className="mb-0 small">{patient.reason}</p>
                        </div>
                      </div>
                      <button 
                        className="btn btn-sm" 
                        style={{ backgroundColor: '#E31937', color: 'white' }}
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;