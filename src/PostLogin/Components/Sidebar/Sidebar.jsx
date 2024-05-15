import React, { useEffect, useState } from 'react'
import {getImageUrl} from '../../../utils'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from '@mui/material';

import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
    MedicalInformationOutlined,
    MedicationOutlined
} from "@mui/icons-material";
import FlexBetween from '../FlexBetween';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setIsSidebarOpen} from '../../../redux/reducers/globalReducer'

const navItems = [
    {
        text:"Home",
        icon: <HomeOutlined/>
    },
    {
        text:"Pages",
        icon: null     
    },{
        text:"Pet Records",
        icon: <MedicalInformationOutlined/>
    },{
        text:"Prescriptions",
        icon: <MedicationOutlined/>
    }
]

const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    isNonMobile
}) => {

    const dispatch = useDispatch();
    const  pathName  = useLocation();
    
    const [active,setActive] = useState('')
   
    const navigate = useNavigate();
    const theme = useTheme();
    
    useEffect(() => {
        const splitPath = pathName.pathname.split('/');
        const firstSegment = splitPath[1] || ''; // Get the first segment, or an empty string if it doesn't exist
        setActive(firstSegment);
    }, [pathName.pathname]);

    const setIsSidebarOpen1 = () => {
        dispatch(setIsSidebarOpen())
    }

  return (
    <Box component="nav">
        {isSidebarOpen && (
            <Drawer
                open ={isSidebarOpen}
                onClose={()=>setIsSidebarOpen1(false)}
                variant='persistent'
                anchor='left'
                sx={{
                    width : drawerWidth,
                    "& .MuiDrawer-paper" : {
                        color: theme.palette.secondary[200],
                        background: 'linear-gradient(to bottom, #A745AF, #66316A)',
                        boxSizing : 'border-box',
                        borderWidth: isNonMobile ? 0 : '2px',
                        width: drawerWidth,
                        
                    }
                }}
            >
                <Box width="100%">
                    <Box m="1.5rem 2rem 1rem 1rem">
                        <FlexBetween color={theme.palette.secondary.main}>
                            <Box
                                display='flex' alignItems='start'
                            >
                                <img src={getImageUrl('LOGO/logo1.png')} style={{height:"60px"}} />
                            </Box>
                            {!isNonMobile && (
                                <IconButton onClick={()=> setIsSidebarOpen1()}>
                                    <ChevronLeft sx={{fontSize:"25px"}} />
                                </IconButton>
                            )}
                        </FlexBetween>
                    </Box>
                </Box>
                <List>
                    {navItems.map(({text,icon}) => {
                        if(!icon){
                            return(
                                <Typography key={text} sx={{m: "1rem 0 1rem 2rem", color:'white'}}>
                                    {text}
                                </Typography>
                            )
                        }
                        const lcText= text.split(' ').filter(Boolean).join('').toLowerCase();

                        return(
                            <ListItem key={text} disablePadding>
                                <ListItemButton onClick={()=>{
                                    navigate(`/${lcText}`);
                                    setActive(lcText);
                                    }}
                                    sx={{
                                        borderRadius:'12px',
                                        ml:'10px',
                                        mr: '10px',
                                        backgroundColor: active === lcText ? theme.palette.primary[900] : 'transparent',
                                        color: active === lcText 
                                                ? theme.palette.primary[400]
                                                : theme.palette.primary[900]
                                    }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                ml: '1.2rem',
                                                color: active === lcText 
                                                ? theme.palette.primary[400]
                                                : theme.palette.primary[900]
                                            }}
                                        >
                                            {icon}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                        {active === lcText &&(
                                            <ChevronRightOutlined sx={{ml:'auto'}}/>
                                        )}
                                    </ListItemButton>
                            </ListItem>
                        )
                    })
                }
                
                </List>
            </Drawer>
        )}
    </Box>
  )
}

export default Sidebar