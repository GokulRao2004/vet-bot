import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from "./ViewPR.module.css";
import { ChevronLeft } from '@mui/icons-material';
import { getImageUrl } from '../../../utils';
import { useMediaQuery } from '@mui/material';
import { VerticalLine } from '../VerticalLine';
import { HorizontalLine } from '../HorizontalLine';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ViewPrescription } from '../ViewPrescription/ViewPrescription';
import { ViewVaccinations } from '../ViewVaccinations/ViewVaccinations';
import { ViewDeworming } from '../ViewDeworming/ViewDeworming';
import { ViewReports } from '../ViewReports/ViewReports';

export const ViewPR = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const pet = useSelector(state => state.petRecords.pets.find(pet => pet.id === parseInt(id)));
    const isNonMobile = useMediaQuery("(min-width: 600px)");

    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        switch (location.pathname.split('/').pop()) {
            case 'prescriptions':
                setActiveTab(0);
                break;
            case 'reports':
                setActiveTab(1);
                break;
            case 'vaccinations':
                setActiveTab(2);
                break;
            case 'deworming':
                setActiveTab(3);
                break;
            default:
                setActiveTab(0);
        }
    }, [location.pathname]);

    const handleTabSelect = (index) => {
        setActiveTab(index);
        switch (index) {
            case 0:
                navigate(`/petrecords/${id}/prescriptions`);
                break;
            case 1:
                navigate(`/petrecords/${id}/reports`);
                break;
            case 2:
                navigate(`/petrecords/${id}/vaccinations`);
                break;
            case 3:
                navigate(`/petrecords/${id}/deworming`);
                break;
            default:
                navigate(`/petrecords/${id}/prescriptions`);
        }
    };

    const handleBack = () => {
        navigate("/petrecords");
    };

    if (!pet) {
        return (
            <>
                <button className={styles.backBtn} onClick={handleBack}>Back</button>
                <h1 className={styles.notFound}>OOPS Pet Not Found!!!!</h1>
            </>
        );
    }

    return (
        <div>
            <button onClick={handleBack} className={styles.backBtn}>
                <ChevronLeft sx={{ fontSize: '25px' }} />
                Back
            </button>
            <div className={styles.container}>
                <div className={styles.subContainer}>
                    <div className={styles.petInfoFull}>
                        <div className={styles.petImgContainer}>
                            <img src={getImageUrl('Dashboard/Pets/pet.jpeg')} alt="DOG" className={styles.petImg} />
                        </div>
                        <div className={styles.petAndParentInfo}>
                            <div>
                                <ul>
                                    <li>ID : {pet.id}</li>
                                    <li>Name : {pet.name}</li>
                                    <li>Type : {pet.type} </li>
                                    <li>Breed : {pet.breed}</li>
                                    <li>DOB : {pet.dateOfBirth}</li>
                                    <li>Sex : {pet.sex}</li>
                                </ul>
                            </div>
                            <div className={styles.parentInfo}>
                                {isNonMobile && <VerticalLine width="2px" height='160px' color="darkgray" />}
                                <ul>
                                    <li>Parent Name: {pet.ownerFirstName} {pet.ownerLastName}</li>
                                    <li>Phone: {pet.contact}</li>
                                    <li>Email : {pet.email}</li>
                                    <li>Address : {pet.address}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={styles.lastVisited}>Last Visited : {pet.lastVisited}</div>
                    <HorizontalLine width='100%' color="darkgray" />
                    <Tabs className={styles.tabs} selectedIndex={activeTab} onSelect={handleTabSelect}> 
                        <TabList className={styles.tablist}>
                            <Tab className={styles.tab}>Prescriptions</Tab>
                            <Tab className={styles.tab}>Reports</Tab>
                            <Tab className={styles.tab}>Vaccinations</Tab>
                            <Tab className={styles.tab}>Deworming</Tab>
                        </TabList>
                        <TabPanel><ViewPrescription /></TabPanel>
                        <TabPanel><ViewReports/></TabPanel>
                        <TabPanel><ViewVaccinations/></TabPanel>
                        <TabPanel><ViewDeworming/></TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}