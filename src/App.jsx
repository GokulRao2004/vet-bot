import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { loginSuccess, logout } from './redux/reducers/loginReducer';
import { CssBaseline, ThemeProvider, CircularProgress, Box } from '@mui/material';
import { createTheme } from '@mui/material';
import { themeSettings } from './theme';
import Layout from './PostLogin/Components/Layout/Layout';
import Home from './PostLogin/Pages/Home/Home';
import { PetRecords } from './PostLogin/Pages/PetRecords/PetRecords';
import { ViewPR } from './PostLogin/Components/ViewPetRecord/ViewPR';
import { Prescriptions } from './PostLogin/Pages/Prescriptions/Prescriptions';
import { AddVaccination } from './PostLogin/Pages/AddVaccination/AddVaccination';
import { AddDeworming } from './PostLogin/Pages/AddDeworming/AddDeworming';
import { Whatsapp } from './PostLogin/Pages/Whatsapp/Whatsapp';
import { LoginPage } from "./Login/LoginPage.jsx"
import endpoints from './APIendpoints.jsx';
import crypto from 'crypto'

const PdfViewerWrapper = () => {
  const { fileName } = useParams();
  return <PdfViewer fileName={fileName} />;
};

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const mode = useSelector(state => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const [checkingAuth, setCheckingAuth] = useState(true);


  const generateSignature = (data) => {
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(data);
    return hmac.digest('hex');
  };




  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(endpoints.verifyToken, {
            headers: {
              Authorization: `Bearer ${token}`,
              Signature: generateSignature(token)
            }
          });
          if (response.data.valid) {
            dispatch(loginSuccess(response.data.user));
          } else {
            dispatch(logout());
          }
        } catch (error) {
          dispatch(logout());

        }
      } else {
        dispatch(logout());
      }
      setCheckingAuth(false);
    };

    checkAuth();
  }, [dispatch]);

  if (checkingAuth) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />} />
          <Route path="/" element={isLoggedIn ? <Layout /> : <Navigate to="/login" replace />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="petrecords" element={<PetRecords />} />
            <Route path="petrecords/:id" element={<ViewPR />} />
            <Route path="createprescriptions" element={<Prescriptions />} />
            <Route path="petrecords/:id/reports/:fileName" element={<PdfViewerWrapper />} />
            <Route path="petrecords/:id/prescriptions" element={<ViewPR />} />
            <Route path="petrecords/:id/reports" element={<ViewPR />} />
            <Route path="petrecords/:id/vaccinations" element={<ViewPR />} />
            <Route path="petrecords/:id/deworming" element={<ViewPR />} />
            <Route path="addvaccination" element={<AddVaccination />} />
            <Route path="adddeworming" element={<AddDeworming />} />
            <Route path="whatsapp" element={<Whatsapp />} />
            <Route path="whatsapp/:userName" element={<Whatsapp />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
