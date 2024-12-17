import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';

// Get the root element and ensure it is not null
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found. Ensure there is an element with id 'root' in your HTML.");
}

// Create the React root
const root = ReactDOM.createRoot(rootElement);

// Render the application
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN || ""}
      clientId={process.env.AUTH0_CLIENT_ID || ""}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      authorizationParams={{
        audience: process.env.AUTH0_AUDIENCE,
        redirect_uri: window.location.origin,
        scope: process.env.AUTH0_SCOPE,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
