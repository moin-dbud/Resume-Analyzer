import React, { useState } from 'react'
import { MenuIcon, XIcon } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { Link, Links } from 'react-router-dom';

const Navabr = () => {

    const[isOpen, setIsOpen] = useState(false)

    const {user} = useUser()
    const {openSignIn} = useClerk()

  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-10 lg:px-36 py-5'  >
        <h1 className='text-3xl font-bold text-gray-800 cursor-pointer  max-sm:text-2xl max-md:flex-1 w-auto h-auto' >Resume Audit</h1>
        <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-9 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-500 overflow-hidden transition-[width] duration-350  ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`} >
            <XIcon className='md:hidden absolute top-6 right-6  w-6 h-6 cursor-pointer' onClick={()=>setIsOpen(!isOpen)} />

            <a href="#upload" onClick={() => setIsOpen(false)} className="cursor-pointer hover:text-blue-600 transition" >Analyze Resume</a>
            <a href="#how-it-works" onClick={() => setIsOpen(false)} className="cursor-pointer hover:text-blue-600 transition" >How It Works</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="cursor-pointer hover:text-blue-600 transition" >Contact Us</a>
            <Link to="/about-us"  className="hover:text-blue-600 transition">About US</Link>

            </div>

            <div className='flex items-center gap-3' >
                {
            !user ? (
                <button onClick={openSignIn} className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer text-xl ' >Login</button>
            ) : (

               <div className='flex items-center gap-3 ' >
                <Link to={'/history'}>History</Link>
                <p>|</p>
                <p className='max-sm:hidden' >Hi, {user.firstName+" "+user.lastName}</p>
                 <UserButton/>
               </div>
            )
        }
            </div>



            <MenuIcon className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer' onClick={()=>setIsOpen(!isOpen)}  />
        
    </div>
  );
}

export default Navabr
