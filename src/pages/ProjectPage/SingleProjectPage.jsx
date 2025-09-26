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
        [theme.breakpoints.up('sm')]: { width: theme.spacing(7) },
      }),
    },
  }),
);

const defaultTheme = createTheme();

/* ----------------------------- Size helpers ----------------------------- */
// Extract size (bytes) from API objects that may contain `total_size_bytes`
// or (older) `total_size_kb`.
const getBytes = (obj) => {
  if (!obj) return 0;
  if (typeof obj.total_size_bytes === 'number') return obj.total_size_bytes;
  if (typeof obj.total_size_kb === 'number') return obj.total_size_kb * 1024;
  return 0;
};

// Format bytes with sensible units so small values don’t show as 0.0 GB.
const formatSmartSize = (bytes) => {
  if (!bytes || bytes <= 0) return '0 B';
  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;

  if (bytes >= GB) return `${(bytes / GB).toFixed(2)} GB`;    // 2 dp in GB
  if (bytes >= MB) return `${(bytes / MB).toFixed(1)} MB`;    // 1 dp in MB
  return `${(bytes / KB).toFixed(0)} KB`;                     // integer KB
};
/* ----------------------------------------------------------------------- */

export default function SingleProjectPage() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => setOpen(!open);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const id = Number(projectId);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [summary, setSummary] = React.useState(null); // { project_id, project_name, totals, datasets[] }

  React.useEffect(() => {
    let mounted = true;
    async function run() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${BASE_URL}/projects/${id}/summary`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (mounted) setSummary(data);
      } catch (e) {
        if (mounted) setError(e.message || 'Failed to load summary');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    if (!Number.isNaN(id)) run();
    return () => { mounted = false; };
  }, [id]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const projectTitle = summary?.project_name ? summary.project_name : `Project ${id}`;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        {/* HEADER */}
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

        {/* DRAWER */}
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
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Title>{projectTitle}</Title>

                  {loading && <Typography variant="h6" sx={{ my: 2 }}>Loading…</Typography>}
                  {error && !loading && (
                    <Typography variant="h6" color="error" sx={{ my: 2 }}>
                      {error}
                    </Typography>
                  )}

                  {!loading && !error && summary && (
                    <>
                      {/* Totals */}
                      <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
                        <Grid item xs={12} sm={6} md={3}>
                          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                            <CardContent>
                              <Typography variant="overline" color="text.secondary">Total Files</Typography>
                              <Typography variant="h5">{summary.totals.file_count}</Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                            <CardContent>
                              <Typography variant="overline" color="text.secondary">Total Patients</Typography>
                              <Typography variant="h5">{summary.totals.patient_count}</Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                            <CardContent>
                              <Typography variant="overline" color="text.secondary">Total Samples</Typography>
                              <Typography variant="h5">{summary.totals.sample_count}</Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                            <CardContent>
                              <Typography variant="overline" color="text.secondary">Total Size</Typography>
                              <Typography variant="h5">
                                {formatSmartSize(getBytes(summary.totals))}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>

                      <Divider sx={{ mb: 1 }} />

                      {/* Dataset table */}
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
                          {summary.datasets.map((d) => (
                            <TableRow key={d.dataset_id}>
                              <TableCell>{d.dataset_name}</TableCell>
                              <TableCell align="right">{d.file_count}</TableCell>
                              <TableCell align="right">{d.patient_count}</TableCell>
                              <TableCell align="right">{d.sample_count}</TableCell>
                              <TableCell align="right">{formatSmartSize(getBytes(d))}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </>
                  )}
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



