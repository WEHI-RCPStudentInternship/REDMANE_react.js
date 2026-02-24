import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import './index.css'
import { Provider } from 'react-redux';
import store from './store';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-6mdq3tdvjb04tojd.us.auth0.com"
      clientId="raZrj2RJz28jARpFHF3YzSVBB7sqGEvV"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      onRedirectCallback={(appState) => {
        window.location.replace(appState?.returnTo || '/dashboard');
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);