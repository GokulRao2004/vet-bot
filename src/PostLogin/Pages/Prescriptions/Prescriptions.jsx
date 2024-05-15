import React from 'react'
import { CreatePrescriptions } from '../../Components/CreatePrescriptions/CreatePrescriptions'
import Header from '../../Components/Header/Header'

export const Prescriptions = () => {
  return (
    <div>
      <Header title='Create Prescription'/>
      <CreatePrescriptions/>
    </div>
  )
}
