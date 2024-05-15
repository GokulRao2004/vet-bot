import React from 'react'
import Header from '../../Components/Header/Header'
import styles from './Home.module.css'

const Home = () => {

 return (
    <div>
      <Header title="Welcome Dr.Udayaravi Bhat!"/>
      <div className="container">
        <div className={styles.overview}>
          <h2>Overview</h2>
        </div>

      </div>
    </div>
  )
}

export default Home