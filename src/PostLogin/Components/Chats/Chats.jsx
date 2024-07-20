import React, { useState } from 'react'
import styles from './Chats.module.css'
import { ArrowBackRounded, AttachFile, Attachment, Send } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { getImageUrl } from '../../../utils'
import { useSelector } from 'react-redux'

export const Chats = ({ name }) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const isSidebarOpen = useSelector(state => state.global.isSidebarOpen);

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            
            setMessage('');
        }
    };


    const goBack = () => {
        navigate("../whatsapp")
    };

    const handleFileAttach = (e) => {
        const file = e.target.files[0];
        if (file) {
          console.log('File attached:', file);
          // Handle the file attachment logic here
        }
      };


    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <a onClick={goBack} style={{ cursor: 'pointer' }}>
                    <ArrowBackRounded sx={{ margin: 0, padding: 0 }} />
                </a>
                <div className={styles.profilePic}>
                    <img src={getImageUrl("img.jpeg")} alt="profile" />
                </div>
                <div>{name}</div>
            </div>
            <div className={styles.messages}>

            </div>
            <div className={isSidebarOpen ? styles.chatBarOpen : styles.chatBarClose}>
                <label htmlFor="file-input" className={styles.fileAttachLabel} style={{margin:0, padding:0}}>
                    <AttachFile/>
                </label>
                <input
                    type="file"
                    id="file-input"
                    className={styles.fileInput}
                    onChange={handleFileAttach}
                />
                <input
                    type="text"
                    className={styles.chatInput}
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                
                    <button className={styles.sendBtn} onClick={handleSendMessage}>
                        <Send />
                    </button>
                
            </div>
        </div>
    )
}
