import React, { useState } from 'react'
import { TbUserEdit } from "react-icons/tb";
import { toast } from 'react-toastify';
import Modal from './Modal'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { IoMdPersonAdd } from "react-icons/io";

const AddandUpdateContact = ({isOpen, onClose, isUpdate, contact}) => {

    const addContact = async (contact) => {
        try{
            const contactRef = collection(db,"contact");
            await addDoc(contactRef,contact);
            toast.success("Contact added successfully!");
            setFormData({
                name:"",
                email:"",
            });
        }catch(error){
            console.log(error);
            toast.error("Contact was not added!");
        }
    }

    const updateContact = async (contact,id) => {
        try{
            const contactRef = doc(db,"contact",id);
            await updateDoc(contactRef,contact);
            toast.success("Contact updated successfully!");
            setFormData({
                name:"",
                email:"",
            });
        }catch(error){
            console.log(error);
            toast.error("Failed to update contact!");
        }
    }

    const [formData, setFormData] = useState(isUpdate ? 
        {
            name: contact.name,
            email: contact.email,
        }
        : {
            name: "",
            email: "",
        }
    );

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData, [name] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        isUpdate? updateContact(formData,contact.id) : addContact(formData);

        onClose();


        
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className="flex justify-center gap-2">
                    {isUpdate?<TbUserEdit className="text-2xl"/> :
                    <IoMdPersonAdd className="text-2xl"/>} 
                    <h2 className="font-semibold">{isUpdate? "Update ": "Add "}Contact</h2>
                </div>
                <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2 mt-5'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' value={formData.name} onChange={handleChange} className='border py-2 rounded-md px-2' required/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' value={formData.email} onChange={handleChange} className='border py-2 rounded-md px-2' required/>
                    </div>
                    <button type='submit' className='cursor-pointer bg-medium-blue px-5 py-3 self-end rounded-md mt-2'>{isUpdate? "Update ": "Add "}Contact</button>
                </form>
            </Modal>
        </div>
    )
}

export default AddandUpdateContact