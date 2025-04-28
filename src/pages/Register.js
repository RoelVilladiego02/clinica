import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import clinicaLogo from '../assets/clinica-laguna-logo.png';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    role: '',
    fullName: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  // const roles = [
  //   { value: 'Patient', label: 'Patient - Access appointments and teleconsultation' },
  //   { value: 'Doctor', label: 'Doctor - Access patient records and teleconsultation' },
  //   { value: 'Receptionist', label: 'Receptionist - Manage appointments and billing' },
  //   { value: 'Admin', label: 'Administrator - Access system settings and reports' },
  //   { value: 'InventoryManager', label: 'Inventory Manager - Manage stock levels' }
  // ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      // This is just a demo - in a real app, this would connect to a backend
      await register(formData);
      navigate('/login');
    } catch (error) {
      setError('Failed to create an account');
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="row justify-content-center align-items-center py-5">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow border-0">
            <div className="card-header text-center py-4" style={{ backgroundColor: '#FFFFFF', color: 'white' }}>
              <img src={clinicaLogo} alt="Clinica Laguna Logo" className="img-fluid" style={{ maxHeight: '50px' }} />
            </div>
            <div className="card-body p-4">
              <h4 className="text-center mb-4 fw-bold">Create Your Account</h4>
              {error && <div className="alert alert-danger">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter your phone number"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Choose a username"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* <div className="mb-3">
                  <label className="form-label fw-bold">Account Type</label>
                  <select 
                    className="form-select"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    required
                  >
                    <option value="">Select your account type</option>
                    {roles.map(role => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                  <div className="form-text">
                    {formData.role && (
                      <div className="mt-2 p-2 rounded" style={{ backgroundColor: '#f8d7da', color: '#E31937' }}>
                        <strong>Role Permissions:</strong>
                        {formData.role === 'Patient' && (
                          <p className="mb-0">Access patient dashboard, view appointments, and use teleconsultation services.</p>
                        )}
                        {formData.role === 'Doctor' && (
                          <p className="mb-0">Access doctor dashboard, patient records, and teleconsultation platform.</p>
                        )}
                        {formData.role === 'Receptionist' && (
                          <p className="mb-0">Access receptionist dashboard, schedule appointments, and manage billing.</p>
                        )}
                        {formData.role === 'Admin' && (
                          <p className="mb-0">Access admin dashboard, reports, and system settings.</p>
                        )}
                        {formData.role === 'InventoryManager' && (
                          <p className="mb-0">Access inventory dashboard and manage stock levels.</p>
                        )}
                      </div>
                    )}
                  </div>
                </div> */}

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-check mb-4">
                  <input className="form-check-input" type="checkbox" id="termsCheck" required />
                  <label className="form-check-label" htmlFor="termsCheck">
                    I agree to the <Link to="/terms" style={{ color: '#E31937' }}>Terms of Service</Link> and <Link to="/privacy" style={{ color: '#E31937' }}>Privacy Policy</Link>
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="btn w-100 mb-3 py-2" 
                  style={{ backgroundColor: '#E31937', color: 'white' }}
                >
                  Create Account
                </button>
                
                <div className="text-center">
                  <Link to="/login" className="text-decoration-none" style={{ color: '#E31937' }}>
                    Already have an account? Login here
                  </Link>
                </div>
              </form>
            </div>
            <div className="card-footer text-center py-3 bg-light">
              <small className="text-muted">© 2025 Clinica Laguna Medical Center • Diagnostics</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;