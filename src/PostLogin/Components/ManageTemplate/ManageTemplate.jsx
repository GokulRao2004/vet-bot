import React, { useMemo, useEffect, useState } from 'react';
import { useGlobalFilter, usePagination, useTable } from 'react-table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { FaEdit } from 'react-icons/fa'; 
import styles from "./ManageTemplate.module.css";
import Header from "../Header/Header";
import endpoints from '../../../APIendpoints';

export const ManageTemplate = () => {
    const [data, setData] = useState([]); 
    const navigate = useNavigate(); 

    const COLUMNS = [
        { accessor: "template_name", Header: 'Template Name' },
        { accessor: "category", Header: 'Category' },
        { accessor: "language", Header: 'Language' },
        { accessor: "status", Header: 'Status' },
        { accessor: "edit", Header: 'Edit' },
    ];

    const columns = useMemo(() => COLUMNS, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(endpoints.getTemplate);
                const formattedData = response.data.data.map(item => ({
                    template_name: item.name,
                    category: item.category,
                    language: item.language,
                    status: item.status,
                    id: item.id, 
                    edit: (
                        <div style={{ display: 'flex', justifyContent: 'center' , paddingRight:"50%"}}>
                            <FaEdit
                                style={{ cursor: 'pointer', color: '#404040' , fontSize:"25px"}} 
                                onClick={() => navigate(`./editTemplate?id=${item.id}`)} 
                            />
                        </div>
                    ),
                }));
                setData(formattedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [navigate]);

    const templateTable = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }
        },
        useGlobalFilter,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
    } = templateTable;

    return (
        <div>
            <Header title="Manage Templates" />
            <div className={styles.tableContainer}>
                <table {...getTableProps()} className={styles.table}>
                    <thead className={styles.thead}>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()} className={styles.tr}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()} className={styles.th}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()} className={styles.tbody}>
                        {page.length === 0 ? (
                            <tr className={styles.tr}>
                                <td colSpan={COLUMNS.length} style={{textAlign:"center"}}>No data available</td>
                            </tr>
                        ) : (
                            page.map(row => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} className={styles.tr}>
                                        {row.cells.map(cell => (
                                            <td {...cell.getCellProps()} className={styles.td}>
                                                {cell.render('Cell')}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
