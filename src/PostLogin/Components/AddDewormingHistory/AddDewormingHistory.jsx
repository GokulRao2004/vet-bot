import styles from './AddDewormingHistory.module.css'
import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useTable } from 'react-table'
import { IconButton } from '@mui/material'
import { DeleteOutlineTwoTone } from '@mui/icons-material'


export const AddDewormingHistory = () => {

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

  const [newRowData, setNewRowData] = useState({
    date: '',
    dewormingType: '',
    dueDate: ''
  });

  const [data, setData] = useState([]);
  const [editableRow, setEditableRow] = useState(null);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date'
      },
      {
        Header: 'Deworming Type',
        accessor: 'dewormingType'
      },
      {
        Header: 'Due Date',
        accessor: 'dueDate'
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

  const handleAddRow = () => {
    const newData = {
      ...newRowData,
    };
    setData((prevData) => [...prevData, newData]);
    setNewRowData({
      date: '',
      dewormingType: '',
      dueDate: ''
    });
  };

  const handleRowClick = (rowIndex) => {
    setEditableRow(rowIndex);
  };

  const handleDoneClick = () => {
    setEditableRow(null);
  };

  const handleInputChange = (e, field, rowIndex) => {
    const newData = [...data];
    newData[rowIndex] = { ...newData[rowIndex], [field]: e.target.value };
    setData(newData);
  };

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
              const isEditable = editableRow === rowIndex;

              return (
                <tr key={rowIndex} {...row.getRowProps()} onClick={() => handleRowClick(rowIndex)}>
                  {isEditable ? (
                    <>
                      <td className={styles.td}>
                        <input type="date" value={data[rowIndex].date} onChange={(e) => handleInputChange(e, 'date', rowIndex)} />
                      </td>
                      <td className={styles.td}>
                        <input type="text" value={data[rowIndex].dewormingType} onChange={(e) => handleInputChange(e, 'dewormingType', rowIndex)} />
                      </td>
                      <td className={styles.td}>
                        <input type="date" value={data[rowIndex].dueDate} onChange={(e) => handleInputChange(e, 'dueDate', rowIndex)} />
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
              <td className={styles.td}>
                <input type="date" value={newRowData.date} onChange={(e) => handleAddInputChange(e, 'date')} />
              </td>
              <td className={styles.td}>
                <input type="text" value={newRowData.dewormingType} onChange={(e) => handleAddInputChange(e, 'dewormingType')} />
              </td>
              <td className={styles.td}>
                <input type="date" value={newRowData.dueDate} onChange={(e) => handleAddInputChange(e, 'dueDate')} />
              </td>
              <td className={styles.td}>
                <button onClick={handleAddRow}>Add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.submitBtnContainer}>
        <button className={styles.submitBtn}>Submit</button>
      </div>
    </div>
  )
}
