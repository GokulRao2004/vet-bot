import React, { useEffect, useState } from 'react';
import styles from "./CreateTemplate.module.css";
import { useNavigate } from 'react-router-dom';
import { ArrowBackRounded } from '@mui/icons-material';
import axios from 'axios';
import endpoints from '../../../APIendpoints'; // Adjust the path as necessary

export const CreateTemplate = ({ id }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [templateDetails, setTemplateDetails] = useState({
        templateName: '',
        language: '',
        header: '',
        body: '',
        footer: '',
        category: ''
    });
    const isEditable = !id;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState('');


    const goBack = () => {
        navigate('../template');
    };

    useEffect(() => {
        const fetchTemplateDetails = async () => {
            try {
                const response = await axios.get(`${endpoints.template}/${id}`,{
                    
                        headers: {
                            'Authorization': `Bearer ${token}`, 
                            
                        }
                });
                console.log('response.data.name: ', response.data.data.category);
                setTemplateDetails({
                    templateName: response.data.data.name || '',
                    language: response.data.data.language || '',
                    category: response.data.data.category || '',
                    header: response.data.data.components[0]?.text || '',
                    body: response.data.data.components[1]?.text || '',
                    footer: response.data.data.components[2]?.text || ''
                });
            } catch (err) {
                setError('Failed to fetch template details');
            } finally {
                setLoading(false);
            }

        };

        if (id) {
            fetchTemplateDetails();

        } else {
            setLoading(false);
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTemplateDetails({
            ...templateDetails,
            [name]: value
        });
        setFormError('');
    };

    const handleSubmit = async() => {

        const { templateName, language, category, body, header, footer } = templateDetails;
        if (!templateName || !language || !category || !body) {
            setFormError('Please fill in all required fields: Name, Language, Category, and Body.');
            return;
        }

        const components = [];
        if (header) {
            components.push({
                type: "HEADER",
                format: "TEXT",
                text: header,
            });
        }

        components.push({
            type: "BODY",
            text: body,
        });

        if (footer) {
            components.push({
                type: "HEADER",
                text: footer,
            });
        }

        const formattedData = {
            name: templateDetails.templateName,
            language: templateDetails.language,
            category: templateDetails.category,
            components: components
        };

        try {
    
            const url = id ? `${endpoints.template}/${id}` : endpoints.template;

            const response = await axios({
                method: "POST",
                url: url,
                data: formattedData,
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            });
            console.log("Response from server:", response.data);
            navigate('../template'); 
        } catch (error) {
            setError('Failed to submit the template. Please try again.');
            console.error("Error submitting template:", error);
        }


        // Here you can send the formattedData to the server or handle it as needed
    };
    if (loading) {
        return <div>Loading...</div>;
    }

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
                <div>{id ? "Edit Template" : "Create Template"}</div>
            </div>
            <div className={styles.outerContainer}>
                <div className={styles.container}>
                    <h2>Template name and language</h2>
                    <div className={styles.tempName}>
                        <div style={{ display: "flex", flexDirection: "column", width: "72%" }}>
                            <label htmlFor='templateName'>Name your template</label>
                            <input
                                type="text"
                                id="templateName"
                                name="templateName"
                                placeholder="Enter template name"
                                value={templateDetails.templateName}
                                onChange={handleInputChange}
                                disabled={!isEditable}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", width: "25%" }}>
                            <label htmlFor='language'>Select language</label>
                            <select
                                id="language"
                                name="language"
                                value={templateDetails.language}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Language</option>
                                <option value="en">English</option>
                                <option value="en_US">English (US)</option>
                                <option value="en_UK">English (UK)</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div className={styles.container}>
                    <h2>Category</h2>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor='category'>Enter the category for this template</label>
                        <select
                            id="category"
                            name="category"
                            value={templateDetails.category}
                            onChange={handleInputChange}
                            style={{ width: "50%" }}
                        >
                            <option value="">Select Category</option>
                            <option value="UTILITY">Utility</option>
                            <option value="MARKETING">Marketing</option>
                            <option value="AUTHENTICATION">Authentication</option>
                        </select>
                    </div>


                </div>
                <div className={styles.container}>
                    <h2>Content</h2>
                    <p>Fill in the header, body and footer sections of your template.</p>
                    <div style={{ display: "flex", flexDirection: "column", width: "72%" }}>
                        <label htmlFor='templateHeader' className={styles.label}><h3>Header</h3><p className={styles.optional}>(optional)</p></label>
                        <input
                            type="text"
                            id="templateHeader"
                            name="header"
                            placeholder="Enter template header"
                            value={templateDetails.header}
                            onChange={handleInputChange}
                            maxLength={60}
                        />
                        <div className={styles.spacer}></div>
                        <label htmlFor='templateBody' className={styles.label}><h3>Body</h3></label>
                        <textarea
                            id="templateBody"
                            name="body"
                            placeholder="Enter template body"
                            value={templateDetails.body}
                            onChange={handleInputChange}
                            maxLength={1024}
                            className={styles.textArea}
                            required={true}
                        />
                        <div className={styles.spacer}></div>

                        <label htmlFor='templateFooter' className={styles.label}><h3>Footer</h3><p className={styles.optional}>(optional)</p></label>
                        <input
                            type="text"
                            id="templateFooter"
                            name="footer"
                            placeholder="Enter template footer"
                            value={templateDetails.footer}
                            onChange={handleInputChange}
                            maxLength={60}
                        />
                    </div>
                </div>
                {formError && <div className={styles.error}>{formError}</div>}
                <div className={styles.btnContainer}>
                    <button className={styles.btn} onClick={goBack}>Discard</button>
                    <button className={styles.btn} onClick={handleSubmit}>Submit for review</button>
                </div>
            </div>
        </div>
    );
};
