import React, { useEffect, useState } from 'react'
import { RiContactsBook3Fill } from "react-icons/ri";
import { MdPersonSearch } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { BsPersonFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import Navbar from './components/Navbar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './config/firebase';

const App = () => {

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      try{
        const contactsRef = collection(db, "contact");
        const contactsSnapShot = await getDocs(contactsRef);
        const contactList = contactsSnapShot.docs.map((doc) => {
          return{
            id: doc.id, ...doc.data(),
          };
        });
        setContacts(contactList);
      }
      catch(error){
        console.log(error);
      }
    }
    getContacts();
  },[])

  return (
    <div className='max-w-[1200px] mx-auto'>
      <Navbar />
      <div className='flex items-center'>
        <div className='mx-4 flex flex-grow relative items-center'>
          <MdPersonSearch className='  text-2xl absolute ml-3 '/>
          <input type='text' placeholder='Search Contact' className=' flex-grow h-12 rounded-md border-2 border-black bg-transparent  pl-11 text-xl '/>
        </div>
        <CiCirclePlus className='mr-4 text-5xl cursor-pointer' />
      </div>

      <div>
        {contacts.map((contact) => (
          <div key={contact.id} className='bg-white flex m-4 h-16 items-center rounded-md shadow-md p-2' > 
            <BsPersonFill className='text-4xl mx-2 text-medium-blue'/>
            <div className='flex-grow mx-3'>
              <h2 className='text-base font-semibold'>{contact.name}</h2>
              <p className='text-xs'>{contact.email}</p>
            </div>
            <div className='flex mx-1'>
              <FaEdit className='text-3xl text-yellow-500 mx-2 cursor-pointer'/>
              <FaTrashCan className='text-3xl text-red-600 mx-2 cursor-pointer'/>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default App


{/*<RiContactsBook3Fill size={50}/> */}