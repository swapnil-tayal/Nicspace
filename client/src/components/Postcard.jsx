import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrPost, setPage } from '../state';

const Postcard = ({ _id, description, link, picturePath, title, userId, type, userDP, name, tag }) => {

  if(picturePath === "undefined") return;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // console.log(user);

  const [isDisplay, setDisplay] = useState(false);

  const savePost = async(e) => {
    e.stopPropagation();
    try{
      const response = await fetch(`http://localhost:3001/save?userId=${user._id}&postId=${_id}`, {
        method: "POST",
      })
      const data = await response.json(); 
      if(data.message === "Post saved successfully"){
        console.log("saved");
      }

    }catch(e){
      console.log(e);
    }
  }

  const postPage = () => {
    const data = {
      description: description,
      link: link,
      picturePath: picturePath,
      title: title,
      userId: userId,
      type: type,
      userDP: userDP,
      name: name,
      tag: tag,
      _id: _id
    };
    dispatch(setPage({page: "post"}))
    dispatch(
      setCurrPost({
        currPost: data
      })
    )
  };

  if(userDP === "undefined"){
    userDP = null;
  }
  if(type == "video") return (
    <>
      <video className="mb-11 rounded-xl" loop autoPlay muted>
        <source src={`http://localhost:3001/assets/${picturePath}`} type="video/mp4"/>
      </video> 
      <div className='mt-[-42px] ml-2 absolute font-semibold'>
        <div>{title}</div>
        {userDP && (
          <>
            <img className="w-[35px] h-[35px] rounded-full" src={`http://localhost:3001/assets/${userDP}`} alt="" /> 
            <div className='ml-[40px] mt-[-30px] font-normal' >User {name}</div>
          </> 
        )}
      </div>
    </> 
  )
  return (
    <>
    <div onClick={() => postPage()} onMouseEnter={() => setDisplay(true)} onMouseLeave={() => setDisplay(false)}>

      <img className={`${!isDisplay ? '' : 'brightness-[0.75]'} ${userDP ? 'mb-[75px]' : 'mb-11'} rounded-xl`} src={`http://localhost:3001/assets/${picturePath}`} alt="" />   
      <div className={`${isDisplay ? 'flex' : 'hidden'} ${userDP ? 'mt-[-123px]' : 'mt-[-90px]'} gap-1 ml-[3px] absolute`}>
        <div
          onClick={(e) => savePost(e)} 
          className='z-30 bg-red-600 ml-1 px-3 py-2 rounded-3xl block text-white'>Save</div>
        { 
          link &&
         <img 
            onClick={(e) => {window.location.href = `${link}`; e.stopPropagation()}} 
            className="mt-[0.15rem] bg-white rounded-full h-[35px] p-[0.5rem] opacity-80" 
            src="../images/link.png" 
            alt="" 
          />
        }
      </div>
      <div className={`${userDP ? 'mt-[-70px]': 'mt-[-42px]'} ml-2 absolute font-semibold`}>
        <div>{title}</div>
        {userDP && (
          <>
            <img className="w-[35px] h-[35px] rounded-full" src={`http://localhost:3001/assets/${userDP}`} alt="" /> 
            <div className='ml-[40px] mt-[-30px] font-normal' >{name}</div>
          </> 
        )}
      </div>
    </div>
    </>
  )
}

// mt-[-70]
// mb-[75px]

export default Postcard