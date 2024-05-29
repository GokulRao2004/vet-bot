import React, { useEffect } from 'react'
import styles from './StatsGraph.module.css';
import CanvasJSReact from '@canvasjs/react-charts';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
import data from '../../../mockData/petVisitStats.json'

export const StatsGraph = () => {

  const injectStyles = () => {
    const style = document.createElement('style');
    style.innerHTML = `
        .canvasjs-chart-credit {
            display: none !important;
        }
    `;
    document.head.appendChild(style);
  };
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1); // Get yesterday's date
  const yesterdayDateString = yesterday.toISOString().split('T')[0];

  useEffect(() => {
    injectStyles();
  }, []);
  const options = {
    
    animationEnabled: true,
    theme: "light2",
    axisX: {
      title: "Time",
      valueFormatString: "HH:mm"
    },
    axisY: {
      title: "Number of Visitors",
    },
    data: [{
      type: "line",
      dataPoints: data.map(item => ({
        x: new Date(`${yesterdayDateString}T${item.hour}:00`),
        y: item.visitors
      }))
    }],
    toolTip: {
      contentFormatter: e => {
        const time = new Date(e.entries[0].dataPoint.x).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `<strong>${time}</strong><br/>Visitors: ${e.entries[0].dataPoint.y}`;
      }
    }
  };
  return (
    <div className={styles.container}>

      {<CanvasJSChart options={options} containerProps={{ width:'100%' }}/>}
    </div>
  )
}