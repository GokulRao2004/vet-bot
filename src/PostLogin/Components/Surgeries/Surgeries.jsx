import React, { useMemo } from 'react'
import { useTable } from 'react-table';
import surgeryData from '../../../mockData/surgeries.json';
import styles from './Surgeries.module.css'


export const Surgeries = () => {

    const COLUMNS = [
        { accessor: "petID", Header: 'Pet ID' },
        { accessor: "petName", Header: 'Pet Name' },
        { accessor: "typeOfSurgery", Header: 'Type Of Surgery' },
        { accessor: "performedBy", Header: 'Performed By' },
        { accessor: "scheduledAt", Header: 'Scheduled At' }
    ];

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => surgeryData, [surgeryData]);
    console.log('surgeryData: ', surgeryData);
    const surgeryScheduleTable = useTable(
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
    } = surgeryScheduleTable;
    return (
        <div className={styles.container}><table {...getTableProps()} className={styles.table}>
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
                        <tr {...row.getRowProps()} className={styles.tr}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()} className={styles.td}>{cell.render('Cell')}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>

        </table></div>
    )
}
