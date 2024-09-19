import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Contacts } from '../../Components/Contacts/Contacts';
import { Chats } from '../../Components/Chats/Chats';
import { useSelector } from 'react-redux';
import { EmbeddedSignUp } from '../../Components/EmbeddedSignUp/EmbeddedSignUp';

export const Whatsapp = () => {
  const url = useParams();
  const name = url.userName;
  const contactId = url.contactId;
  const phone = url.phone;
  const isLoggedIntoWhatsapp = useSelector(state => state.login.isLoggedIntoWhatsapp);
  
  // State to store phone data fetched from Contacts component

  return (
    <>
      {isLoggedIntoWhatsapp ? (
        <div>
          {/* Pass phone to Chats if name exists */}
          {name ? <Chats name={name} contact_id={contactId} phone={phone} /> : <Contacts />}
        </div>
      ) : (
        <EmbeddedSignUp />
      )}
    </>
  );
};
