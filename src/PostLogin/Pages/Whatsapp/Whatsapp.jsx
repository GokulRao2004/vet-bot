import React from 'react'
import { useParams } from 'react-router-dom'
import { Contacts } from '../../Components/Contacts/Contacts';
import { Chats } from '../../Components/Chats/Chats';
import { useSelector } from 'react-redux';
import { EmbeddedSignUp } from '../../Components/EmbeddedSignUp/EmbeddedSignUp';


export const Whatsapp = () => {
  const url = useParams();
  console.log('url: ', url);
  const name = url.userName;
  const phone = url.phone;
  const isLoggedIntoWhatsapp = useSelector(state => state.login.isLoggedIntoWhatsapp)
  console.log('isLoggedIntoWhatsapp: ', isLoggedIntoWhatsapp);

  return (
    <>
      {isLoggedIntoWhatsapp ? (<div>
        {name ? <Chats name={name} phone={phone} /> : <Contacts />}
      </div>) : <EmbeddedSignUp />}
    </>
  )
}
