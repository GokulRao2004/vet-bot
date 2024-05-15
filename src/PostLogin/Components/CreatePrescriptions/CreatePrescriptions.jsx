import React, { useState } from 'react'
import styles from './CreatePrescriptions.module.css'
import { HorizontalLine } from '../HorizontalLine'
import { getImageUrl } from '../../../utils'
import { useTable } from 'react-table'
import { Delete, DeleteOutlineTwoTone } from '@mui/icons-material'
import { IconButton } from '@mui/material'


export const CreatePrescriptions = () => {
    const date = new Date();
    const [petID, setPetID] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [newRowData, setNewRowData] = useState({
        Medicine: '',
        Dose: { text: '', dropdown: 'mg' },
        Route: 'Oral',
        Frequency: ['0', '0', '0'],
        Duration: { text: '', dropdown: 'days' }
    });

    const [data, setData] = useState([

    ]);
    const columns = React.useMemo(
        () => [
            {
                Header: 'Medicine',
                accessor: 'Medicine'
            },
            {
                Header: 'Dose',
                accessor: 'Dose'
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
                accessor: 'Duration'
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
        setData((prevData) => prevData.filter((item, index) => index !== row.index));
    };
    const handleInputChange = (e, field, dropdown) => {

        setNewRowData((prevData) => ({
            ...prevData,
            [field]: e.target.value
        }));

    };

    const handleFrequencyChange = (e, index) => {
        const newFrequency = [...newRowData.Frequency];
        newFrequency[index] = e.target.value;
        setNewRowData((prevData) => ({
            ...prevData,
            Frequency: newFrequency
        }));
    };


    const handleDoseChange = (e, field) => {
        setNewRowData((prevData) => ({
            ...prevData,
            Dose: {
                ...prevData.Dose,
                [field]: e.target.value
            }
        }));
    };
    const handleDurationChange = (e, field) => {
        setNewRowData((prevData) => ({
            ...prevData,
            Duration: {
                ...prevData.Duration,
                [field]: e.target.value
            }
        }));
    };

    const handleAddRow = () => {
        const concatenatedDose = `${newRowData.Dose.text} ${newRowData.Dose.dropdown}`;
        const concatenatedDuration = `${newRowData.Duration.text} ${newRowData.Duration.dropdown}`;
        const newData = {
            ...newRowData,
            Dose: concatenatedDose,
            Duration: concatenatedDuration
        };
        setData((prevData) => [...prevData, newData]);
        setNewRowData({
            Medicine: '',
            Dose: { text: '0', dropdown: 'mg' },
            Route: 'Oral',
            Frequency: ['0', '0', '0'],
            Duration: { text: '0', dropdown: 'days' }
        });
    };



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
                        <div className={styles.petID}>
                            PetID :
                            <input value={petID} onChange={e => setPetID(e.target.value)}></input>
                        </div>
                        <div className={styles.phoneNumber}>
                            Phone Number:
                            <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.petInfo}>
                        <div className={styles.petInfoLeft}>
                            <div>
                                <div>Pet Name:</div>
                                <div>DOB:</div>
                                <div>Sex:</div>
                            </div>
                            <div>
                                <div>Type: </div>
                                <div>Breed: </div>
                                <div>Conditions</div>
                            </div>
                        </div>
                        <div className={styles.petInfoRight}>
                            <div>Last Visit: </div>
                            <div>Weight: </div>
                        </div>
                    </div>
                    <div className={styles.prescriptionLink}>
                        <a href="">View Prescriptions</a>
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
                            {rows.map(row => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                        })}
                                    </tr>

                                );
                            })}
                            <tr className={styles.tr}>
                                <td className={styles.td}><input type="text" value={newRowData.Medicine} onChange={(e) => handleInputChange(e, 'Medicine')} /></td>
                                <td className={styles.td}>
                                    <input type="number" value={newRowData.Dose.text} onChange={(e) => handleDoseChange(e, 'text')} style={{ width: '8ch' }} />
                                    <select value={newRowData.Dose.dropdown} onChange={(e) => handleDoseChange(e, 'dropdown')} style={{ width: '8ch' }}>
                                        <option value="mg">mg</option>
                                        <option value="ml">ml</option>
                                        <option value="sachet">sachet</option>
                                        <option value="tablet">tablet</option>
                                    </select>
                                </td>
                                <td className={styles.td}><input type="text" value={newRowData.Route} onChange={(e) => handleInputChange(e, 'Route')} /></td>
                                <td>
                                    <select value={newRowData.Frequency[0]} onChange={(e) => handleFrequencyChange(e, 0)} >
                                        <option value={'0'} >0</option>
                                        <option value={'1/2'}>1/2</option>
                                        <option value={'1'}>1</option>
                                        <option value={'2'}>2</option>

                                    </select>
                                    -
                                    <select value={newRowData.Frequency[1]} onChange={(e) => handleFrequencyChange(e, 1)} >
                                        <option value={'0'}>0</option>
                                        <option value={'1/2'}>1/2</option>
                                        <option value={'1'}>1</option>
                                        <option value={'2'}>2</option>

                                    </select>
                                    -
                                    <select value={newRowData.Frequency[2]} onChange={(e) => handleFrequencyChange(e, 2)} >
                                        <option value={'0'}>0</option>
                                        <option value={'1/2'}>1/2</option>
                                        <option value={'1'}>1</option>
                                        <option value={'2'}>2</option>

                                    </select>
                                </td>

                                <td className={styles.td}>
                                    <input type="number" value={newRowData.Duration.text} onChange={(e) => handleDurationChange(e, 'text')} style={{ width: "7ch" }} />
                                    <select value={newRowData.Duration.dropdown} onChange={(e) => handleDurationChange(e, 'dropdown')} >
                                        <option value="days">Days</option>
                                        <option value="weeks">Weeks</option>
                                        <option value="months">Months</option>
                                    </select>
                                </td>
                                <td className={styles.td}><button onClick={handleAddRow}>Add</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.btnContainer}>
                    <button type='submit' className={styles.submitBtn} onClick={()=>{console.log('hello');}}>Submit</button>
                </div>
            </div>
        </div>
    )
}
