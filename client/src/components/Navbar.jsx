import React from 'react'

const Navbar = () => {
  return (
    <>
      <div className='flex flex-row px-1 sm:px-[2rem] py-[1rem] justify-between' >
        <div className='flex flex-row'>
          <div className='hidden sm:block'>
            <img className="w-[50px] mr-[10px]" src="../images/logo.png" alt="" /> 
          </div>
          <div className='bg-black text-white px-[1rem] py-3 text-base rounded-3xl font-medium'>Home</div>
          <div className='hidden md:block bg-white text-black px-[1rem] py-3 text-base rounded-3xl font-medium'>Explore</div>
          <div className='hidden md:block bg-white text-black px-[1rem] py-3 text-base rounded-3xl font-medium'>Create</div>
          <div className='hidden lg:block bg-white text-black px-[1rem] py-3 text-base rounded-3xl font-medium'>Profile</div>
          <div className='hidden lg:block bg-white text-black px-[1rem] py-3 text-base rounded-3xl font-medium'>To Dark</div>
          <div className='hidden lg:block bg-white text-black px-[1rem] py-3 text-base rounded-3xl font-medium'>Saved</div>
          
          <div className='px-2'>
            <input className='py-3 px-6 rounded-3xl bg-[#e9e9e9]' 
                    placeholder="Search" />
          </div>
        </div>
        <div className='hidden sm:flex sm:flex-row bg-white'>
          <img className="mt-[6px] h-[40px]" src="../images/chat-icon.png" alt="" /> 
          <img className="mt-[6px] h-[40px]" src="../images/notification-icon.png" alt="" /> 
          <img className="mt-[6px] h-[40px]" src="../images/chat-icon.png" alt="" /> 
        </div>
      </div>
    </>
  )
}

export default Navbar