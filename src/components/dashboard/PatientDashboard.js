import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    doctorId: '',
    date: '',
    time: '',
    concern: '',
    paymentMethod: ''
  });

  // Add mock data for upcoming teleconsultations
  const upcomingTeleconsults = [
    {
      id: 1,
      doctor: 'Dr. Smith',
      date: '2024-02-20',
      time: '10:00 AM',
      concern: 'Follow-up Consultation',
      status: 'Scheduled',
      meetingLink: '#'
    },
    {
      id: 2,
      doctor: 'Dr. Johnson',
      date: '2024-02-22',
      time: '2:30 PM',
      concern: 'Medication Review',
      status: 'Ready',
      meetingLink: 'https://meet.clinica.com/abc123'
    }
  ];

  const upcomingAppointments = [
    { id: 1, date: '2023-08-15', time: '10:00 AM', doctor: 'Dr. Smith', type: 'Check-up' }
  ];

  const recentPrescriptions = [
    { id: 1, medication: 'Amoxicillin', dosage: '500mg', date: '2023-08-01' }
  ];

  const doctors = [
    { id: 1, name: 'Dr. Smith', specialization: 'General Medicine', fee: 800 },
    { id: 2, name: 'Dr. Johnson', specialization: 'Pediatrics', fee: 1000 },
    { id: 3, name: 'Dr. Williams', specialization: 'Internal Medicine', fee: 1200 }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const handleBooking = (e) => {
    e.preventDefault();
    // Handle booking submission
    console.log('Booking submitted:', bookingData);
    setShowBookingModal(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Upcoming Appointments Card */}
        <div className="col-md-6">
          <div className="card dashboard-card">
            <div className="card-body">
              <h5 className="card-title">Upcoming Appointments</h5>
              {upcomingAppointments.map(apt => (
                <div key={apt.id} className="mb-3 p-3 border rounded">
                  <h6>{apt.date} at {apt.time}</h6>
                  <p className="mb-1">Doctor: {apt.doctor}</p>
                  <p className="mb-1">Type: {apt.type}</p>
                  <Link to="/appointments" className="btn btn-sm btn-primary mt-2">
                    View Details
                  </Link>
                </div>
              ))}
              <Link to="/appointments/new" className="btn btn-primary">
                Schedule New Appointment
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Prescriptions Card */}
        <div className="col-md-6">
          <div className="card dashboard-card">
            <div className="card-body">
              <h5 className="card-title">Recent Prescriptions</h5>
              {recentPrescriptions.map(prescription => (
                <div key={prescription.id} className="mb-3 p-3 border rounded">
                  <h6>{prescription.medication}</h6>
                  <p className="mb-1">Dosage: {prescription.dosage}</p>
                  <p className="mb-1">Date: {prescription.date}</p>
                </div>
              ))}
              <Link to="/prescriptions" className="btn btn-primary">
                View All Prescriptions
              </Link>
            </div>
          </div>
        </div>

        {/* Upcoming Teleconsultations Card */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">Upcoming Teleconsultations</h5>
                <button 
                  className="btn" 
                  style={{ backgroundColor: '#E31937', color: 'white' }}
                  onClick={() => setShowBookingModal(true)}
                >
                  <i className="bi bi-camera-video me-2"></i>Book Teleconsult
                </button>
              </div>
              <div className="upcoming-consultations">
                {upcomingTeleconsults.length > 0 ? (
                  upcomingTeleconsults.map(consult => (
                    <div key={consult.id} className="consultation-card p-3 mb-3 border rounded">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{consult.doctor}</h6>
                          <p className="mb-1 text-muted">
                            <i className="bi bi-calendar me-2"></i>
                            {new Date(consult.date).toLocaleDateString()} at {consult.time}
                          </p>
                          <p className="mb-0 small">{consult.concern}</p>
                        </div>
                        {consult.status === 'Ready' && (
                          <a href={consult.meetingLink} className="btn btn-success btn-sm">
                            <i className="bi bi-camera-video-fill me-2"></i>Join Now
                          </a>
                        )}
                      </div>
                      <div className="mt-2">
                        <span className={`badge bg-${
                          consult.status === 'Ready' ? 'success' :
                          consult.status === 'Scheduled' ? 'primary' :
                          'secondary'
                        }`}>
                          {consult.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted py-4">
                    <i className="bi bi-calendar-x fs-1"></i>
                    <p className="mt-2">No upcoming teleconsultations</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="card dashboard-card">
            <div className="card-body">
              <h5 className="card-title">Quick Actions</h5>
              <div className="row g-3">
                <div className="col-md-4">
                  <Link to="/medical-records" className="btn btn-outline-primary w-100">
                    <i className="bi bi-file-medical me-2"></i>
                    Medical Records
                  </Link>
                </div>
                <div className="col-md-4">
                  <Link to="/profile" className="btn btn-outline-primary w-100">
                    <i className="bi bi-person me-2"></i>
                    Update Profile
                  </Link>
                </div>
                <div className="col-md-4">
                  <Link to="/billing-history" className="btn btn-outline-primary w-100">
                    <i className="bi bi-receipt me-2"></i>
                    View Bills
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Book Teleconsultation</h5>
                <button type="button" className="btn-close" onClick={() => setShowBookingModal(false)}></button>
              </div>
              <form onSubmit={handleBooking}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Select Doctor</label>
                    <select 
                      className="form-select"
                      value={bookingData.doctorId}
                      onChange={(e) => setBookingData({...bookingData, doctorId: e.target.value})}
                      required
                    >
                      <option value="">Choose a doctor</option>
                      {doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.name} - {doctor.specialization} (₱{doctor.fee})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Date</label>
                      <input
                        type="date"
                        className="form-control"
                        min={new Date().toISOString().split('T')[0]}
                        value={bookingData.date}
                        onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Time</label>
                      <select 
                        className="form-select"
                        value={bookingData.time}
                        onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                        required
                      >
                        <option value="">Select time</option>
                        {timeSlots.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Reason for Consultation</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={bookingData.concern}
                      onChange={(e) => setBookingData({...bookingData, concern: e.target.value})}
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Payment Method</label>
                    <div className="row g-3">
                      {['Credit Card', 'GCash', 'PayMaya'].map(method => (
                        <div key={method} className="col-md-4">
                          <div 
                            className={`card p-3 text-center cursor-pointer ${
                              bookingData.paymentMethod === method ? 'border-primary' : ''
                            }`}
                            onClick={() => setBookingData({...bookingData, paymentMethod: method})}
                            style={{ cursor: 'pointer' }}
                          >
                            <i className={`bi bi-${
                              method === 'Credit Card' ? 'credit-card' :
                              method === 'GCash' ? 'wallet2' : 'phone'
                            } fs-3 mb-2`}></i>
                            {method}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowBookingModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Confirm Booking (₱{doctors.find(d => d.id === Number(bookingData.doctorId))?.fee || 0})
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
