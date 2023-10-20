import React from 'react'


const Postcard = ({ description, link, picturePath, title, userId, type }) => {

  if(type == "video") return (
    <></>
      // <video className="h-full rounded-xl mb-4" loop autoPlay muted>
      //   <source src={`http://localhost:3001/assets/${picturePath}`} type="video/mp4"/>
      // </video> 
  )
  return (
    <div className=''>
      <img className="mb-11 rounded-xl" src={`http://localhost:3001/assets/${picturePath}`} alt="" /> 
      <div className='mt-[-42px] ml-2 absolute font-semibold'>
        <div>{title}</div>
      </div>
    </div>
  )
}

export default Postcard