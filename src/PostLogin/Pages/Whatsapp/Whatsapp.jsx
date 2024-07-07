import React from 'react'
import { useParams } from 'react-router-dom'
import { Contacts } from '../../Components/Contacts/Contacts';
import { Chats } from '../../Components/Chats/Chats';

export const Whatsapp = () => {
    const url = useParams();
    const name = url.userName;
    console.log('name: ', url.userName);

  return (
    <div>
      {name ? <Chats name={name}/> : <Contacts/>}
    </div>
  )
}
