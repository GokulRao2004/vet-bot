import React, { useMemo } from 'react'
import { CssBaseline,ThemeProvider } from '@mui/material'
import {createTheme} from '@mui/material'
import { useSelector } from 'react-redux'
import {themeSettings} from "../../../theme"
import { BrowserRouter , Navigate , Route , Routes } from "react-router-dom"
import Layout from '../../Components/Layout/Layout'
import Home from '../Home/Home'
import { PetRecords } from '../PetRecords/PetRecords'
import { Prescriptions } from '../Prescriptions/Prescriptions'
import { ViewPR } from '../../Components/ViewPetRecord/ViewPR'


export const Dashboard = () => {
    const mode = useSelector(state => state.global.mode);
    const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode])


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
                    </Route>
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    </div>
  )
}
