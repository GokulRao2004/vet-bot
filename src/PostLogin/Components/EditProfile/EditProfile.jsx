import { ArrowBackRounded } from '@mui/icons-material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./EditProfile.module.css";
import { useSelector } from 'react-redux';
import axios from 'axios';
import endpoints from '../../../APIendpoints';


export const EditProfile = () => {
    const navigate = useNavigate();
    const displayName = useSelector((state) => state.login.username);
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [category, setCategory] = useState(''); // New state for category
    const maxChars = 512;


    const goBack = () => {
        navigate('../whatsapp');
    };

    const handleChange = (event) => {
        setDescription(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleWebsiteChange = (event) => {
        setWebsite(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value); // Update category state
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const profileData = {
            displayName,
            description,
            address,
            email,
            website,
            category, // Include selected category
        };

        try {
            const response = await axios.post(endpoints.editProfile, profileData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Success:', response.data);
            // Optionally reset form fields or navigate elsewhere
            setDescription("");
            setAddress("");
            setEmail("");
            setWebsite("");
            setCategory(""); // Reset category
        } catch (error) {
            console.error('Error during API call:', error);
            // Handle error (e.g., show a notification)
        }
    };

    return (
        <div>
            <div className={styles.navbar}>
                <div className={styles.navbarLeft}>
                    <a onClick={goBack} style={{ cursor: 'pointer' }}>
                        <ArrowBackRounded sx={{ margin: 0, padding: 0, marginTop: "8px" }} />
                    </a>
                </div>
                <div>Edit Business Profile</div>
            </div>
            <div className={styles.body}>
                <div className={styles.displayName}>
                    <h2>Display Name</h2>
                    <div>{displayName}</div>
                </div>
                <div className={styles.category}>
                    <h2>Category</h2>
                    <select id="businessCategories" value={category} onChange={handleCategoryChange}>
                        <option value="">Select a category</option>
                        <option value="automotive">Automotive</option>
                        <option value="beauty_spa_salon">Beauty, Spa and Salon</option>
                        <option value="clothing_apparel">Clothing and Apparel</option>
                        <option value="education">Education</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="online_gambling_gaming">Online Gambling & Gaming</option>
                        <option value="non_online_gambling_gaming">Non-Online Gambling & Gaming (E.g. Brick and Mortar)</option>
                        <option value="event_planning">Event Planning and Service</option>
                        <option value="food_grocery">Food and Grocery</option>
                        <option value="alcoholic_beverages">Alcoholic Beverages</option>
                        <option value="public_service">Public Service</option>
                        <option value="hotel_lodging">Hotel and Lodging</option>
                        <option value="medical_health">Medical and Health</option>
                        <option value="over_the_counter_drugs">Over-the-Counter Drugs</option>
                        <option value="non_profit">Non-profit</option>
                        <option value="professional_services">Professional Services</option>
                        <option value="shopping_retail">Shopping and Retail</option>
                        <option value="travel_transportation">Travel and Transportation</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className={styles.description}>
                    <h2>Description</h2>
                    <label htmlFor="descriptionTextarea" className={styles.textboxLabel}>Tell your customers about your company</label>
                    <div className={styles.charIndicator}>
                        {description.length}/{maxChars}
                    </div>
                    <textarea
                        id="descriptionTextarea"
                        value={description}
                        onChange={handleChange}
                        maxLength={maxChars}
                        placeholder="Type here..."
                        style={{ width: '500px', height: '150px', resize: 'none', paddingRight: "58px" }}
                    />
                </div>
                <div className={styles.contactInfo}>
                    <h2>Contact Information</h2>
                    <p>Add some contact details for your Business</p>
                    <label htmlFor="addressTextbox" className={styles.textboxLabel}>Address:</label>
                    <div className={styles.textBoxContainer}>
                        <input
                            className={styles.textBox}
                            type="text"
                            id="addressTextbox"
                            value={address}
                            onChange={handleAddressChange}
                            maxLength={256}
                            placeholder="Enter your address..."
                        />
                        <div className={styles.charCounter}>{address.length}/256</div>
                    </div>
                    <label htmlFor="emailTextbox" className={styles.textboxLabel}>Email:</label>
                    <div className={styles.textBoxContainer}>
                        <input
                            className={styles.textBox}
                            type="text"
                            id="emailTextbox"
                            value={email}
                            onChange={handleEmailChange}
                            maxLength={128}
                            placeholder="Enter your email..."
                        />
                        <div className={styles.charCounter}>{email.length}/128</div>
                    </div>
                    <label htmlFor="websiteTextbox" className={styles.textboxLabel}>Website:</label>
                    <div className={styles.textBoxContainer}>
                        <input
                            className={styles.textBox}
                            type="text"
                            id="websiteTextbox"
                            value={website}
                            onChange={handleWebsiteChange}
                            maxLength={256}
                            placeholder="Enter your website..."
                        />
                        <div className={styles.charCounter}>{website.length}/256</div>
                    </div>
                </div>
                <div className={styles.submit}>
                    <button className={styles.submitBtn} onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};
