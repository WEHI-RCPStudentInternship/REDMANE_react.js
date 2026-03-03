import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import HomePage from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context'

import AllDatasets from './pages/DatasetPage/AllDatasetsPage'
import AllProjects from './pages/ProjectPage/AllProjectsPage'
import AllPatients from './pages/PatientPage/AllPatientsPage'

import SingleDatasetPage from './pages/DatasetPage/SingleDatasetPage';
import SinglePatientPage from './pages/PatientPage/SinglePatientPage';
import SingleProjectPage from './pages/ProjectPage/SingleProjectPage';

import Visualization from './pages/Visualization'

import ProtectedRoute from './components/ProtectedRoute';
import { UploadPage } from './pages/UploadPage'
import ProjectSummary from './pages/ProjectSumaryPage'
import DatasetDetailsPage from './pages/DatasetPage/DatasetDetailsPage'


function AuthCallback() {
  const auth = useAuth();
  const navigate = useNavigate();
  console.log('Authcallback:', { isLoading: auth.isLoading, isAuthenticated: auth.isAuthenticated });

  useEffect(() => {
    if (!auth.isLoading) {
      if (auth.isAuthenticated) {
        navigate('/projects');
      } else {
        navigate('/login');
      }
    }
  }, [auth.isAuthenticated, auth.isLoading]);

  return <div>Loading...</div>;
}
function App() {

  return (
    <Routes>
      <Route path="/" element={<AuthCallback />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><AllProjects /></ProtectedRoute>} />
      <Route path="/datasets" element={<ProtectedRoute><AllDatasets /></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><AllProjects /></ProtectedRoute>} />
      <Route path="/patients" element={<ProtectedRoute><AllPatients /></ProtectedRoute>} />
      <Route path="/visualizations" element={<ProtectedRoute><Visualization /></ProtectedRoute>} />
      <Route path="/upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
      <Route path="/projectsummary" element={<ProtectedRoute><ProjectSummary /></ProtectedRoute>} />
      <Route path="/dataset/:id" element={<ProtectedRoute><SingleDatasetPage /></ProtectedRoute>} />
      <Route path="/patient/:id" element={<ProtectedRoute><SinglePatientPage /></ProtectedRoute>} />
      <Route path="/project/:projectId" element={<ProtectedRoute><SingleProjectPage /></ProtectedRoute>} />
      <Route path="/dataset/details/:id" element={<ProtectedRoute><DatasetDetailsPage /></ProtectedRoute>} />
    </Routes>
  )
}

export default App