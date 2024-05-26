import React, { useMemo } from 'react'
import mockDataPR from "../../../mockData/mockDataPR.json"
import { useParams } from 'react-router-dom';
import styles from "./ViewDeworming.module.css";
import { useTable } from 'react-table';


export const ViewDeworming = () => {
  const ID = useParams()
  const Data = mockDataPR.filter(item => item.id === parseInt(ID.id));
  if(!Data[0].dewormingHistory){
    return <div style={{display:"flex", width: "100%", justifyContent:"center", fontSize:"22px", padding:"10px"}}>
    Oops no record found ! </div>
  }
  const COLUMNS = [
    { accessor: "date", Header: 'Vaccination Date' },
    { accessor: "dewormingMedicine", Header: 'Deworming Medicine'},
    { accessor: "dueDate", Header: 'Due Date' }
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => Data[0].dewormingHistory, [Data]);

  const petTable = useTable(
    {
      columns,
      data,

    },
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows
  } = petTable;
  return (
    <div className={styles.container}>


      <div className={styles.tableContainer}>
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
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}className={styles.tr}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()} className={styles.td}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>

        </table>

      </div>
    </div>
  )
}
