import React, { useEffect, useState } from 'react'

import { MdPersonSearch } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import Navbar from './components/Navbar';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './config/firebase';
import ContactCard from './components/ContactCard';
import Modal from './components/Modal';
import AddandUpdateContact from './components/AddandUpdateContact';
import useDisclouse from '../hooks/useDisclouse';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from './components/NotFoundContact';

const App = () => {

  const [contacts, setContacts] = useState([]);
  
  const {isOpen,  onClose, onOpen} = useDisclouse();

  useEffect(() => {
    let unsubscribe;

    const getContacts = () => {
      try{
        const contactsRef = collection(db, "contact");
        unsubscribe = onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return{
              id: doc.id, ...doc.data(),
            };
          });
          setContacts(contactList);
        });
      }
      catch(error){
        console.log(error);
      }
    }
    getContacts();

    return () => {
      if(unsubscribe){
        unsubscribe();
      }
    };
  },[])


  const filterContact= (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contact");
    onSnapshot(contactsRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return{
          id: doc.id, ...doc.data(),
        };
      });
      const filteredContacts = contactList.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase()))

      setContacts(filteredContacts);
      return filteredContacts;;
    }
  )};

  return (
    <div className='max-w-[1200px] mx-auto'>
      <Navbar />
      <div className='flex items-center'>
        <div className='mx-4 flex flex-grow relative items-center'>
          <MdPersonSearch className='  text-2xl absolute ml-3 '/>
          <input type='text' placeholder='Search Contact' onChange={filterContact} className=' flex-grow h-12 rounded-md border-2 border-black bg-transparent  pl-11 text-xl '/>
        </div>
        <CiCirclePlus className='mr-4 text-5xl cursor-pointer' onClick={onOpen}/>
      </div>
      <div>
        {contacts.length<=0 ?<NotFoundContact/>: contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact}/>
        ))}
      </div>
      <AddandUpdateContact isOpen={isOpen} onClose={onClose}/>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App


