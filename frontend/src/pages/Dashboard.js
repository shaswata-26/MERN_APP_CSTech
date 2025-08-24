import React from 'react';
import { useAuth } from '../utils/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Welcome, {user.name}!</h5>
              <p className="card-text">
                You are logged in as an {user.role}. Use the navigation menu to manage agents and lists.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;