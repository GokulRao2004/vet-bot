import React, { useEffect, useState } from 'react';
import data from "../../../mockData/contacts.json";
import { getImageUrl } from '../../../utils';
import styles from './Contacts.module.css';
import { Done, DoneAll, Search, SettingsOutlined, SmsFailedOutlined, Add } from '@mui/icons-material';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import axios from "axios";
import endpoints from "../../../APIendpoints.jsx"

export const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newContact, setNewContact] = useState({ Name: '', Phone: '' });
    const isSidebarOpen = useSelector((state) => state.global.isSidebarOpen);
    const user_id = useSelector((state) => state.login.user)

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
        const { name, value } = e.target;
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
       
        try {
            // Make the POST request
            const response = await axios.post(endpoints.addContact, newContact);
    
            // Check if the response is successful (status code 200-299)
            if (response.status >= 200 && response.status < 300) {
                // Update the contacts state
                setContacts([...contacts, { ...newContact, Time: 'Now' }]);
    
                // Reset the form and close the modal
                setNewContact({ Name: '', Message: '' });
                closeModal();
            } else {
                console.error('Failed to add contact. Status:', response.status);
            }
        } catch (error) {
            console.error('An error occurred while adding the contact:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.topBar}>
                <div className={styles.userInfo}>
                    <div className={styles.info}>
                        <div className={styles.profilePic}>
                            <img src={getImageUrl("img.jpeg")} alt="profile" />
                        </div>
                        <div>User Name</div>
                    </div>
                </div>
            </div>
            <div className={styles.contactList}>
                {contacts.map((contact, index) => (
                    <a key={index} href={`./whatsapp/${contact.Name}/${contact.Phone}`}>
                        <div className={styles.contact}>
                            <div className={styles.profilePic}>
                                <img src={getImageUrl(`img.jpeg`)} alt={contact.Name} />
                            </div>
                            <div className={styles.msgBody}>
                                <div className={styles.nameMsg}>
                                    <h3>{contact.Name}</h3>
                                    <div className={styles.msg}>
                                        {contact.MsgType === "Sent" && (
                                            (contact.MsgStatus === "NotSent" && <SmsFailedOutlined sx={{ color: "red", fontSize: "20px" }} />) ||
                                            (contact.MsgStatus === "Opened" && <DoneAll sx={{ color: "blue", fontSize: "20px" }} />) ||
                                            (contact.MsgStatus === "Unopened" && <DoneAll sx={{ color: "#555", fontSize: "20px" }} />) ||
                                            (contact.MsgStatus === "NotReached" && <Done sx={{ color: "#555", fontSize: "20px" }} />)
                                        )}
                                        <p>{contact.Message}</p>
                                    </div>
                                </div>
                                <div className={styles.timeAndUnread}>
                                    <p className={contact.MsgStatus === "Unread" ? styles.unread : styles.read}>{contact.Time}</p>
                                    {contact.MsgStatus === 'Unread' && <div className={styles.unreadIndicator}></div>}
                                </div>
                            </div>
                        </div>
                    </a>
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
                                name="Name"
                                value={newContact.Name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="message">Phone Number:</label>
                            <input
                                type="text"
                                pattern="\d*"
                                inputmode="numeric"
                                id="phone"
                                name="Phone"
                                value={newContact.Phone}
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
