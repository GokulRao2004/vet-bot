import React from 'react';
import stats from '../../../mockData/stats.json';
import styles from './clinicStats.module.css'; // Import separate CSS file

export const ClinicStats = () => {
    const renderStats = () => {
        return Object.keys(stats).map((key, index) => {
            const stat = stats[key];
            return (
                <div key={index} className={styles.statBox}>
                    <h3 className={styles.heading}>{key}</h3>
                    <div className={styles.container}>
                        <p className={styles.number}>{stat.total} {stat.duration && <>/</>}{stat.duration}</p>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className={styles.statsContainer}>
            {renderStats()}
        </div>
    );
};
