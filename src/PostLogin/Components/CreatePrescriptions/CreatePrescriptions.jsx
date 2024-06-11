import React, { useCallback, useEffect, useState } from 'react'
import styles from './CreatePrescriptions.module.css'
import { HorizontalLine } from '../HorizontalLine'
import { getImageUrl } from '../../../utils'
import { useTable } from 'react-table'
import { Delete, DeleteOutlineTwoTone } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom'


export const CreatePrescriptions = () => {
    const date = new Date();
    const [petID, setPetID] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    const [newRowData, setNewRowData] = useState({
        Medicine: '',
        Dose: { text: '', dropdown: 'mg' },
        Route: 'Oral',
        Frequency: ['0', '0', '0'],
        Duration: { text: '', dropdown: 'days' }
    });
    const [data, setData] = useState([])

    const [petInfo, setPetInfo] = useState({
        "petName": "", "type": "", "DOB": "", "breed": "", "sex": "", "conditions": "", "lastVisit": "", "weight": "", "petID": ""
    });
    const [editableRow, setEditableRow] = useState(null);

    const handleRowClick = (rowIndex) => {
        setEditableRow(rowIndex);
    };

    const columns = React.useMemo(
        () => [
            {
                Header: 'Medicine',
                accessor: 'Medicine'
            },
            {
                Header: 'Dose',
                accessor: row => `${row.Dose.text} ${row.Dose.dropdown}`
            },
            {
                Header: 'Route',
                accessor: 'Route'
            },
            {
                Header: 'Frequency',
                accessor: 'Frequency',
                Cell: ({ value }) => {
                    if (Array.isArray(value)) {
                        return <span style={{ fontSize: '18px', fontWeight: 'light' }}>{value.join(`\u00A0 - \u00A0`)}</span>;
                    }
                    return <span>{value}</span>;
                }
            },
            {
                Header: 'Duration',
                accessor: row => `${row.Duration.text} ${row.Duration.dropdown}`
            },
            {
                Header: "Time",
                accessor: "Time"
            },
            {
                Header: 'Delete',
                Cell: ({ row }) => (
                    <IconButton onClick={() => handleDelete(row)} sx={{ color: '#66316A' }}>
                        <DeleteOutlineTwoTone sx={{ fontSize: '30px' }} />
                    </IconButton>

                )
            }
        ],
        []
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data });


    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const currentDate = `${day}/${month}/${year}`
    const handleDelete = (row) => {
        setEditableRow(null);
        setData((prevData) => prevData.filter((item, index) => index !== row.index));
    };
    const handleAddInputChange = (e, field) => {
        setNewRowData((prevData) => ({
            ...prevData,
            [field]: e.target.value
        }));
    };

    const handleAddFrequencyChange = (e, index) => {
        const newFrequency = [...newRowData.Frequency];
        newFrequency[index] = e.target.value;
        setNewRowData((prevData) => ({
            ...prevData,
            Frequency: newFrequency
        }));
    };


    const handleAddDoseChange = (e, field) => {
        setNewRowData((prevData) => ({
            ...prevData,
            Dose: {
                ...prevData.Dose,
                [field]: e.target.value
            }
        }));
    };
    const handleAddDurationChange = (e, field) => {
        setNewRowData((prevData) => ({
            ...prevData,
            Duration: {
                ...prevData.Duration,
                [field]: e.target.value
            }
        }));
    };

    const handleAddRow = () => {
        const newData = {
            ...newRowData,
        };
        setData((prevData) => [...prevData, newData]);
        setNewRowData({
            Medicine: '',
            Dose: { text: '', dropdown: 'mg' },
            Route: 'Oral',
            Frequency: ['0', '0', '0'],
            Duration: { text: '', dropdown: 'days' },
            Time: ''
        });
    };

    const fetchPetDetails = useCallback(
        debounce((value) => {
            console.log('API Call with PetID:', value);
            setPetInfo(prevState => ({
                ...prevState,
                petName: "Whiskers",
                type: "cat",
                breed: "Siamese",
                DOB: "3/5/2019",
                sex: "F",
                conditions: "NA",
                weight: "10",
                lastVisit: "5/5/2023"
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




    const handleDoneClick = () => {
        setEditableRow(null); // Reset the editableRow state
        console.log("Editable row reset.");
    };

    const handleInputChange = (e, field, rowIndex) => {

        const newData = [...data];
        newData[rowIndex] = { ...newData[rowIndex], [field]: e.target.value };
        setData(newData);
    };

    const handleDoseChange = (e, field, rowIndex) => {
        const newData = [...data];
        newData[rowIndex] = {
            ...newData[rowIndex],
            Dose: { ...newData[rowIndex].Dose, [field]: e.target.value }
        };
        setData(newData);
    };

    const handleFrequencyChange = (e, freqIndex, rowIndex) => {
        const newData = [...data];
        newData[rowIndex] = {
            ...newData[rowIndex],
            Frequency: newData[rowIndex].Frequency.map((f, j) => j === freqIndex ? e.target.value : f)
        };
        setData(newData);
    };

    const handleDurationChange = (e, field, rowIndex) => {
        const newData = [...data];
        newData[rowIndex] = {
            ...newData[rowIndex],
            Duration: { ...newData[rowIndex].Duration, [field]: e.target.value }
        };
        setData(newData);
    };


    const handleViewPrescriptions = (e) => {
        e.preventDefault();
        if (!petID) {
            return
        }
        navigate(`/petrecords/${petID}/prescriptions`)
    }

    return (
        <div className={styles.container}>
            <div className={styles.prescription}>
                <div className={styles.doctorInfo}>
                    <div className={styles.docInfoLeft}>
                        <div>
                            <h1 className={styles.darkHeading}>Dr Udayaravi Bhat</h1>
                            <p className={styles.lightText}>M.S , B.V.Sc.</p>
                        </div>
                        <div>
                            <h1 className={styles.darkHeading}>PRAJNA VETERINARY CLINIC</h1>
                            <p className={styles.lightText}> No. 506, 4th cross, 5th Main Road,<br />
                                Next to K.S. Narasimha Park, BSK 3rd Stage,<br />
                                2nd Block, Bengaluru - 560 085
                            </p>
                        </div>
                    </div>
                    <div className={`${styles.docInfoRight} ${styles.lightText}`}>
                        Clinic: 080 - 26699415 <br />
                        Res : 080 - 26723405 <br />
                        Mobile : 94485 44822<br />
                    </div>
                </div>
                <HorizontalLine width='100%' color="darkgray" />
                <div className={styles.petInfoFull}>
                    <div className={styles.header}>
                        <img src={getImageUrl('Dashboard/CreatePrescription/presc.png')} alt="Rx"
                            className={styles.rx} />
                        <div className={styles.date}> Date: {currentDate}</div>
                    </div>
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
                        <div className={styles.petInfoLeft}>
                            <div>
                                <div>Pet Name: {petInfo.petName}</div>
                                <div>DOB: {petInfo.DOB}</div>
                                <div>Sex: {petInfo.sex}</div>
                            </div>
                            <div>
                                <div>Type: {petInfo.type}</div>
                                <div>Breed: {petInfo.breed}</div>
                                <div>Conditions {petInfo.conditions}</div>
                            </div>
                        </div>
                        <div className={styles.petInfoRight}>
                            <div>Last Visit: {petInfo.lastVisit}</div>
                            <div>Weight: {petInfo.weight}kg</div>
                        </div>
                    </div>
                    <div className={styles.prescriptionLink}>
                        <div onClick={handleViewPrescriptions}>View Prescriptions</div>
                    </div>
                </div>
                <HorizontalLine width='96%' color="#F0F0F0" />
                <div className={styles.complaints}>
                    Complaints:
                    <input />
                </div>
                <HorizontalLine width='96%' color="#F0F0F0" />
                <div className={styles.prelimAnalysis}>
                    <div className={styles.prelimHeading}>Preliminary Analysis</div>
                    <div className={styles.prelimInputs}>
                        <div>
                            Temperature :
                            <input type="text" /> F
                        </div>
                        <div>
                            Weight :
                            <input type="text" /> Kg
                        </div>
                    </div>
                    <div className={styles.diagnosis}>
                        Diagnosis:
                        <input type="text" />
                    </div>
                </div>
                <HorizontalLine width='96%' color="#F0F0F0" />
                <div className={styles.medicines}>
                    <table {...getTableProps()} className={styles.table}>
                        <thead className={styles.thead}>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()} className={styles.tr}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()} className={styles.th}>{column.render('Header')}</th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()} className={styles.tbody}>

                            {rows.map((row, rowIndex) => {
                    
                                prepareRow(row);
                                const isEditable = editableRow === row;
                                console.log('isEditable: ', isEditable);


                                return (
                                    <tr key={rowIndex} {...row.getRowProps()} onClick={() => handleRowClick(row)}>
                                        {isEditable ? (
                                            <>
                                                <td className={styles.td}>
                                                    
                                                    <input type="text" value={data[rowIndex].Medicine} onChange={(e) => { handleInputChange(e, 'Medicine', rowIndex) }} />
                                                </td>
                                                <td className={styles.td}>
                                                    <input type="number" value={data[rowIndex].Dose.text} onChange={(e) => handleDoseChange(e, 'text', rowIndex)} style={{ width: '8ch' }} />
                                                    <select value={data[rowIndex].Dose.dropdown} onChange={(e) => handleDoseChange(e, 'dropdown', rowIndex)} style={{ width: '8ch' }}>
                                                        <option value="mg">mg</option>
                                                        <option value="ml">ml</option>
                                                        <option value="sachet">sachet</option>
                                                        <option value="tablet">tablet</option>
                                                    </select>
                                                </td>
                                                <td className={styles.td}>
                                                    <select value={data[rowIndex].Route} onChange={(e) => handleInputChange(e, 'Route', rowIndex)}>
                                                        <option value="oral">Oral</option>
                                                        <option value="external">External</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select value={data[rowIndex].Frequency[0]} onChange={(e) => handleFrequencyChange(e, 0, rowIndex)}>
                                                        <option value="0">0</option>
                                                        <option value="1/2">1/2</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                    </select>
                                                    -
                                                    <select value={data[rowIndex].Frequency[1]} onChange={(e) => handleFrequencyChange(e, 1, rowIndex)}>
                                                        <option value="0">0</option>
                                                        <option value="1/2">1/2</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                    </select>
                                                    -
                                                    <select value={data[rowIndex].Frequency[2]} onChange={(e) => handleFrequencyChange(e, 2, rowIndex)}>
                                                        <option value="0">0</option>
                                                        <option value="1/2">1/2</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                    </select>
                                                </td>
                                                <td className={styles.td}>
                                                    <input type="number" value={data[rowIndex].Duration.text} onChange={(e) => handleDurationChange(e, 'text', rowIndex)} style={{ width: "7ch" }} />
                                                    <select value={data[rowIndex].Duration.dropdown} onChange={(e) => handleDurationChange(e, 'dropdown', rowIndex)}>
                                                        <option value="days">Days</option>
                                                        <option value="weeks">Weeks</option>
                                                        <option value="months">Months</option>
                                                    </select>
                                                </td>
                                                <td className={styles.td}>
                                                    <select value={data[rowIndex].Time} onChange={(e) => handleTimeChange(e, 'dropdown', rowIndex)}>
                                                        <option value="B/F">B/F</option>
                                                        <option value="A/F">A/F</option>
                                                    </select>
                                                </td>
                                                <td className={styles.td}>
                                                    <button onClick={(e) => { e.stopPropagation(); handleDoneClick(); }}>Done</button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                {row.cells.map((cell) => (
                                                    <td key={cell.id} {...cell.getCellProps()}>
                                                        {cell.render('Cell')}
                                                    </td>
                                                ))}
                                            </>
                                        )}
                                    </tr>
                                );
                            })}
                            <tr className={styles.tr}>
                                <td className={styles.td}><input type="text" value={newRowData.Medicine} onChange={(e) => handleAddInputChange(e, 'Medicine')} /></td>
                                <td className={styles.td}>
                                    <input type="number" value={newRowData.Dose.text} onChange={(e) => handleAddDoseChange(e, 'text')} style={{ width: '8ch' }} />
                                    <select value={newRowData.Dose.dropdown} onChange={(e) => handleAddDoseChange(e, 'dropdown')} style={{ width: '8ch' }}>
                                        <option value="mg">mg</option>
                                        <option value="ml">ml</option>
                                        <option value="sachet">sachet</option>
                                        <option value="tablet">tablet</option>
                                    </select>
                                </td>
                                <td className={styles.td}>
                                    <select value={newRowData.Route} onChange={(e) => handleAddInputChange(e, 'Route')}>
                                        <option value="oral">Oral</option>
                                        <option value="external">External</option>
                                    </select>
                                </td>
                                <td>
                                    <select value={newRowData.Frequency[0]} onChange={(e) => handleAddFrequencyChange(e, 0)} >
                                        <option value={'0'} >0</option>
                                        <option value={'1/2'}>1/2</option>
                                        <option value={'1'}>1</option>
                                        <option value={'2'}>2</option>

                                    </select>
                                    -
                                    <select value={newRowData.Frequency[1]} onChange={(e) => handleAddFrequencyChange(e, 1)} >
                                        <option value={'0'}>0</option>
                                        <option value={'1/2'}>1/2</option>
                                        <option value={'1'}>1</option>
                                        <option value={'2'}>2</option>

                                    </select>
                                    -
                                    <select value={newRowData.Frequency[2]} onChange={(e) => handleAddFrequencyChange(e, 2)} >
                                        <option value={'0'}>0</option>
                                        <option value={'1/2'}>1/2</option>
                                        <option value={'1'}>1</option>
                                        <option value={'2'}>2</option>

                                    </select>
                                </td>

                                <td className={styles.td}>
                                    <input type="number" value={newRowData.Duration.text} onChange={(e) => handleAddDurationChange(e, 'text')} style={{ width: "7ch" }} />
                                    <select value={newRowData.Duration.dropdown} onChange={(e) => handleAddDurationChange(e, 'dropdown')} >
                                        <option value="days">Days</option>
                                        <option value="weeks">Weeks</option>
                                        <option value="months">Months</option>
                                    </select>
                                </td>
                                <td className={styles.td}>
                                    <select value={newRowData.Time} onChange={(e) => handleAddTimeChange(e, 'dropdown')} >
                                        <option value="B/F">B/F</option>
                                        <option value="A/F">A/F</option>
                                    </select>
                                </td>
                                <td className={styles.td}><button onClick={handleAddRow}>Add</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.btnContainer}>
                    <button type='submit' className={styles.submitBtn} onClick={() => { console.log('hello'); }}>Submit</button>
                </div>
            </div>
        </div>
    )
}
