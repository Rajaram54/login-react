import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PrivateRoute from './PrivateRoute';
import LandingPage from './LandingPage';
import Login from './Login';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Login />} // Login route does not need PrivateRoute
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={LandingPage} />} // Use PrivateRoute for protected route
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
