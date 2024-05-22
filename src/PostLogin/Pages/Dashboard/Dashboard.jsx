import React, { useMemo } from 'react'
import { CssBaseline,ThemeProvider } from '@mui/material'
import {createTheme} from '@mui/material'
import { useSelector } from 'react-redux'
import {themeSettings} from "../../../theme"
import { BrowserRouter , Navigate , Route , Routes, useParams } from "react-router-dom"
import Layout from '../../Components/Layout/Layout'
import Home from '../Home/Home'
import { PetRecords } from '../PetRecords/PetRecords'
import { Prescriptions } from '../Prescriptions/Prescriptions'
import { ViewPR } from '../../Components/ViewPetRecord/ViewPR'
import PdfViewer from '../../Components/PdfViewer/PdfViewer'


export const Dashboard = () => {
    const mode = useSelector(state => state.global.mode);
    const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode])
    const PdfViewerWrapper = () => {
        const { fileName } = useParams();
        return <PdfViewer fileName={fileName} />;
    };


  return (
    <div>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Routes>
                    <Route element={<Layout/>}>
                        <Route path='/' element={<Navigate to='/home' replace/>} />
                        <Route path='/home' element={<Home/>} />
                        <Route path='/petrecords' element={<PetRecords/>} />
                        <Route path="/petrecords/:id" element={<ViewPR />} />
                        <Route path='/createprescriptions' element={<Prescriptions/>} />
                        <Route path="/petrecords/:id/reports/:fileName" element={<PdfViewerWrapper />} />
                        <Route path="/petrecords/:id/prescriptions" element={<ViewPR/>} />
                        <Route path="/petrecords/:id/reports" element={<ViewPR/>} />
                        <Route path="/petrecords/:id/vaccinations" element={<ViewPR/>} />
                        <Route path="/petrecords/:id/deworming" element={<ViewPR/>} />
                    </Route>
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    </div>
  )
}
