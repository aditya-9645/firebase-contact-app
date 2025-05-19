import { deleteDoc, doc } from "firebase/firestore";
import { BsPersonFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { db } from "../config/firebase";
import { useState } from "react";
import useDisclouse from "../../hooks/useDisclouse";
import AddandUpdateContact from "./AddandUpdateContact";
import { toast } from "react-toastify";

const ContactCard = ({contact}) => {
  
  const {isOpen, onClose, onOpen} = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db,"contact", id));
      toast.success("Contact deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Couldn't delete contact! Error!");
    }
  };


  return (
    <>
    
    <div key={contact.id} className='bg-white flex m-4 h-16 items-center rounded-md shadow-md p-2' > 
        <BsPersonFill className='text-4xl mx-2 text-medium-blue'/>
        <div className='flex-grow mx-3'>
            <h2 className='text-base font-semibold'>{contact.name}</h2>
            <p className='text-xs'>{contact.email}</p>
        </div>
        <div className='flex mx-1'>
            <FaEdit onClick={onOpen} className='text-3xl text-yellow-500 mx-2 cursor-pointer'/>
            <FaTrashCan onClick={() => deleteContact(contact.id)} className='text-3xl text-red-600 mx-2 cursor-pointer'/>
        </div>
    </div>
    <AddandUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose}/>
    </>
  )
}

export default ContactCard