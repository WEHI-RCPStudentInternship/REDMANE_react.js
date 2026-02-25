import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter, useNavigate } from 'react-router-dom';

function Auth0ProviderWithNavigate({ children }) {
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || '/projects');
  };

  return (
    <Auth0Provider
      domain="dev-6mdq3tdvjb04tojd.us.auth0.com"
      clientId="raZrj2RJz28jARpFHF3YzSVBB7sqGEvV"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        {/* <Provider store={store}> */}
        <App />
        {/* </Provider> */}
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);