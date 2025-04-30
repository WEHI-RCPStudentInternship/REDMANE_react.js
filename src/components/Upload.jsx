import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { Button, Container } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import WehiLogo from '../assets/logos/wehi-logo.png';
import MelbUniLogo from '../assets/logos/unimelb-logo.png';

import { mainListItems, secondaryListItems } from '../components/Dashboard/listItems';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/authActions'

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}
  
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
zIndex: theme.zIndex.drawer + 1,
transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
}),
backgroundColor: '#00274D', // Change the background color
...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
    }),
}),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7.5),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7),
          },
        }),
      },
    }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export default function Upload() {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
    setOpen(!open);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout()); // Dispatch the logout action
        navigate('/login'); // Redirect to the login page
    };

    return (
        <ThemeProvider theme={defaultTheme}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
              <Toolbar
                sx={{
                  pr: '24px', // keep right padding when drawer closed
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  Register New Dataset - Data Registry
                </Typography>
                <div style={{ display: 'flex', 
                              alignItems: 'center',
                              backgroundColor: 'rgba(255, 255, 255, 1)' ,
                              padding: '5px',
                              borderRadius: '5px',
                              alignSelf: 'center',
                              marginRight: '10px'
                              }}>
                  <img src={WehiLogo} alt="WEHI" width="90" height="30" 
                       style={{marginLeft: '10px', marginRight: '10px' }} />
                </div>
                <div style={{ display: 'flex', 
                              alignItems: 'center',
                              backgroundColor: 'rgba(255, 255, 255, 1)' ,
                              padding: '5px',
                              borderRadius: '5px',
                              alignSelf: 'center',
                              marginRight: '10px'
                              }}>
                  <img src={MelbUniLogo} alt="Melbourne University" width="30" height="30"
                       style={{marginLeft: '2px', marginRight: '2px' }} />
                </div>
                <Box sx={{ marginRight: '10px' }}> {/* Adjust the marginLeft value as needed */}
                  <Button
                   variant="contained"
                   color="warning"
                   onClick={handleLogout}
                   sx={{ textTransform: 'none',
                         padding: '5px 20px', // Increase padding for a bigger button
                         fontSize: '16px', // Increase font size
                         backgroundColor: '#00274D', // Choose a slightly darker or lighter shade of blue
                        '&:hover': {
                        backgroundColor: '#0056b3', // Darker shade for hover state
                        }, 
                      }}
                  >
                    Log Out
                  </Button>
                </Box>
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                {mainListItems()}
                <Divider sx={{ my: 1 }} />
                {secondaryListItems()}
            </List>
            </Drawer>
            <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
            >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h5" gutterBottom>
                            Register New Dataset
                        </Typography>
                        <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            mt: 3,
                        }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            console.log("Form submitted"); // Replace with upload logic
                        }}
                        ></Box>
                        {/* Grid Container for Two Columns */}
                        <Grid container spacing={4}>
                            {/* Left Column */}
                            <Grid item xs={12} md={6}>
                            {/* Title Field */}
                            <TextField
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                variant="outlined"
                                placeholder="Lung cancer Whole Genome Sequencing"
                                sx={{ mb: 2 }}
                            />

                            {/* Abstract Field */}
                            <TextField
                                required
                                fullWidth
                                multiline
                                rows={4}
                                id="abstract"
                                label="Abstract"
                                variant="outlined"
                                placeholder="Enter a brief abstract for the dataset"
                                sx={{ mb: 2 }}
                            />

                            {/* Site Field */}
                            <TextField
                                required
                                fullWidth
                                id="site"
                                label="Site"
                                variant="outlined"
                                placeholder="WEHI Milton"
                                sx={{ mb: 2 }}
                            />

                            {/* Location Field */}
                            <TextField
                                fullWidth
                                id="location"
                                label="Location"
                                variant="outlined"
                                placeholder="/vast/projects/TDE/"
                                sx={{ mb: 2 }}
                            />
                            </Grid>

                            {/* Right Column */}
                            <Grid item xs={12} md={6}>
                            {/* Raw Files Field */}
                            <TextField
                                fullWidth
                                id="raw-files"
                                label="Raw Files"
                                variant="outlined"
                                placeholder="*.fastq, *.fasta"
                                sx={{ mb: 2 }}
                            />

                            {/* Processed Files Field */}
                            <TextField
                                fullWidth
                                id="processed-files"
                                label="Processed Files"
                                variant="outlined"
                                placeholder="*.cram, *.bam"
                                sx={{ mb: 2 }}
                            />

                            {/* Summary Files Field */}
                            <TextField
                                fullWidth
                                id="summary-files"
                                label="Summary Files"
                                variant="outlined"
                                placeholder="*.vcf, *.maf"
                                sx={{ mb: 2 }}
                            />

                            {/* README Files Field */}
                            <TextField
                                fullWidth
                                id="readme-files"
                                label="README Files"
                                variant="outlined"
                                placeholder="README.md"
                                sx={{ mb: 2 }}
                            />
                            </Grid>
                        </Grid>
                    

                    {/* Submit Button */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{
                            backgroundColor: '#00274D',
                            '&:hover': {
                            backgroundColor: '#0056b3',
                            },
                        }}
                        >
                        Register New
                        </Button>
                    </Box>
                    

                    </Paper>
                    </Grid>
                </Grid>
                <Footer />
            </Container>
            
            
            </Box>
        </Box>
    </ThemeProvider>
    );

}

