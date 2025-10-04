import React, { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert, Chip, Typography} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
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
import { mainListItems, secondaryListItems } from '../Dashboard/listItems';
import Footer from '../Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import WehiLogo from '../../assets/logos/wehi-logo.png';
import MelbUniLogo from '../../assets/logos/unimelb-logo.png';

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
        [theme.breakpoints.up('sm')]: { width: theme.spacing(7) },
      }),
    },
  }),
);

export default function AllDatasets() {
  const [open, setOpen] = useState(false);
  const [datasets, setDatasets] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openRegister, setOpenRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, severity: 'success', message: '' });

  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    site: "",
    location: "",
    raw: "",
    processed: "",
    summary: "",
    readme: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const projectId = new URLSearchParams(location.search).get('project_id');

  const toggleDrawer = () => setOpen(!open);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);
  const handleAlertClose = () => setAlert({ ...alert, open: false });

  useEffect(() => {
    fetchDatasets();
  }, [projectId]);

  const fetchDatasets = async () => {
    try {
      let url = `${BASE_URL}/datasets/`;
      if (projectId) url += `?project_id=${projectId}`;
      const response = await fetch(url);
      const data = await response.json();
      const sorted = data.sort((a, b) => a.id - b.id);
      setDatasets(sorted);
    } catch (error) {
      console.error('Error fetching datasets:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleViewDetails = (dId) => navigate(`/dataset/${dId}`);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Compute displayId and "isNew" for datasets
  const datasetsWithRank = datasets.map((d, _, arr) => {
    const rank = arr.filter(x => x.project_id === d.project_id && x.id <= d.id).length;
    const createdDate = new Date(d.created_at);
    const isNew = (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24) <= 1; // within 1 days
    return { ...d, displayId: `P${d.project_id}-${rank}`, isNew };
  });

  const isFormValid =
    formData.title.trim() !== "" &&
    formData.abstract.trim() !== "" &&
    formData.site.trim() !== "";

  const handleRegisterDataset = async () => {
    try {
      setLoading(true);
      const form = new FormData();
      form.append("project_id", projectId || 1);
      form.append("name", formData.title);
      form.append("abstract", formData.abstract);
      form.append("site", formData.site);
      if (formData.location) form.append("location", formData.location);
      if (formData.raw) form.append("raw_files", formData.raw);
      if (formData.processed) form.append("processed_files", formData.processed);
      if (formData.summary) form.append("summary_files", formData.summary);
      if (formData.readme) form.append("readme_files", formData.readme);

      const response = await fetch(`${BASE_URL}/datasets/`, { method: "POST", body: form });
      if (!response.ok) throw new Error("Failed to register dataset");

      const result = await response.json();
      console.log("Dataset created:", result);

      await fetchDatasets();
      setAlert({ open: true, severity: 'success', message: `Dataset '${formData.title}' created successfully!` });
      setFormData({ title: "", abstract: "", site: "", location: "", raw: "", processed: "", summary: "", readme: "" });
      setOpenRegister(false);
    } catch (error) {
      console.error("Error creating dataset:", error);
      setAlert({ open: true, severity: 'error', message: "Failed to create dataset. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/* AppBar */}
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}>
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              {projectId ? `Datasets for Project ${projectId}` : 'All Datasets'}
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '5px', borderRadius: '5px', marginRight: '10px' }}>
              <img src={WehiLogo} alt="WEHI" width="90" height="30" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '5px', borderRadius: '5px', marginRight: '10px' }}>
              <img src={MelbUniLogo} alt="Melbourne University" width="30" height="30" />
            </div>
            <Box sx={{ marginRight: '10px' }}>
              <Button variant="contained" color="warning" onClick={handleLogout} sx={{ textTransform: 'none', padding: '5px 20px', fontSize: '16px', backgroundColor: '#00274D' }}>
                Log Out
              </Button>
            </Box>
            <IconButton color="inherit"><NotificationsIcon /></IconButton>
          </Toolbar>
        </AppBar>

        {/* Drawer */}
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

        {/* Main Content */}
        <Box component="main" sx={{ backgroundColor: (theme) => theme.palette.grey[100], flexGrow: 1, height: '100vh', overflow: 'auto' }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Table size="large">
                    <TableHead>
                      <TableRow>
                        <TableCell>Dataset ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Site</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell align="right">View Details</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {datasetsWithRank.length === 0 ? (
                        <TableRow><TableCell colSpan={5} align="center">No datasets available.</TableCell></TableRow>
                      ) : (
                        datasetsWithRank
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((dataset) => (
                            <TableRow key={dataset.id}>
                              <TableCell>{dataset.displayId}</TableCell>

                              {/* Name column with NEW tag */}
                              <TableCell sx={{ fontSize: '16px' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <span>{dataset.name || "—"}</span>
                                  {dataset.isNew && (
                                    <Chip
                                      label="NEW"
                                      color="error"
                                      variant="outlined"
                                      size="small"
                                      sx={{
                                        ml: 1,
                                        height: 20,
                                        fontWeight: 700,
                                        '& .MuiChip-label': { px: 0.5, py: 0, fontSize: 12 },
                                      }}
                                    />
                                  )}
                                </Box>
                              </TableCell>

                              <TableCell>{dataset.site || "—"}</TableCell>
                              <TableCell>
                                {dataset.created_at
                                  ? new Date(dataset.created_at).toISOString().split("T")[0]
                                  : "—"}
                              </TableCell>
                              <TableCell align="right">
                                <Button variant="contained" color="primary" size="small" onClick={() => handleViewDetails(dataset.id)} sx={{ textTransform: 'none' }}>
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                      )}
                    </TableBody>
                  </Table>

                  {/* Bottom Section */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleOpenRegister} sx={{ textTransform: 'none', height: '36px' }}>
                      Register New Dataset
                    </Button>

                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={datasetsWithRank.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      sx={{
                        '& .MuiTablePagination-toolbar': { p: 0, minHeight: 36 },
                        '& .MuiInputBase-root': { height: 36 },
                      }}
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            <Footer />
          </Container>
        </Box>
      </Box>

      {/* Dialog for Register */}
      <Dialog open={openRegister} onClose={handleCloseRegister} maxWidth="md" fullWidth>
        <DialogTitle sx={{color: '#00274D' }}>Register New Dataset</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField required fullWidth label="Title" placeholder="e.g., Lung Cancer Whole Genome Sequencing"
                sx={{ mb: 2 }}
                value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              <TextField required fullWidth multiline rows={4} label="Abstract" placeholder="Provide a brief summary for the dataset"
                sx={{ mb: 2 }} value={formData.abstract} onChange={(e) => setFormData({ ...formData, abstract: e.target.value })} />
              <TextField required fullWidth label="Site" placeholder="e.g., WEHI Milton"
                sx={{ mb: 2 }} value={formData.site} onChange={(e) => setFormData({ ...formData, site: e.target.value })} />
              <TextField fullWidth label="Location" placeholder="e.g., /project/genomics/lung_cancer_2024/"
                sx={{ mb: 2 }} value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Raw Files" placeholder="e.g., *.fastq, *.fasta"
                sx={{ mb: 2 }} value={formData.raw} onChange={(e) => setFormData({ ...formData, raw: e.target.value })} />
              <TextField fullWidth label="Processed Files" placeholder="e.g., *.bam, *.cram"
                sx={{ mb: 2 }} value={formData.processed} onChange={(e) => setFormData({ ...formData, processed: e.target.value })} />
              <TextField fullWidth label="Summary Files" placeholder="e.g., *.vcf, *.maf"
                sx={{ mb: 2 }} value={formData.summary} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} />
              <TextField fullWidth label="README Files" placeholder="e.g., README.md"
                sx={{ mb: 2 }} value={formData.readme} onChange={(e) => setFormData({ ...formData, readme: e.target.value })} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRegister} color="inherit">Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!isFormValid || loading}
            sx={{
              backgroundColor: isFormValid ? '#00274D' : '#ccc',
              '&:hover': { backgroundColor: isFormValid ? '#0056b3' : '#ccc' }
            }}
            onClick={handleRegisterDataset}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={alert.open} autoHideDuration={4000} onClose={handleAlertClose}>
        <Alert severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
