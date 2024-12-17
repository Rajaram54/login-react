import React, { useEffect } from 'react';
import { useNavigate } from "react-router";
import { useAuth0 } from '@auth0/auth0-react';
import './App';

// Define types for the props (if any)
const Login: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to dashboard after successful login
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]); // Add navigate to the dependency array

  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">Qwerty</div>
        <button
          className="login-button"
          onClick={() =>
            loginWithRedirect({
              authorizationParams: {
                audience: process.env.AUTH0_AUDIENCE,
                scope: process.env.AUTH0_SCOPE,
              },
            })
          }
        >
          Log In
        </button>
      </header>
      <main className="main-content">
        <h1>Welcome to Qwerty</h1>
        <p>Discover the best way to achieve your goals with us.</p>
        <button className="get-started-button">Get Started</button>
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Qwerty. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
