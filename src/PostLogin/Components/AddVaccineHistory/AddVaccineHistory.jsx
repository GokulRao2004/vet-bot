import styles from './AddVaccineHistory.module.css'
import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';



export const AddVaccineHistory = () => {

  const [petID, setPetID] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [petInfo, setPetInfo] = useState({
    "petName": "", "type": ""
  });
  const fetchPetDetails = useCallback(
    debounce((value) => {
      console.log('API Call with PetID:', value);
      setPetInfo(prevState => ({
        ...prevState,
        petName: "Whiskers",
        type: "cat",
      }));
    }, 500),
    []
  );

  const handlePetIDChange = (e) => {
    const newPetID = e.target.value;
    setPetID(newPetID);
    if (newPetID.length === 4 && parseInt(newPetID) === 1002) {
      fetchPetDetails(newPetID);
    }
    else {
      setPetInfo({})
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.petInfoContainer}>
        <div className={styles.inputFields}>
          <div className={styles.petID} >
            PetID :
            <input type='number' value={petID} onChange={handlePetIDChange}></input>
          </div>
          <div className={styles.phoneNumber}>
            Phone Number:
            <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
          </div>
        </div>
        <div className={styles.petInfo}>
          <div>Pet Name: {petInfo.petName}</div>
          <div>Type: {petInfo.type}</div>
        </div>
      </div>
      <div className={styles.vaccineHistory}>
        
      </div>
    </div>
  )
}
