import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import clinicaLogo from '../assets/clinica-laguna-logo.png';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const roles = [
    { value: 'Patient', label: 'Patient - Access appointments and teleconsultation' },
    { value: 'Doctor', label: 'Doctor - Access patient records and teleconsultation' },
    { value: 'Receptionist', label: 'Receptionist - Manage appointments and billing' },
    { value: 'Admin', label: 'Administrator - Access system settings and reports' },
    { value: 'InventoryManager', label: 'Inventory Manager - Manage stock levels' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Pass the role to the login function
      await login({
        username: formData.username,
        password: formData.password,
        role: formData.role // Make sure role is included
      });
      console.log('Logging in as:', formData.role); // Debug log
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to login');
    }
  };

  const getRoleDescription = (role) => {
    switch (role) {
      case 'Patient':
        return 'Access patient dashboard for appointments and teleconsultation';
      case 'Doctor':
        return 'Access doctor dashboard for patient records and teleconsultation';
      case 'Receptionist':
        return 'Access receptionist dashboard for scheduling and billing';
      case 'Admin':
        return 'Access admin dashboard for system settings and reports';
      case 'InventoryManager':
        return 'Access inventory dashboard for stock management';
      default:
        return '';
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="row justify-content-center align-items-center py-5">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow border-0">
            <div className="card-header text-center py-4" style={{ backgroundColor: '#FFFFFF', color: 'white' }}>
              <img src={clinicaLogo} alt="Clinica Laguna Logo" className="img-fluid" style={{ maxHeight: '50px' }} />
            </div>
            <div className="card-body p-4">
              <h4 className="text-center mb-4 fw-bold">Login</h4>
              {error && <div className="alert alert-danger">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Login As [FOR TESTING PURPOSES ONLY]</label>
                  <select 
                    className="form-select"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    required
                  >
                    <option value="">Select your role</option>
                    {roles.map(role => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                  {formData.role && (
                    <div className="mt-2 p-2 rounded" style={{ backgroundColor: '#f8d7da', color: '#E31937' }}>
                      <small>{getRoleDescription(formData.role)}</small>
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="btn w-100 mb-3 py-2" 
                  style={{ backgroundColor: '#E31937', color: 'white' }}
                >
                  Login
                </button>
                
                <div className="text-center">
                  <Link to="/register" className="text-decoration-none" style={{ color: '#E31937' }}>
                    Don't have an account? Register here
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

export default Login;