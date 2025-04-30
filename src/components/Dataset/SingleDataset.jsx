import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import { mainListItems, secondaryListItems } from '../../components/Dashboard/listItems';
import Footer from '../../components/Footer';
import WehiLogo from '../../assets/logos/wehi-logo.png';
import MelbUniLogo from '../../assets/logos/unimelb-logo.png';
import Tooltip from '@mui/material/Tooltip';

import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions'
import dataset from '../../assets/testjson/output.json';


// Generate Order Data, this will be replaced with data from the backend
function createData(id, dId, date, name, source) {
    return { id, dId, date, name, source};
}

const rows = [
    createData(5, 'BIOL10001', '16 Aug, 2024', 'GeneFlow', 'University of Melbourne'),
    createData(2, 'GENE10002', '16 Jun, 2024', 'BioSpectrum', 'cBioPortal'),
    createData(10, 'BIOL10001', '16 Aug, 2024', 'GeneFlow', 'University of Melbourne'),
    createData(1, 'GENE10001', '26 Jun, 2024', 'VitalMetrics', 'University of Melbourne'),
    createData(12, 'GENE10002', '16 Jun, 2024', 'BioSpectrum', 'cBioPortal'),
    createData(7, 'GENE10002', '16 Jun, 2024', 'BioSpectrum', 'cBioPortal'),
    createData(14, 'GENE10003', '15 Apr, 2024', 'GenomicAtlas', 'USYD'),
    createData(0, 'BIOL10001', '16 Aug, 2024', 'GeneFlow', 'University of Melbourne'),
    createData(9, 'GENE10003', '15 Apr, 2024', 'GenomicAtlas', 'USYD'),
    createData(11, 'GENE10001', '26 Jun, 2024', 'VitalMetrics', 'University of Melbourne'),
    createData(6, 'GENE10001', '26 Jun, 2024', 'VitalMetrics', 'University of Melbourne'),
    createData(3, 'BIOL10006', '16 May, 2024', 'CellBase', 'WEHI'),
    createData(4, 'GENE10003', '15 Apr, 2024', 'GenomicAtlas', 'USYD'),
    createData(8, 'BIOL10006', '16 May, 2024', 'CellBase', 'WEHI'),
    createData(13, 'BIOL10006', '16 May, 2024', 'CellBase', 'WEHI'),
  ];
  
  function preventDefault(event) {
    event.preventDefault();
  }

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

export default function AllDatasets() {
    
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  
  const rawDataLocation = dataset.data.location; // Extract base path
  const rawFiles = dataset.data.files.raw.map(file => file.directory); // Extract file paths without extra quotes
  
  // Format as Python code
  const pythonCode = `import os\n\nbase_path = '${rawDataLocation}'\nraw_file_array = [\n  ${rawFiles.map(file => `'${file}'`).join(",\n  ")}\n]\n`;
  
  const rCode = `
      # Define the base path
      base_path <- "${rawDataLocation}"
  
      # Define the raw file array
      raw_file_array <- c(
        ${rawFiles.map(file => `"${file}"`).join(",\n  ")}
      )
  
      # Combine paths
      file_paths <- paste(base_path, raw_file_array, sep = "")
  
      # Print the file paths
      print(file_paths)
      `;
  


  // Copy function Python
  const handleCopyPython = () => {
    navigator.clipboard.writeText(pythonCode)
      .then(() => alert("Python snippet copied to clipboard!"))
      .catch(err => console.error("Failed to copy:", err));
  };

  // Copy function R
  const handleCopyR = () => {
    navigator.clipboard.writeText(rCode)
      .then(() => alert("R snippet copied to clipboard!"))
      .catch(err => console.error("Failed to copy:", err));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate('/login'); // Redirect to the login page
  };

  // Function to open the dialog
  const handleOpenPop = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleClosePop = () => {
    setOpen(false);
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
              TUFT Data Environment - Data Registry
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
                    
                    <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Paper sx={{ p: 4, flexGrow: 1 }}>
                        <Typography variant="h5" gutterBottom>
                          Whole-exome sequencing of Lung Cancer Tumour-Normal pairs
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'gray', lineHeight: '2' }} gutterBottom>
                          TDE0001
                        </Typography>
                        <Typography variant="body1">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vehicula, mauris eget ullamcorper pellentesque, risus dolor consequat ligula, a dictum lacus odio at odio. Integer cursus dui at libero hendrerit, vitae auctor metus tempus. Duis facilisis justo ut orci varius, at molestie metus sollicitudin. Nunc accumsan, lorem eget luctus euismod, metus augue facilisis libero, eget egestas lectus libero eget magna.
                        </Typography>
                    </Paper>
                    </Grid>

                    <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Paper sx={{ p: 4, flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Raw Data</Typography>

                        {/* use the following line of code if there is an existing json file for TDE0001 */}
                        {/*<Typography variant="body2">Located: WEHI Milton {dataset.data.location}</Typography> */}

                        <Typography variant="body2">Located: WEHI Milton /vast/projects/TDE/TDE0001</Typography>

                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Copy code for raw data</Typography>

                        <Button variant="outlined" sx={{ mr: 2, mt: 1 }} onClick={handleCopyPython}>WEHI Jupyter Notebook</Button>

                        <Button variant="outlined" sx={{ mr: 2, mt: 1 }} onClick={handleOpenPop}>SLURM pre-processing</Button>
                        {/* Dialog (Popup) */}
                        <Dialog open={open} onClose={handleClosePop} maxWidth="sm" fullWidth >
                          
                          <DialogContent>
                            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                            <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>Run SLURM pre-processing</DialogTitle>
                              <Typography variant="body1"><b>Run number:</b> TDE0005-002</Typography>
                              <Typography variant="body1"><b>Pre-processing script:</b> /vast/projects/TDE/scripts/cfDNA_pre-processing.sh</Typography>
                              <Typography variant="body1"><b>Directory:</b> /vast/projects/TDE/TDE0005</Typography>
                              <Typography variant="body1"><b>Configuration file:</b> /vast/projects/TDE/TDE0005/pre-processing/TDE0005-002.ini</Typography>
                              <Typography variant="body1"><b>Output directory:</b> /vast/projects/TDE/TDE0005/processed/TDE0005-002/</Typography>
                              <Typography variant="body1"><b>Log file:</b> /vast/projects/TDE/TDE0005/processed/TDE0005-002/out.log</Typography>
                            </Paper>
                          </DialogContent>

                          {/* Close Button */}
                          <DialogActions>
                            <Button onClick={handleClosePop} variant="contained" color="error">Close</Button>
                          </DialogActions>
                        </Dialog>
                      
                        <Button variant="outlined" sx={{ mt: 1 }} onClick={handleCopyR}>WEHI RStudio</Button>
                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Data Portals</Typography>

                        {/* Link to Omero data portal - the '2' in the link is the project ID in Omero */}
                        {/* This is for example to show how it links to Omero only, TDE0001 actually uses cBioPortal since it's genomic data. */}
                        <Tooltip title="Omero">
                          <Button variant="outlined" sx={{ mr: 2, mt: 1 }} component={Link} href="http://118.138.242.23:4080/webclient/?show=dataset-2" target="_blank">
                            Omero
                          </Button>
                        </Tooltip>
                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Other views</Typography>
                        <Button variant="outlined" sx={{ mr: 2, mt: 1 }} onClick={() => navigate('/dashboard')}>All Samples View</Button>
                        <Button variant="outlined" sx={{ mr: 2, mt: 1 }} onClick={() => navigate('/datasets')}>All Datasets View</Button>
                        <Button variant="outlined" sx={{ mr: 2, mt: 1 }} onClick={() => navigate('/patients')}>All Samples Summary</Button>

                        {/* hard coded */}
                        <Button variant="outlined" sx={{ mt: 1 }} onClick={() => navigate('/dataset/details/BIOL10001')}>Files for this dataset</Button>
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

