import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

const LogoutButton = () => {
  const { logout } = useAuth0();

  console.log("LogoutButton rendered");

  return (
    <Button
      variant="contained"
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin + '/login' } })}
      sx={{
        textTransform: 'none',
        padding: '5px 20px',
        fontSize: '16px',
        backgroundColor: '#00274D',
        '&:hover': {
          backgroundColor: '#0056b3',
        },
      }}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
