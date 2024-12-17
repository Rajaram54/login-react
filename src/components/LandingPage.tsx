import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

const LandingPage: React.FC = () => {
  const { logout, user, getAccessTokenSilently } = useAuth0();
  // Ensure `user` is correctly typed
  const saveUserToDB = async () => {
    try {
      if (!user) {
        throw new Error("User not authenticated");
      }
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.AUTH0_AUDIENCE,
          scope: process.env.AUTH0_SCOPE,
        }
      });

      const response = await fetch("http://localhost:8000/users/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : "", // Send token in header
        },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          picture: user.picture,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save user to database");
      }

      const data = await response.json();
      console.log("User saved to database:", data);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  useEffect(() => {
    if (user) {
      saveUserToDB();
    }
  }, [user]); // Make sure to call saveUserToDB only when user changes

  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">Qwerty</div>
        <div className="user-info">
          <span>Welcome, {user?.name}</span>
          <button
            className="logout-button"
            onClick={() => logout({
              openUrl: () => {
                window.location.replace(window.location.origin); // Manually redirect after logout
              }
            })}
          >
            Log Out
          </button>
        </div>
      </header>
      <main className="main-content">
        <h1>Welcome to Qwerty</h1>
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Qwerty. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
