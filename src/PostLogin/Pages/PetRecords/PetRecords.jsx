import React, { useMemo } from 'react'
import Header from '../../Components/Header/Header'
import mockDataPR from '../../../mockData/mockDataPR.json'
import { useTable } from 'react-table'
import  PRTable  from '../../Components/PetRecordTable/PRTable'
import styles from './PetRecords.module.css'


export const PetRecords = () => {
    

  return (
    <div>
        <PRTable className={styles.table}/>
    </div>
  )
}
