import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter, useNavigate } from 'react-router-dom';

function AuthProviderWithNavigate({ children }) {
  const navigate = useNavigate();

  const oidcConfig = {
    authority: import.meta.env.VITE_OIDC_AUTHORITY,
    client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
    redirect_uri: window.location.origin,
    scope: 'openid profile email',
    extraQueryParams: {
      audience: import.meta.env.VITE_OIDC_AUDIENCE
    },
    onSigninCallback: () => {
      window.history.replaceState({}, document.title, '/');
    },
  };
  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProviderWithNavigate>
        <App />
      </AuthProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);