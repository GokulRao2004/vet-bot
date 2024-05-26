import React, { useMemo } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import mockDataPR from "../../../mockData/mockDataPR.json"
import { useParams } from 'react-router-dom';
import styles from "./ViewPrescription.module.css";
import { getImageUrl } from '../../../utils'
import { VerticalLine } from '../VerticalLine'
import { useTable } from 'react-table';


export const ViewPrescription = () => {
  const ID = useParams()
  const Data = mockDataPR.filter(item => item.id === parseInt(ID.id));


  if(!Data[0].prescriptions){
    return <div style={{display:"flex", width: "100%", justifyContent:"center", fontSize:"22px", padding:"10px"}}>
    Oops no record found ! </div>
  }

  const COLUMNS = [
    { accessor: "medicine", Header: 'Medicine' },
    { accessor: "dose", Header: 'Dose' },
    { accessor: "route", Header: 'Route' },
    { accessor: "frequency", Header: 'Frequency' },
    { accessor: "duration", Header: 'Duration' }
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => Data[0].prescriptions, [Data]);

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
    <div className={styles.container} id="prescriptions">
      {Data[0].prescriptions ? <Accordion allowZeroExpanded allowMultipleExpanded className={styles.accordian}>
        {Data[0].prescriptions.map((item, index) => (
          <AccordionItem key={index} >
            <AccordionItemHeading className={styles.accordianHeading}>
              <AccordionItemButton className={styles.accordianClosed}>
                <div className={styles.AccordianLeft}>
                  Cause of Visit : {item.diagnosis}
                </div>
                <div className={styles.AccordianRight}>
                  Date of Visit : {item.date}
                </div>

              </AccordionItemButton>
            </AccordionItemHeading>

            <AccordionItemPanel className={styles.panel}>
              <div className={styles.line}></div>
              <div className={styles.accordianOpen}>
                <div className={styles.accordianContainerLeft}>
                  <div>
                    <div className={styles.logo}>
                      <img src={getImageUrl('Dashboard/CreatePrescription/presc.png')} alt="" />
                    </div>
                    <div className={styles.complaints}>Complaints : {item.complaints}</div>
                    <div className={styles.Diagnosis}>Diagnosis : {item.diagnosis}</div>
                    <div className={styles.tests}>Tests : {item.tests && item.tests || "NA"} </div>
                    <div className={styles.followUp}>Follow-Up : {item.followUp && item.followUp || "NA"}</div>
                  </div>
                  <div style={{ display: "flex", width: "2px", backgroundColor: "darkgray", maxHeight: "calc(100% + 400px)", marginLeft: "10px", marginRight: "10px", zIndex: "3", }}></div>
                </div>

                
                <div className={styles.accordianContainerRight}>
                  <div style={{ fontSize: "18px", paddingTop: "10px" }}>Medications</div>
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

                      <tbody className={styles.tbody}>
                        {item.prescription.map((medicine, medIndex) => (
                          <tr key={medIndex} className={styles.tr}>
                            <td className={styles.td}>{medicine.medicine}</td>
                            <td className={styles.td}>{medicine.dose}</td>
                            <td className={styles.td}>{medicine.route}</td>
                            <td className={styles.td}>{medicine.frequency}</td>
                            <td className={styles.td}>{medicine.duration}</td>
                          </tr>
                        ))}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>)
        )}
      </Accordion> : "No Records Found"}
    </div>
  )
}
