import React, { useEffect, useState } from 'react';
import styles from "./CreateTemplate.module.css";
import { useNavigate } from 'react-router-dom';
import { ArrowBackRounded } from '@mui/icons-material';
import axios from 'axios';
import endpoints from '../../../APIendpoints'; // Adjust the path as necessary

export const CreateTemplate = ({ id }) => {
    const navigate = useNavigate();
    const [templateDetails, setTemplateDetails] = useState(null);
    console.log('templateDetails: ', templateDetails);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const goBack = () => {
        navigate('../template');
    };

    useEffect(() => {
        const fetchTemplateDetails = async () => {
            try {
                const response = await axios.get(`${endpoints.template}/${id}`); // Adjust the endpoint as necessary
                setTemplateDetails(response.data);
            } catch (err) {
                setError('Failed to fetch template details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchTemplateDetails();
        } else {
        }
    }, [id]);


    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div className={styles.navbar}>
                <div className={styles.navbarLeft}>
                    <a onClick={goBack} style={{ cursor: 'pointer' }}>
                        <ArrowBackRounded sx={{ margin: 0, padding: 0, marginTop: "8px" }} />
                    </a>
                </div>
                <div>{id ? ("Edit Template"):("Create Template")}</div>
            </div>
            {templateDetails && (
                <div>
                    <h2>Template Details</h2>
                    <p>Name: {templateDetails.data.name}</p>
                    <p>Category: {templateDetails.data.category}</p>
                    <p>Status: {templateDetails.data.status}</p>
                </div>
            )}
        </div>
    );
};
