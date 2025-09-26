// src/pages/SingleProjectPage.jsx
import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { Button, Card, CardContent, Divider } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../components/Dashboard/Title';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';
import { useNavigate, useParams } from 'react-router-dom';
import { mainListItems, secondaryListItems } from '../../components/Dashboard/listItems';
import Footer from '../../components/Footer';
import WehiLogo from '../../assets/logos/wehi-logo.png';
import MelbUniLogo from '../../assets/logos/unimelb-logo.png';

const drawerWidth = 240;
const BASE_URL = import.meta.env.VITE_API_BASE_URL; // reserved for real fetches later

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
        [theme.breakpoints.up('sm')]: { width: theme.spacing(7) },
      }),
    },
  }),
);

const defaultTheme = createTheme();

export default function SingleProjectPage() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => setOpen(!open);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const id = Number(projectId);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const projectName = `Project ${id}`;

  // Dummy dataset summary rows
  const rows = [
    { datasetName: 'WGS Cohort A',   files: 120, patients: 45, samples: 68, size: '92.4 GB' },
    { datasetName: 'RNA-Seq Pilot',  files: 36,  patients: 12, samples: 24, size: '18.1 GB' },
    { datasetName: 'Clinical Forms', files: 12,  patients: 50, samples: 0,  size: '2.5 GB'  },
  ];

  // Totals (assumes GB units in dummy data)
  const totals = rows.reduce(
    (acc, r) => {
      acc.files += r.files;
      acc.patients += r.patients;
      acc.samples += r.samples;
      const n = parseFloat(String(r.size).replace(/[^\d.]/g, '')) || 0;
      acc.sizeGB += n;
      return acc;
    },
    { files: 0, patients: 0, samples: 0, sizeGB: 0 }
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        {/* HEADER (same as projects page) */}
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{ mr: '36px', ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>

            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Project Summary
            </Typography>

            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,1)', padding: 5, borderRadius: 5, alignSelf: 'center', marginRight: 10 }}>
              <img src={WehiLogo} alt="WEHI" width="90" height="30" style={{ marginLeft: 10, marginRight: 10 }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,1)', padding: 5, borderRadius: 5, alignSelf: 'center', marginRight: 10 }}>
              <img src={MelbUniLogo} alt="Melbourne University" width="30" height="30" style={{ marginLeft: 2, marginRight: 2 }} />
            </div>

            <Box sx={{ marginRight: '10px' }}>
              <Button
                variant="contained"
                color="warning"
                onClick={handleLogout}
                sx={{ textTransform: 'none', px: 2.5, py: 0.75, fontSize: '16px', backgroundColor: '#00274D', '&:hover': { backgroundColor: '#0056b3' } }}
              >
                Log Out
              </Button>
            </Box>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* DRAWER (same) */}
        <Drawer variant="permanent" open={open}>
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1] }}>
            <IconButton onClick={toggleDrawer}><ChevronLeftIcon /></IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems()}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems()}
          </List>
        </Drawer>

        {/* BODY */}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {/* ONE white card: title + totals + table */}
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {/* Project title */}
                  <Title>{projectName}</Title>

                  {/* Totals row */}
                  <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                        <CardContent>
                          <Typography variant="overline" color="text.secondary">Total Files</Typography>
                          <Typography variant="h5">{totals.files}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                        <CardContent>
                          <Typography variant="overline" color="text.secondary">Total Patients</Typography>
                          <Typography variant="h5">{totals.patients}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                        <CardContent>
                          <Typography variant="overline" color="text.secondary">Total Samples</Typography>
                          <Typography variant="h5">{totals.samples}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                        <CardContent>
                          <Typography variant="overline" color="text.secondary">Total Size</Typography>
                          <Typography variant="h5">{totals.sizeGB.toFixed(1)} GB</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  <Divider sx={{ mb: 1 }} />

                  {/* Dataset summary table */}
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Dataset Name</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Number of Files</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Number of Patients</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Number of Samples</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>File Size</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((r, i) => (
                        <TableRow key={i}>
                          <TableCell>{r.datasetName}</TableCell>
                          <TableCell align="right">{r.files}</TableCell>
                          <TableCell align="right">{r.patients}</TableCell>
                          <TableCell align="right">{r.samples}</TableCell>
                          <TableCell align="right">{r.size}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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


