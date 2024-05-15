import React, { useMemo } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { useSelector } from 'react-redux';
import { CreatePR } from '../CreatePetRecord/CreatePR';
import Header from '../Header/Header';
import { PRTableNav } from '../PetRecordTableNav/PRTableNav';
import styles from './PRTable.module.css';
import { useNavigate } from 'react-router-dom';


const PRTable = () => {
  const navigate = useNavigate();
  const mockDataPR = useSelector(state => state.petRecords.pets);

  const COLUMNS = [
    { accessor: "id", Header: 'Pet ID' },
    { accessor: "name", Header: 'Name' },
    { accessor: "contact", Header: 'Contact' },
    { accessor: "type", Header: 'Type' },
    { accessor: "breed", Header: 'Breed' },
    { accessor: "vaccinationStatus", Header: 'Vaccination' }
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => mockDataPR, [mockDataPR]);

  const petTable = useTable(
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
    nextPage,
    canNextPage,
    canPreviousPage,
    previousPage,
    prepareRow,
    pageOptions,
    setGlobalFilter,
    state: { pageIndex, globalFilter },
  } = petTable;


  const handleRowClick = (id) => {
    navigate(`/petrecords/${id}`); 
  };

  return (
    <>
      <Header title='Pet Records' />
      <PRTableNav filter={globalFilter} setFilter={setGlobalFilter} />
      <div className={styles.container}>
        <table {...getTableProps()} className={styles.table}>
          <thead className={styles.thead}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className={styles.tr}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className={styles.th}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className={styles.tbody}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} onClick={() => handleRowClick(row.original.id)} className={styles.tr}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()} className={styles.td}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.pageNav}>
          <button className={styles.previousPage} onClick={previousPage} disabled={!canPreviousPage}>Previous</button>
          <span>{pageIndex + 1} of {pageOptions.length}</span>
          <button className={styles.nextPage} onClick={nextPage} disabled={!canNextPage}>Next</button>
        </div>
      </div>
      <CreatePR styles={{ width: '100%' }} />
    </>
  );
}

export default PRTable;
