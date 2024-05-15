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
import styles from "./ViewReports.module.css";
import { getImageUrl } from '../../../utils'
import { useTable } from 'react-table';

export const ViewReports = () => {
  const ID = useParams()
  const Data = mockDataPR.filter(item => item.id === parseInt(ID.id));

  return (
    <div className={styles.container}>
      <Accordion allowZeroExpanded allowMultipleExpanded className={styles.accordian}>
        
          <AccordionItem >
            <AccordionItemHeading className={styles.accordianHeading}>
              <AccordionItemButton className={styles.accordianClosed}>
                <div className={styles.AccordianLeft}>
                  
                </div>
                <div className={styles.AccordianRight}>
                   Date :
                   {Data[0].tests.map((test,i) => {
                    return <>{test.date}</>
                  })}
                  
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
                    
                  </div>
                  <div style={{ display: "flex", width: "2px", backgroundColor: "darkgray", maxHeight: "calc(100% + 400px)", marginLeft: "10px", marginRight: "10px", zIndex: "3", }}></div>
                </div>

                
                <div className={styles.accordianContainerRight}>
                  
                  
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        
      </Accordion>
    </div>
  )
}
