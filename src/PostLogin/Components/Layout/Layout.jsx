import React,{useState} from 'react'
import {Box,useMediaQuery} from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from "../../Components/Navbar/Navbar"
import Sidebar from '../../Components/Sidebar/Sidebar'

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const isSidebarOpen = useSelector(state=>state.global.isSidebarOpen)

  return (
    <Box width="100%" height='100%' display={isNonMobile ? 'flex' : 'block'}>
      <Sidebar
        isNonMobile = {isNonMobile}
        drawerWidth = "250px"
        isSidebarOpen= {isSidebarOpen}
        />
      <Box flexGrow={1}>
        <Navbar
        />
        <Outlet/>
      </Box>
    </Box>
  )
}

export default Layout