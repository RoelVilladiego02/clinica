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

const InventoryManagerDashboard = () => {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Mock data for inventory items
  const lowStockItems = [
    { id: 1, name: 'Surgical Masks', quantity: 50, threshold: 100, category: 'PPE', status: 'Critical' },
    { id: 2, name: 'Gloves', quantity: 25, threshold: 50, category: 'PPE', status: 'Low' },
    { id: 3, name: 'Syringes', quantity: 30, threshold: 75, category: 'Medical Supplies', status: 'Critical' }
  ];

  // Mock data for pending orders
  const pendingOrders = [
    { id: 1, item: 'Surgical Masks', quantity: 500, orderDate: '2024-02-15', status: 'Processing' },
    { id: 2, item: 'Gloves', quantity: 1000, orderDate: '2024-02-14', status: 'Shipped' }
  ];

  // Usage trends data for chart
  const usageTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Item Usage',
      data: [150, 230, 180, 290, 200, 250],
      borderColor: '#E31937',
      backgroundColor: 'rgba(227, 25, 55, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Monthly Item Usage'
      }
    }
  };

  const handleQuickOrder = (item) => {
    setSelectedItem(item);
    setShowOrderModal(true);
  };

  return (
    <div className="container-fluid py-4">
      {/* Stats Summary */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Total Items</h6>
                  <h3 className="mb-0">1,245</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(227, 25, 55, 0.1)' }}>
                  <i className="bi bi-box-seam" style={{ fontSize: '1.5rem', color: '#E31937' }}></i>
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
                  <h6 className="text-muted mb-2">Low Stock Alerts</h6>
                  <h3 className="mb-0">{lowStockItems.length}</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(227, 25, 55, 0.1)' }}>
                  <i className="bi bi-exclamation-triangle" style={{ fontSize: '1.5rem', color: '#E31937' }}></i>
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
                  <h6 className="text-muted mb-2">Pending Orders</h6>
                  <h3 className="mb-0">{pendingOrders.length}</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(227, 25, 55, 0.1)' }}>
                  <i className="bi bi-clock-history" style={{ fontSize: '1.5rem', color: '#E31937' }}></i>
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
                  <h6 className="text-muted mb-2">Categories</h6>
                  <h3 className="mb-0">8</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: 'rgba(227, 25, 55, 0.1)' }}>
                  <i className="bi bi-grid" style={{ fontSize: '1.5rem', color: '#E31937' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        {/* Low Stock Alerts */}
        <div className="col-lg-8 mb-4 mb-lg-0">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="card-title mb-0">Low Stock Alerts</h5>
                <Link to="/inventory" className="btn btn-sm" style={{ backgroundColor: '#E31937', color: 'white' }}>
                  Manage Inventory
                </Link>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Category</th>
                      <th>Quantity</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStockItems.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="progress flex-grow-1" style={{ height: '6px' }}>
                              <div 
                                className="progress-bar bg-danger" 
                                style={{ width: `${(item.quantity / item.threshold) * 100}%` }}
                              ></div>
                            </div>
                            <span className="ms-2">{item.quantity}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${item.status === 'Critical' ? 'bg-danger' : 'bg-warning'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="btn btn-sm" 
                            style={{ backgroundColor: '#E31937', color: 'white' }}
                            onClick={() => handleQuickOrder(item)}
                          >
                            Quick Order
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

        {/* Pending Orders */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Pending Orders</h5>
              <div className="list-group list-group-flush">
                {pendingOrders.map(order => (
                  <div key={order.id} className="list-group-item px-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{order.item}</h6>
                        <small className="text-muted">Ordered: {order.orderDate}</small>
                        <p className="mb-0 small">Quantity: {order.quantity}</p>
                      </div>
                      <span className={`badge ${order.status === 'Processing' ? 'bg-warning' : 'bg-info'}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Trends Chart */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Usage Trends</h5>
              <Line data={usageTrendsData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Order Modal */}
      {showOrderModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Quick Order - {selectedItem?.name}</h5>
                <button type="button" className="btn-close" onClick={() => setShowOrderModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Order Quantity</label>
                    <input type="number" className="form-control" defaultValue={selectedItem?.threshold} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <select className="form-select">
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowOrderModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" style={{ backgroundColor: '#E31937', borderColor: '#E31937' }}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagerDashboard;
