import React from 'react';
import InventoryList from '../components/inventory/InventoryList';
import InventoryStats from '../components/inventory/InventoryStats';
import OrderForm from '../components/inventory/OrderForm';

const Inventory = () => {
  return (
    <div className="container-fluid">
      <h2>Inventory Management</h2>
      <div className="row">
        <div className="col-md-8">
          <InventoryList />
        </div>
        <div className="col-md-4">
          <InventoryStats />
          <OrderForm />
        </div>
      </div>
    </div>
  );
};

export default Inventory;
