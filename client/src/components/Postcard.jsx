import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrPost, setPage } from '../state';
import linkImg from "../images/link.png"
import { useNavigate } from "react-router-dom";

const Postcard = ({ _id, description, link, picturePath, title, userId, type, userDP, name, tag, isSaved }) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [isDisplay, setDisplay] = useState(false);
  const [isSelected, setIsSelected] = useState(isSaved);
  const [key, setKey] = useState(0);
  const host = useSelector((state) => state.host);
  const navigate = useNavigate();
  
  if(isSaved && key < 2){
    setIsSelected(isSaved);
    setKey((k) => k + 1);
  }

  const savePostFun = async(e) => {

    e.stopPropagation();
    setIsSelected(!isSelected);
    try{
      const response = await fetch(`${host}/save?userId=${user._id}&postId=${_id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json(); 
      if(data.message === "Post saved successfully"){
        // console.log("un/saved");
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
    navigate('/postPage')
    dispatch(
      setCurrPost({
        currPost: data
      })
    )
  };

  if(userDP === "undefined"){
    userDP = null;
  }
  if(type === "video") return (
    <>
      <video className="mb-11 rounded-xl" loop autoPlay muted>
        <source src={`https://firebasestorage.googleapis.com/v0/b/nicterest.appspot.com/o/${picturePath}?alt=media`} type="video/mp4"/>
      </video> 
      <div className={`mt-[-42px] ml-2 absolute font-semibold`}>
        <div>{title}</div>
      </div>
    </> 
  )

  return (
    <>
    <div className='hover:cursor-zoom-in' onClick={() => postPage()} onMouseEnter={() => {setDisplay(true)}} onMouseLeave={() => setDisplay(false)}>

      <img  className={`${!isDisplay ? '' : 'brightness-[0.75]'} ${userDP ? 'mb-[75px]' : 'mb-11'} rounded-xl`} 
            src={`https://firebasestorage.googleapis.com/v0/b/nicterest.appspot.com/o/${picturePath}?alt=media`} 
            alt="" />   
      <div className={`${isDisplay ? 'flex' : 'hidden'} ${userDP ? 'mt-[-123px]' : 'mt-[-90px]'} gap-1 ml-[3px] absolute`}>
        <div
          onClick={(e) => savePostFun(e)} 
          className={`${!isSelected ? 
                     'z-30 bg-red-600 ml-1 px-3 py-2 rounded-3xl block text-white hover:cursor-pointer' :
                     'z-30 bg-black ml-1 px-3 py-2 rounded-3xl block text-white hover:cursor-pointer' } 
                    `}>{!isSelected ? "Save" : "Saved"}</div>
        { 
          link &&
         <img 
            onClick={(e) => {window.location.href = `${link}`; e.stopPropagation()}} 
            className="mt-[0.15rem] bg-white rounded-full h-[35px] p-[0.5rem] opacity-80 hover:cursor-pointer" 
            src={linkImg}
            alt="" 
          />
        }
      </div>
      <div className={`${userDP ? 'mt-[-70px]': 'mt-[-42px]'} ml-2 absolute font-semibold`}>
        <div>{title}</div>
        {(userDP && userDP !== "undefined_undefined") && (
          <>
            <img className="w-[35px] h-[35px] rounded-full" src={`https://firebasestorage.googleapis.com/v0/b/nicterest.appspot.com/o/${userDP}?alt=media`} alt="" /> 
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