import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import DoctorDashboard from '../components/dashboard/DoctorDashboard';
import ReceptionistDashboard from '../components/dashboard/ReceptionistDashboard';
import InventoryManagerDashboard from '../components/dashboard/InventoryManagerDashboard';
import PatientDashboard from '../components/dashboard/PatientDashboard';

const Dashboard = () => {
  const { currentUser } = useAuth();

  const getWelcomeMessage = (role) => {
    switch(role) {
      case 'Admin':
        return '';
      case 'Doctor':
        return '';
      case 'Receptionist':
        return '';
      case 'InventoryManager':
        return '';
      case 'Patient':
        return '';
      default:
        return 'Welcome';
    }
  };

  const getDashboardByRole = () => {
    switch(currentUser.role) {
      case 'Admin':
        return <AdminDashboard />;
      case 'Doctor':
        return <DoctorDashboard />;
      case 'Receptionist':
        return <ReceptionistDashboard />;
      case 'InventoryManager':
        return <InventoryManagerDashboard />;
      case 'Patient':
        return <PatientDashboard />;
      default:
        return <div>Access Denied</div>;
    }
  };

  return (
    <div className="container-fluid">
      <h1>{getWelcomeMessage(currentUser.role)}</h1>
      {getDashboardByRole()}
    </div>
  );
};

export default Dashboard;
