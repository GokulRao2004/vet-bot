import React from 'react'
import styles from './StatsPie.module.css'
import data from '../../../mockData/typeOfPetVisits.json'
import { Chart } from "react-google-charts"

export const StatsPie = () => {
    const options = {
        is3D: true
    }

    const data = [
        ["Type", "Number of Visits"],
        ["cats", 30],
        ["dogs", 50],
        ["birds", 5],
        ["others", 10]
    ]
    return (
        <Chart
            chartType='PieChart'
            data={data}
            options={options}
            width={"100%"}
            height={"530px"}
        />
    )
}
