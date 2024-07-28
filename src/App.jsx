import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import { loginSuccess, logout } from './redux/reducers/loginReducer';
import { Dashboard } from './PostLogin/Pages/Dashboard/Dashboard';
import { LoginPage } from './Login/LoginPage';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import { themeSettings } from './theme';  // Adjust the import path as needed
import Layout from './PostLogin/Components/Layout/Layout';
import Home from './PostLogin/Pages/Home/Home';
import { PetRecords } from './PostLogin/Pages/PetRecords/PetRecords';
import { ViewPR } from './PostLogin/Components/ViewPetRecord/ViewPR';
import { Prescriptions } from './PostLogin/Pages/Prescriptions/Prescriptions';
import { AddVaccination } from './PostLogin/Pages/AddVaccination/AddVaccination';
import { AddDeworming } from './PostLogin/Pages/AddDeworming/AddDeworming';
import { Whatsapp } from './PostLogin/Pages/Whatsapp/Whatsapp';
import {ReactTestCode} from "./ReactTestCode.jsx"

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const mode = useSelector(state => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);


  const PdfViewerWrapper = () => {
    const { fileName } = useParams();
    return <PdfViewer fileName={fileName} />;
  };


  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:3000/verifyToken', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data.valid) {
            dispatch(loginSuccess(response.data.user));
          } else {
            dispatch(logout());
            localStorage.removeItem('token');
          }
        } catch (error) {
          dispatch(logout());
          localStorage.removeItem('token');
        }
      } else {
        dispatch(logout());
      }
    };

    checkAuth();
  }, [dispatch]);


  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace/> : <LoginPage />} />
          <Route path="/" element={isLoggedIn ? <Layout/> : <Navigate to="/login"/>} >
          <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/petrecords" element={<PetRecords />} />
              <Route path="/petrecords/:id" element={<ViewPR />} />
              <Route path="/createprescriptions" element={<Prescriptions />} />
              <Route path="/petrecords/:id/reports/:fileName" element={<PdfViewerWrapper />} />
              <Route path="/petrecords/:id/prescriptions" element={<ViewPR />} />
              <Route path="/petrecords/:id/reports" element={<ViewPR />} />
              <Route path="/petrecords/:id/vaccinations" element={<ViewPR />} />
              <Route path="/petrecords/:id/deworming" element={<ViewPR />} />
              <Route path="/addvaccination" element={<AddVaccination />} />
              <Route path="/adddeworming" element={<AddDeworming />} />
              <Route path="/whatsapp" element={<Whatsapp />} />
              <Route path="/whatsapp/:userName" element={<Whatsapp />} />
            </Route>
            {/* <Route element = {<Whatsapp/>}/>
              {/* <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/petrecords" element={<PetRecords />} />
              <Route path="/petrecords/:id" element={<ViewPR />} />
              <Route path="/createprescriptions" element={<Prescriptions />} />
              <Route path="/petrecords/:id/reports/:fileName" element={<PdfViewerWrapper />} />
              <Route path="/petrecords/:id/prescriptions" element={<ViewPR />} />
              <Route path="/petrecords/:id/reports" element={<ViewPR />} />
              <Route path="/petrecords/:id/vaccinations" element={<ViewPR />} />
              <Route path="/petrecords/:id/deworming" element={<ViewPR />} />
              <Route path="/addvaccination" element={<AddVaccination />} />
              <Route path="/adddeworming" element={<AddDeworming />} />
              <Route path="/whatsapp" element={<Whatsapp />} />
              <Route path="/whatsapp/:userName" element={<Whatsapp />} /> */} 
            
       

        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
