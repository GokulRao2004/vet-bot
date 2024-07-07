import React from 'react'
import styles from './Chats.module.css'
import { ArrowBackRounded } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { getImageUrl } from '../../../utils'

export const Chats = ({ name }) => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate("../whatsapp")
    };


    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <a onClick={goBack} style={{ cursor: 'pointer' }}>
                    <ArrowBackRounded sx={{margin: 0, padding:0}}/>
                </a>
                <div className={styles.profilePic}>
                    <img src={getImageUrl("img.jpeg")} alt="profile" />
                </div>
                <div>{name}</div>
            </div>
            <div className={styles.messages}>
                
            </div>
            <div className={styles.chat}>
                
            </div>
        </div>
    )
}
