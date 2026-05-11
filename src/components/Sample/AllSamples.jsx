import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../components/Dashboard/Title';
import { useState } from 'react';
import TablePagination from '@mui/material/TablePagination';

import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';


// Generate Sample Data, this will be replaced with data from the backend
function createData(id, extSampleId, patientId, source, metadataCount) {
  return { id, extSampleId, patientId, source, metadataCount };
}

const rows = [
  createData(
    0,
    'XY001',
    'PatientID001_DiseaseX',
    'University of Melbourne',
    0,
  ),
  createData(
    1,
    'XY002',
    'PatientID002_DiseaseX',
    'University of Melbourne',
    2,
  ),
  createData(
    2,
    'XY003',
    'PatientID003_DiseaseX',
    'cBioPortal',
    1,
  ),
  createData(
    3,
    'XY004',
    'PatientID004_DiseaseX',
    'WEHI',
    3,
  ),
  createData(
    4,
    'XY005',
    'PatientID005_DiseaseX',
    'USYD',
    0,
  ),
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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AllSamples() {

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleViewDetails = (extSampleId) => {
    navigate(`/sample/${extSampleId}`);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
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
              All Samples
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
              <Button
                variant="contained"
                color="warning"
                onClick={handleLogout}
                sx={{ textTransform: 'none',
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
                  <React.Fragment>
                    <Title>Samples</Title>
                    <Table size="large">
                      <TableHead>
                        <TableRow>
                          <TableCell align='center'>ID</TableCell>
                          <TableCell align='center'>External Sample ID</TableCell>
                          <TableCell align='center'>Patient ID</TableCell>
                          <TableCell>Source</TableCell>
                          <TableCell align='center'>Metadata Count</TableCell>
                          <TableCell align="right">View Details</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                          <TableRow key={row.id}>
                            <TableCell align='center'>{row.id}</TableCell>
                            <TableCell align='center'>{row.extSampleId}</TableCell>
                            <TableCell align='center'>{row.patientId}</TableCell>
                            <TableCell>{row.source}</TableCell>
                            <TableCell align='center'>{row.metadataCount}</TableCell>
                            <TableCell align="right">
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => handleViewDetails(row.extSampleId)}
                                sx={{ textTransform: 'none',
                                      padding: '5px 10px',
                                      fontSize: '10px',
                                }}
                              >
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </React.Fragment>
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
