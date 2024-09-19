import React, { useEffect, useState } from 'react';
import data from "../../../mockData/contacts.json";
import { getImageUrl } from '../../../utils';
import styles from './Contacts.module.css';
import { Done, DoneAll, Search, SettingsOutlined, SmsFailedOutlined, Add } from '@mui/icons-material';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import axios from "axios";
import endpoints from "../../../APIendpoints.jsx"
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

export const Contacts = ( ) => {
    const [contacts, setContacts] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const user_id = useSelector((state) => state.login.user)
    const [newContact, setNewContact] = useState({ name: '', phone: '', user_id: user_id });
    const isSidebarOpen = useSelector((state) => state.global.isSidebarOpen);

    const fetchContacts = async () => {
        try {
            const response = await axios.get(endpoints.contacts, { params: { user_id: 1234 } });
            setContacts(response.data); // Update state with the fetched data
            console.log('response.data: ', response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleInputChange = (e) => {
        var { name, value } = e.target;
        if (name == "phone") {
            value = e.target.value.replace(/[^0-9]/g, '');
        }
        setNewContact(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(newContact)
        try {
            // Make the POST request
            const response = await axios.post(endpoints.addContact, newContact);

            // Check if the response is successful (status code 200-299)
            if (response.status >= 200 && response.status < 300) {
                // Update the contacts state
                fetchContacts();

                // Reset the form and close the modal
                setNewContact({ name: '', phone: '', user_id: user_id });
                closeModal();
            } else {
                console.error('Failed to add contact. Status:', response.status);
            }
        } catch (error) {
            console.error('An error occurred while adding the contact:', error);
        }
    };

    const handleRefreshContacts = () => {
        fetchContacts();
    }



    return (
        <div className={styles.container}>
            <div className={styles.topBar}>
                <div className={styles.userInfo}>
                    <div className={styles.info}>
                        <div className={styles.profilePic}>
                            <img src={getImageUrl("img.jpeg")} alt="profile" />
                        </div>
                        <div>{user_id}</div>
                    </div>
                    <Tooltip title="Click to get the updated contacts" componentsProps={{
                        tooltip: {
                            sx: {
                                fontSize: "16px"
                            },
                        },
                    }}>
                        <IconButton className={styles.refreshIcon} onClick={handleRefreshContacts}><RefreshIcon sx={{ color: "#3d3d3d", fontSize: "36px" }} /></IconButton>
                    </Tooltip>
                </div>
            </div>
            <div className={styles.contactList}>
                {contacts.map((contact, index) => (
                    <Link
                        key={index} 
                        to={`./${contact.name}/${contact.id}/${contact.phone}`}
                        >
                        <div className={styles.contact}>
                            <div className={styles.profilePic}>
                                <img src={getImageUrl(`img.jpeg`)} alt={contact.name} />
                            </div>
                            <div className={styles.msgBody}>
                                <div className={styles.nameMsg}>
                                    <h3>{contact.name}</h3>
                                    <div className={styles.msg}>
                                        {contact.MsgType === "Sent" && (
                                            (contact.msgStatus === "NotSent" && <SmsFailedOutlined sx={{ color: "red", fontSize: "20px" }} />) ||
                                            (contact.msgStatus === "Opened" && <DoneAll sx={{ color: "blue", fontSize: "20px" }} />) ||
                                            (contact.msgStatus === "Unopened" && <DoneAll sx={{ color: "#555", fontSize: "20px" }} />) ||
                                            (contact.msgStatus === "NotReached" && <Done sx={{ color: "#555", fontSize: "20px" }} />)
                                        )}
                                        <p>{contact.message}</p>
                                    </div>
                                </div>
                                <div className={styles.timeAndUnread}>
                                    <p className={contact.msgStatus === "Unread" ? styles.unread : styles.read}>{contact.time}</p>
                                    {contact.msgStatus === 'Unread' && <div className={styles.unreadIndicator}></div>}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Add Contact Button */}
            <button className={styles.addButton} onClick={openModal}>
                <Add sx={{ color: "#fff", fontSize: "28px" }} />
            </button>

            {/* Modal for adding new contact */}
            <div className={styles.modalContainer}>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Add Contact Modal"
                    className={isSidebarOpen ? styles.modalSideBarOpen : styles.modalSideBarClose}
                    overlayClassName={styles.overlay}
                >
                    <h2 className={styles.heading}>Add New Contact</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={newContact.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="message">Phone Number:</label>
                            <input
                                type="text"
                                pattern="\d*"
                                inputMode="numeric"
                                id="phone"
                                name="phone"
                                value={newContact.phone}
                                onChange={handleInputChange}
                                maxLength={10}
                                minLength={10}
                                required
                            />
                        </div>
                        <div className={styles.formActions}>
                            <button className={styles.delButton} type="button" onClick={closeModal}>Cancel</button>
                            <button className={styles.adButton}>Add Contact</button>
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    );
};
