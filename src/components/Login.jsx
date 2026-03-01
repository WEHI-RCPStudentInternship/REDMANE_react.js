import * as React from 'react';
import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WehiLogo from '../assets/logos/wehi-logo.png';
import MelbUniLogo from '../assets/logos/unimelb-logo.png';
import BusinessIcon from '@mui/icons-material/Business';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

const defaultTheme = createTheme()

export default function SignIn() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/projects');
    }
  }, [auth.isAuthenticated]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={WehiLogo} alt="WEHI" width="240" height="80" style={{ marginRight: '20px' }} />
            <div style={{ borderLeft: '2px solid grey', height: '100px', marginRight: '15px' }}></div>
            <img src={MelbUniLogo} alt="Melbourne University" width="90" height="90" />
          </div>
          <br />
          <Typography component="h1" variant="h5">Sign in</Typography>
          <Box sx={{ mt: 1, width: '100%' }}>
            <Button fullWidth variant="contained" sx={{ mt: 1, mb: 2 }} onClick={() => auth.signinRedirect()}>
              Sign In
            </Button>
            <Button fullWidth variant="contained" sx={{ mt: 1, mb: 2 }} onClick={() => auth.signinRedirect()}>
              <BusinessIcon sx={{ mr: 1 }} />
              Sign In Through Your Institution
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link href="https://www.wehi.edu.au/" variant="body2">About Us</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}