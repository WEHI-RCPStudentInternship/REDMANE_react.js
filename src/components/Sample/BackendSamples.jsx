import React, { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Title from '../../components/Dashboard/Title';
import { mainListItems, secondaryListItems } from '../../components/Dashboard/listItems';
import Footer from '../../components/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import WehiLogo from '../../assets/logos/wehi-logo.png';
import MelbUniLogo from '../../assets/logos/unimelb-logo.png';
import Button from '@mui/material/Button';

const drawerWidth = 240;
const defaultTheme = createTheme();
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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

export default function AllSamples() {
  const [open, setOpen] = useState(false);
  const [samples, setSamples] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const patientId = new URLSearchParams(location.search).get('patient_id');
  const projectId = new URLSearchParams(location.search).get('project_id');

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        setSamples([]); // Clear the previous samples

        const params = new URLSearchParams();
        if (patientId) params.append('patient_id', patientId);
        if (projectId) params.append('project_id', projectId);

        const query = params.toString();
        const url = `${BASE_URL}/samples/${query ? `?${query}` : ''}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSamples(data);
      } catch (error) {
        console.error('Error fetching samples:', error);
      }
    };

    fetchSamples();
  }, [patientId, projectId]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleViewDetails = (sampleId) => {
    navigate(`/sample/${sampleId}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getTitle = () => {
    if (patientId) return `Samples for Patient ${patientId}`;
    if (projectId) return `Samples for Project ${projectId}`;
    return 'All Samples';
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer} sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}>
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              {getTitle()}
            </Typography>
            <div style={{ display: 'flex',
                          alignItems: 'center',
                          backgroundColor: 'rgba(255, 255, 255, 1)',
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
                          backgroundColor: 'rgba(255, 255, 255, 1)',
                          padding: '5px',
                          borderRadius: '5px',
                          alignSelf: 'center',
                          marginRight: '10px'
                          }}>
              <img src={MelbUniLogo} alt="Melbourne University" width="30" height="30"
                   style={{marginLeft: '2px', marginRight: '2px' }} />
            </div>
            <Box sx={{ marginRight: '10px' }}>
              <Button variant="contained" color="warning" onClick={handleLogout} sx={{ textTransform: 'none', padding: '5px 20px', fontSize: '16px', backgroundColor: '#00274D' }}>
                Log Out
              </Button>
            </Box>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1] }}>
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
        <Box component="main" sx={{ backgroundColor: (theme) => theme.palette.grey[100], flexGrow: 1, height: '100vh', overflow: 'auto' }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Title>Samples</Title>
                  <Table size="large">
                    <TableHead>
                      <TableRow>
                        <TableCell>Sample ID</TableCell>
                        <TableCell>Patient ID</TableCell>
                        <TableCell>External Sample ID</TableCell>
                        <TableCell>External Sample URL</TableCell>
                        <TableCell>Public Patient ID</TableCell>
                        <TableCell align="right">Metadata Count</TableCell>
                        <TableCell align="right">View Details</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {samples.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((sample) => (
                        <TableRow key={sample.id}>
                          <TableCell>{sample.id}</TableCell>
                          <TableCell>{sample.patient_id}</TableCell>
                          <TableCell>{sample.ext_sample_id}</TableCell>
                          <TableCell>{sample.ext_sample_url}</TableCell>
                          <TableCell>{sample.patient?.public_patient_id}</TableCell>
                          <TableCell align="right">{sample.metadata_count}</TableCell>
                          <TableCell align="right">
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              onClick={() => handleViewDetails(sample.id)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={samples.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
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
