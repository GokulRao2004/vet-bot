import React, { useMemo } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import mockDataPR from "../../../mockData/mockDataPR.json"
import { useParams, useNavigate } from 'react-router-dom';
import styles from "./ViewReports.module.css";
import { getImageUrl } from '../../../utils'
import { useTable } from 'react-table';

export const ViewReports = () => {
  const ID = useParams()
  console.log('ID: ', ID);
  const Data = mockDataPR.filter(item => item.id === parseInt(ID.id));
  const navigate = useNavigate();
  return (
    <div className={styles.container} id='reports'>
      {Data[0].tests.map((test, i) => {
        return <div key={i}>
          <Accordion allowZeroExpanded allowMultipleExpanded className={styles.accordian}>
            <AccordionItem >
              <AccordionItemHeading className={styles.accordianHeading}>
                <AccordionItemButton className={styles.accordianClosed}>
                  <div className={styles.AccordianLeft}>
                    Test Date : {test.date}
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>

              <AccordionItemPanel className={styles.panel}>
                {/* <div className={styles.line}></div> */}
                <div className={styles.accordianOpen}>
                  <div className={styles.accordianContainerLeft}>
                    <div>
                      <div className={styles.logo}>
                        <img src={getImageUrl('Dashboard/CreatePrescription/presc.png')} alt="" />
                      </div>
                      <div className={styles.tests}>
                        Tests : &nbsp;
                        {test.name.map((testItem, i) => (
                          <div key={i} className={styles.testNames}>
                            {Object.entries(testItem).map(([testType], j) => (
                              <div key={j}>
                                {testType}
                              </div>
                            ))}
                          </div>
                        ))
                        }
                      </div>
                    </div>
                    <div style={{ display: "flex", width: "2px", backgroundColor: "darkgray", maxHeight: "calc(100% + 400px)", marginLeft: "10px", marginRight: "10px", zIndex: "3", marginBottom: "10px" }}></div>
                  </div>


                  <div className={styles.accordianContainerRight}>
                    {test.name.map((testItem, i) => (
                      <div key={i} className={styles.reports}>
                        {Object.entries(testItem).map(([testType, reportLink], j) => (
                          <div key={j}>
                            <div className={styles.pdfOuterContainer} onClick={()=>{navigate(`/petrecords/${ID.id}/reports/${reportLink}`);}}>
                              <div className={styles.pdfContainer}></div>
                              <div className={styles.reportText} data-tooltip={testType}><div>{testType}</div></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                    }

                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>

          </Accordion></div>
      })}
    </div>
  )
}
