import React from 'react'
import styles from './PRTableNav.module.css'
import { IconButton } from '@mui/material'
import { Add, SearchOutlined } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { setModalStatus } from '../../../redux/reducers/addPetRecordReducer'

export const PRTableNav = ({filter,setFilter}) => {
  const dispatch = useDispatch();
  return (
    <span>
        <div className={styles.wrapper}>
          <div className={styles.searchBar}>
          <input className={styles.Search} placeholder='Search...' value={filter || ''} onChange={(e)=>{setFilter(e.target.value)}}/>
          <IconButton className={styles.searchIcon}>
            <SearchOutlined/>
          </IconButton>
          
          </div>
          
          <div className={styles.add}>
            <IconButton onClick={()=>dispatch(setModalStatus())}>
              <Add sx={{fontSize: '30px'}} />
            </IconButton>
          </div>
          </div>
        
    </span>
  )
}
