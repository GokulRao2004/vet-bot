import React from 'react'
import { useParams } from 'react-router-dom'
import { Contacts } from '../../Components/Contacts/Contacts';

export const Whatsapp = () => {
    const url = useParams();
    const name = url.userName;
    console.log('name: ', url.userName);

  return (
    <div>
      {name ? <div>"hello"</div> : <Contacts/>}
    </div>
  )
}
