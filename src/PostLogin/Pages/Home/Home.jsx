import React from 'react'
import Header from '../../Components/Header/Header'
import styles from './Home.module.css'
import { ClinicStats } from '../../Components/clinicStats/clinicStats'
import { Surgeries } from '../../Components/Surgeries/Surgeries'

const Home = () => {
 return (
    <div>
      <Header title="Welcome Dr.Udayaravi Bhat!"/>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <h2>Overview</h2>
          <ClinicStats/>
        </div>
        <div className={styles.subContainer}>
          <h2>Surgeries Scheduled For The Day</h2>
          <Surgeries/>
        </div>

      </div>
    </div>
  )
}

export default Home