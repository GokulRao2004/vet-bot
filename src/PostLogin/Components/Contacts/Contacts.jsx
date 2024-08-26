import React, { useEffect, useState } from 'react'
import data from "../../../mockData/contacts.json"
import { getImageUrl } from '../../../utils';
import styles from './Contacts.module.css'

import { Done, DoneAll, Search, SettingsOutlined, SmsFailedOutlined } from '@mui/icons-material';

export const Contacts = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        setContacts(data);
    }, []);


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

                    {/* <SettingsOutlined sx={{ color: "#555", fontSize: "28px" }} /> */}

                </div>
                {/* <div className={styles.searchBar}>
                    <input type="text" className={styles.searchInput} placeholder="Search...." />
                    <Search className={styles.searchIcon}/>
                </div> */}
            </div>
            <div className={styles.contactList}>
                {contacts.map((contact, index) => (
                    <a  key={index} href={`./whatsapp/${contact.Name}`}>
                    <div key={index} className={styles.contact}>
                        <div className={styles.profilePic}>
                            <img src={getImageUrl(`img.jpeg`)} alt={contact.Name} />
                        </div>
                        <div className={styles.msgBody}>
                            <div className={styles.nameMsg}>
                                <h3>{contact.Name}</h3>
                                <div className={styles.msg}>
                                    {contact.MsgType == "Sent" &&  (
                                        (contact.MsgStatus == "NotSent" && <SmsFailedOutlined sx={{color : "red" , fontSize: "20px"}}/>) ||
                                        (contact.MsgStatus == "Opened" && <DoneAll sx={{color : "blue" , fontSize: "20px"}}/>) || 
                                        (contact.MsgStatus == "Unopened" && <DoneAll sx={{color : "#555" , fontSize: "20px"}}/>) ||
                                        (contact.MsgStatus == "NotReached" && <Done sx={{color : "#555" , fontSize: "20px"}}/>)
                                        
                                        )}
                                    <p>{contact.Message}</p>
                                </div>

                            </div>
                            <div className={styles.timeAndUnread}>
                                <p className={contact.MsgStatus == "Unread" ? styles.unread : styles.read}>{contact.Time}</p>
                                {contact.MsgStatus === 'Unread' && <div className={styles.unreadIndicator}></div>}
                            </div>
                        </div>
                    </div>
                </a>))}
            </div></div>
    )
}
