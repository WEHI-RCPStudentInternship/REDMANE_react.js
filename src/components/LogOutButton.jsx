import React from 'react';
import { useAuth } from 'react-oidc-context';
import { Button } from '@mui/material';

const LogoutButton = () => {
  const auth = useAuth();

  return (
    <Button
      variant="conteined"
      onClick={() => auth.signoutRedirect({
        post_logout_redirect_uri: window.location.origin + '/login'
      })}
      sx={{
        textTransform: 'none',
        padding: '5px 20px',
        fontSize: '16px',
        backgroundColor: '#00274D',
        '&:hover': { backgroundColor: '#0056b3' },
      }}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
