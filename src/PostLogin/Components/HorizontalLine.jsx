import React from 'react'

export const HorizontalLine = ({width,color}) => {

  return (
    <div style={{width:width, backgroundColor: color , height: '1.5px', marginTop: "10px" , marginBottom: "20px", marginLeft:'auto', marginRight: 'auto'}}></div>
  )
}
