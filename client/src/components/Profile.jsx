import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

  const user = useSelector((state) => state.user);
  const [isSaved, setIsSaved] = useState(true);

  return (
    <div>

      <div className='mt-4 flex flex-col items-center'>
        <img className='h-32 rounded-full' src={`http://localhost:3001/assets/${user.picturePath}`} />
        <div className='mt-2 font-semibold text-4xl' > {user.name} </div>
        <div className='mt-2 font-light' >{user.email}</div>
        <div className='flex flex-row gap-2 mt-4'>
          <div className='bg-[#e9e9e9] text-base font-medium px-4 py-3 rounded-3xl'> Share </div>
          <div className='bg-[#e9e9e9] text-base font-medium px-4 py-3 rounded-3xl'> Edit Profile </div>
        </div>
      </div>

      <div className='flex flex-row justify-center gap-8 mt-14'>
        <div className='font-semibold hover:cursor-pointer' onClick={() => setIsSaved(!isSaved)}> 
          Created 
          {!isSaved && <div className='mt-2 w-[100%] h-[3px] bg-black'></div>}
        </div>
        <div className='font-semibold hover:cursor-pointer' onClick={() => setIsSaved(!isSaved)}>
          Saved
          {isSaved && <div className='mt-2 w-[100%] h-[3px] bg-black'></div>}
        </div>
      </div>

    </div>
  )
}

export default Profile