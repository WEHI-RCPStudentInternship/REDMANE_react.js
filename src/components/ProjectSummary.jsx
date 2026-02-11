import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { Button, Container, Typography, Grid, Paper, List, ListItem, ListItemText } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import WehiLogo from '../assets/logos/wehi-logo.png';
import MelbUniLogo from '../assets/logos/unimelb-logo.png';
import { mainListItems, secondaryListItems } from '../components/Dashboard/listItems';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#00274D',
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
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
    }),
  },
}));

const defaultTheme = createTheme();
const projectData = {
  "project_id": "12345",
  "project_summary": {
    "description": "This project focuses on analyzing patient and sample data across multiple organizations, including WEHI and Royal Melbourne Hospital. The data spans various conditions and data types, offering insights into disease mechanisms and treatment outcomes.",
    "total_patients": 60,
    "total_samples": 108,
    "storage": {
      "total_size": "45TB",
      "wehi_data": "30TB",
      "royal_melbourne_hospital_data": "15TB"
    },
    "breakdown": {
      "patients": {
        "squamous_cell_carcinoma": 53,
        "adenocarcinoma": 7
      },
      "physical_samples": {
        "squamous_cell_carcinoma": 98,
        "adenocarcinoma": 10
      },
      "data_types": {
        "wes_t_n": 18,
        "scrnaseq": 10,
        "microbiome": 9,
        "cfdna": 0,
        "redcap_profiles_complete": 3
      }
    }
  }
};

export default function ProjectSummary() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => setOpen(!open);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              Project Summary
            </Typography>
            <img src={WehiLogo} alt="WEHI" width="90" height="30" style={{ marginRight: '10px' }} />
            <img src={MelbUniLogo} alt="Melbourne University" width="30" height="30" />
            <Button variant="contained" color="warning" onClick={handleLogout} sx={{ ml: 2, textTransform: 'none' }}>Log Out</Button>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <List>{mainListItems()}</List>
          <List>{secondaryListItems()}</List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', p: 3 }}>
          <Toolbar />
          <Container>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Project ID: {projectData.project_id}
              </Typography>
              <Typography variant="body1" paragraph>
                {projectData.project_summary.description}
              </Typography>
              <Typography variant="h6">Summary</Typography>
              <List>
                <ListItem><ListItemText primary={`Total Patients: ${projectData.project_summary.total_patients}`} /></ListItem>
                <ListItem><ListItemText primary={`Total Samples: ${projectData.project_summary.total_samples}`} /></ListItem>
                <ListItem><ListItemText primary={`Total Storage: ${projectData.project_summary.storage.total_size}`} /></ListItem>
                <ListItem><ListItemText primary={`WEHI Data: ${projectData.project_summary.storage.wehi_data}`} /></ListItem>
                <ListItem><ListItemText primary={`Royal Melbourne Hospital Data: ${projectData.project_summary.storage.royal_melbourne_hospital_data}`} /></ListItem>
              </List>

              <Typography variant="h6">Breakdown</Typography>
              <List>
                <ListItem><ListItemText primary={`Patients (Squamous Cell Carcinoma): ${projectData.project_summary.breakdown.patients.squamous_cell_carcinoma}`} /></ListItem>
                <ListItem><ListItemText primary={`Patients (Adenocarcinoma): ${projectData.project_summary.breakdown.patients.adenocarcinoma}`} /></ListItem>
                <ListItem><ListItemText primary={`Physical Samples (Squamous Cell Carcinoma): ${projectData.project_summary.breakdown.physical_samples.squamous_cell_carcinoma}`} /></ListItem>
                <ListItem><ListItemText primary={`Physical Samples (Adenocarcinoma): ${projectData.project_summary.breakdown.physical_samples.adenocarcinoma}`} /></ListItem>
                <ListItem><ListItemText primary={`Data Types (WES T/N): ${projectData.project_summary.breakdown.data_types.wes_t_n}`} /></ListItem>
                <ListItem><ListItemText primary={`Data Types (scRNAseq): ${projectData.project_summary.breakdown.data_types.scrnaseq}`} /></ListItem>
                <ListItem><ListItemText primary={`Data Types (Microbiome): ${projectData.project_summary.breakdown.data_types.microbiome}`} /></ListItem>
                <ListItem><ListItemText primary={`Data Types (cfDNA): ${projectData.project_summary.breakdown.data_types.cfdna}`} /></ListItem>
                <ListItem><ListItemText primary={`Data Types (REDCap Profiles Complete): ${projectData.project_summary.breakdown.data_types.redcap_profiles_complete}`} /></ListItem>
              </List>
            </Paper>
          </Container>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}