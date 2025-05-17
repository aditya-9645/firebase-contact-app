import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-medium-blue h-[80px] m-4 flex rounded-lg justify-center items-center gap-4 text-xl font-medium shadow-lg'>
        <img src="/public/images/logo.png" alt="logo" />
        <h1 className='text-white font-bold text-2xl'>Firebase Contact App</h1>
    </div>
  )
}

export default Navbar