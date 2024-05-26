import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './CreatePR.module.css'
import { setModalStatus } from '../../../redux/reducers/addPetRecordReducer';
import { IconButton } from '@mui/material';
import { ChevronLeft, Close } from '@mui/icons-material';
import { addNewPet } from '../../../redux/reducers/petRecordReducer';

export const CreatePR = () => {
  const isModalOpen = useSelector(state => state.addPetRecord.isOpen)
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(state => state.global.isSidebarOpen)

  const [currentPage, setCurrentPage] = useState(1);
  const [formState, setFormState] = useState({
    contact: "",
    ownerFirstName: "",
    ownerLastName: "",
    address: "",
    email: ""
  });
  const [pets, setPets] = useState([])
  const [maxDate, setMaxDate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMaxDate(today);
  }, []);

  const getNewPetTemplate = () => ({
    id: "",
    name: "",
    breed: "",
    type: "",
    sex: "M",
    uniqueIdentifications: "",
    dateOfBirth: "",
    vaccinationStatus: "Unknown",
    prescriptions: {},
    dewormingHistory: {},
    vaccinationHistory: {}
  });

  const handleNext = (e) => {
    e.preventDefault();

    let requiredFieldsFilled = false;

    if (currentPage === 1) {
      // Check if all required fields in parent details are filled
      requiredFieldsFilled = formState.contact && formState.ownerFirstName && formState.ownerLastName && formState.address;
    } else {
      // Check if all required fields in pet details are filled
      requiredFieldsFilled = pets[currentPage - 2].name && pets[currentPage - 2].type && pets[currentPage - 2].breed && pets[currentPage - 2].dateOfBirth && pets[currentPage - 2].sex;
    }

    if (requiredFieldsFilled) {

      if (!pets[currentPage - 1]) {
        setPets(prevPets => [...prevPets, getNewPetTemplate()]);
      }
      setCurrentPage(currentPage + 1);
    } else {
      alert("Please fill in all required fields before proceeding.");
    }
  };


  const handlePrev = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage - 1);
  }


  const closeModal = () => {
    dispatch(setModalStatus())
  }

  const handleChangeFields = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleChangePetFields = (e, petIndex) => {
    const { name, value } = e.target;
    const parsedValue = name === 'id' ? parseInt(value) : value;
    setPets(prevPets => {
      const updatedPet = { ...prevPets[petIndex], [name]: parsedValue };
      const updatedPets = [...prevPets];
      updatedPets[petIndex] = updatedPet;
      return prevPets.map((pet, index) => (index === petIndex ? updatedPet : pet));
    });
  };




  const concatenateObjects = () => {
    const concatenatedObjects = [];
    for (let i = 0; i < pets.length; i++) {
      const pet = pets[i];
      const concatenatedObject = { ...formState };
      for (const key in pet) {
        concatenatedObject[key] = pet[key];
      }
      concatenatedObjects.push(concatenatedObject);
    }
    return concatenatedObjects;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let requiredFieldsFilled = false;

    if (currentPage === 1) {
      // Check if all required fields in parent details are filled
      requiredFieldsFilled = formState.contact && formState.ownerFirstName && formState.ownerLastName && formState.address;
    } else {
      // Check if all required fields in pet details are filled
      requiredFieldsFilled = pets[currentPage - 2].name && pets[currentPage - 2].type && pets[currentPage - 2].breed && pets[currentPage - 2].dateOfBirth && pets[currentPage - 2].sex;
    }
    const ownerAndPetDetails = concatenateObjects();
    for (let i = 0; i < ownerAndPetDetails.length; i++) {
      dispatch(addNewPet(ownerAndPetDetails[i]));
    }
    closeModal();
  }



  return (
    <>
      {isModalOpen && <div className={isSidebarOpen ? styles.containerOpen : styles.containerClose} >

        <div className={isSidebarOpen ? styles.modalOpen : styles.modalClose}>
          <div className={styles.header}>
            <div className={styles.heading}>
              Create Pet Record
            </div>
            <IconButton className={styles.closeBtn} onClick={closeModal}>
              <Close sx={{ fontSize: '28px', color: '#fff' }} />
            </IconButton>
          </div>
          <form className={styles.form} >

            {currentPage === 1 && <div className={styles.fields}>
              {console.log(currentPage)}
              <div>
                <h2 className={styles.formName} style={{marginTop:"20px"}}>Parent Details</h2>
              </div>
              <div className={styles.row}>
                <div className={styles.fName}>
                  <div className={styles.inputWrapper}>
                    <input
                      type='text'
                      className={styles.userID}
                      placeholder=''
                      name="ownerFirstName"
                      value={formState.ownerFirstName}
                      onChange={handleChangeFields}
                      required
                    />
                    <label htmlFor="ownerFirstName" className={styles.label}>
                      First Name
                    </label>
                  </div>
                </div>
                <div className={styles.lName}>
                  <div className={styles.inputWrapper}>
                    <input
                      type='text'
                      className={styles.userID}
                      placeholder=''
                      name="ownerLastName"
                      value={formState.ownerLastName}
                      onChange={handleChangeFields}
                      required
                    />
                    <label htmlFor="ownerLastName" className={styles.label}>
                      Last Name
                    </label>
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.fName}>
                  <div className={styles.inputWrapper}>
                    <input
                      type='text'
                      className={styles.userID}
                      placeholder=''
                      name="contact"
                      value={formState.contact}
                      onChange={handleChangeFields}
                      required
                    />
                    <label htmlFor="contact" className={styles.label}>
                      Phone Number
                    </label>
                  </div>
                </div>
                <div className={styles.lName}>
                  <div className={styles.inputWrapper}>
                    <input
                      type='email'
                      className={styles.userID}
                      placeholder=''
                      name="email"
                      value={formState.email}
                      onChange={handleChangeFields}
                    />
                    <label htmlFor="email" className={styles.label}>
                      Email (Optional)
                    </label>
                  </div>
                </div>
              </div>
              <div className={styles.rowFull}>
                <div className={styles.address}>
                  <div className={styles.inputWrapper}>
                    <input
                      type='text'
                      className={styles.userID}
                      placeholder=''
                      name="address"
                      value={formState.address}
                      onChange={handleChangeFields}
                      required
                    />
                    <label htmlFor="address" className={styles.label}>
                      Address
                    </label>
                  </div>
                </div>

              </div>
              <div className={styles.rowBtn}>
                <button className={styles.button} onClick={handleNext}>
                  Next
                </button>

              </div>
            </div>
            }
            {(currentPage >= 2 && currentPage <= 4) && <div className={styles.fields}>
              <div className={styles.btn}>
                <button className={styles.backButton} onClick={handlePrev} style={{display : "flex" ,flexDirection: "row" , alignItems:"center" , justifyContent:'center'}}> 
                  <ChevronLeft/> Back
                </button></div>
              <div>
                <h2 className={styles.formName}>Pet {currentPage - 1} Details</h2>
              </div>
              <div className={styles.row}>
                <div className={styles.fName}>
                  <div className={styles.inputWrapper}>
                    <input
                      type='text'
                      className={styles.userID}
                      placeholder=''
                      name="name"
                      value={pets[currentPage - 2].name || ''}
                      onChange={(e) => handleChangePetFields(e, currentPage - 2)}
                      required
                    />
                    <label htmlFor="name" className={styles.label}>
                      Name
                    </label>
                  </div>
                </div>
                <div className={styles.lName}>
                  <div className={styles.inputWrapper}>
                    <input
                      type='text'
                      className={styles.userID}
                      placeholder=''
                      name="type"
                      value={pets[currentPage - 2].type || ''}
                      onChange={(e) => handleChangePetFields(e, currentPage - 2)}
                      required
                    />
                    <label htmlFor="type" className={styles.label}>
                      Type
                    </label>
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.fName}>
                  <div className={styles.inputWrapper}>
                    <input
                      type='text'
                      className={styles.userID}
                      placeholder=''
                      name="breed"
                      value={pets[currentPage - 2].breed || ''}
                      onChange={(e) => handleChangePetFields(e, currentPage - 2)}
                      required
                    />
                    <label htmlFor="breed" className={styles.label}>
                      Breed
                    </label>
                  </div>
                </div>
                <div className={styles.lName}>
                  <div className={styles.inputWrapper}>
                    <input
                      type='text'
                      className={styles.userID}
                      placeholder=''
                      name="uniqueIdentifications"
                      value={pets[currentPage - 2].uniqueIdentifications || ''}
                      onChange={(e) => handleChangePetFields(e, currentPage - 2)}
                    />
                    <label htmlFor="uniqueIdentifications" className={styles.label}>
                      Unique Identifications (if any)
                    </label>
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.row3}>
                  <div className={`${styles.inputWrapper} ${styles.date}`}>
                    <input
                      type='date'
                      className={styles.userID}
                      placeholder=''
                      name="dateOfBirth"
                      value={pets[currentPage - 2].dateOfBirth || ''}
                      onChange={(e) => handleChangePetFields(e, currentPage - 2)}
                      max={maxDate}
                      required
                    />
                    <label htmlFor="dateOfBirth" className={styles.label}>
                      Date Of Birth
                    </label>
                  </div>
                  <div className={`${styles.inputWrapper} ${styles.sex}`}>
                    <select
                      className={styles.userID}
                      name="sex"
                      value={pets[currentPage - 2].sex || ''}
                      onChange={(e) => handleChangePetFields(e, currentPage - 2)}
                      required
                    >
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                    <label htmlFor="sex" className={styles.label}>
                      Sex
                    </label>
                  </div>
                  <div className={`${styles.inputWrapper} ${styles.ID}`}>
                    <input
                      type='number'
                      className={styles.userID}
                      placeholder=''
                      name="id"
                      value={pets[currentPage - 2].id || ''}
                      onChange={(e) => handleChangePetFields(e, currentPage - 2)}
                      required
                    />
                    <label htmlFor="address" className={styles.label}>
                      ID
                    </label>
                  </div>
                </div>

              </div>
              <div className={styles.rowBtnPage2}>
                <button className={styles.button} onClick={handleNext}>
                  Add More
                </button>
                <button className={styles.button} onClick={handleSubmit}>
                  Submit
                </button>


              </div>
            </div>
            }
          </form>
        </div>
      </div>}</>
  )
}