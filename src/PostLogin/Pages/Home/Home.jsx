import React from 'react'
import Header from '../../Components/Header/Header'
import styles from './Home.module.css'
import { ClinicStats } from '../../Components/clinicStats/clinicStats'
import { Surgeries } from '../../Components/Surgeries/Surgeries'
import { StatsGraph } from '../../Components/StatsGraph/StatsGraph'
import { StatsPie } from '../../Components/StatsPie/StatsPie'

const Home = () => {
  return (
    <div>
      <Header title="Welcome Dr.Udayaravi Bhat!" />
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <h2>Overview</h2>
          <ClinicStats />
        </div>
        <div className={styles.subContainer}>
          <h2>Surgeries Scheduled For The Day</h2>
          <Surgeries />
        </div>
        <div>

          <div className={styles.statsContainer}>
            <div className={`${styles.graph} ${styles.backgroundContainer}`}>
              <h2 className={styles.heading}>Pet Visit Statistics</h2>
              <StatsGraph />
            </div>
            <div className={`${styles.graph1} ${styles.backgroundContainer}`}>
              <h2 className={styles.heading}>Type of Animals</h2>
              <StatsPie />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home