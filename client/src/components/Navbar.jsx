import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setPage, setLogout, setSearchWord } from '../state';
import logo from "../images/logo3.png"
import defaultUserDP from '../images/defaultUserDP.jpg' 
import notificationicon from "../images/notification-icon.png"
import chatIcon from "../images/chat-icon.png"

const Navbar = () => {
  
  const currPage = useSelector((state) => state.page);
  const dispatch = useDispatch();
  const [searchVal, setVal] = useState("");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const onKeyUpValue = (e) => {
    if(e.key === "Enter"){
      console.log("first");
      dispatch(setPage({page: "explore"}))
      dispatch(setSearchWord({ searchWord: searchVal }))
      navigate('/explore')
    }
  }


  return (
    <>
      <div className='flex flex-row px-1 sm:px-[2rem] py-[1rem] justify-between' >
        <div className='flex flex-row'>
          <div className='hidden md:block'>
            <img className="w-[50px] mr-[10px]" src={logo} alt="" /> 
          </div>
          <div className={`${currPage=="home" || currPage=="post"?`bg-black text-white`:`bg-white text-black`} 
                          px-[1rem] py-3 text-base rounded-3xl font-medium hover:cursor-pointer`}
               onClick={() => {
                dispatch(setPage({page: "home"}))
                navigate("/home")
              }}
          >Home</div>
          <div className={`hidden md:block ${currPage=="explore"?`bg-black text-white`:`bg-white text-black`} 
                          px-[1rem] py-3 text-base rounded-3xl font-medium hover:cursor-pointer`}
               onClick={() => {
                dispatch(setPage({page: "explore"}))
                navigate("/explore")
              }}
          >Explore</div>
          <div className={`hidden md:block ${currPage=="create"?`bg-black text-white`:`bg-white text-black`} 
                          px-[1rem] py-3 text-base rounded-3xl font-medium hover:cursor-pointer`}
               onClick={() => {
                dispatch(setPage({page: "create"}))
                navigate("/create")
              }}
          >Create</div>
          <div className={`hidden md:block ${currPage=="profile"?`bg-black text-white`:`bg-white text-black`} 
                          px-[1rem] py-3 text-base rounded-3xl font-medium hover:cursor-pointer`}
               onClick={() => {
                dispatch(setPage({page: "profile"}))
                navigate("/profile")
              }}
          >Profile</div>
          <div className={`hidden md:block ${currPage=="saved"?`bg-black text-white`:`bg-white text-black`} 
                          px-[1rem] py-3 text-base rounded-3xl font-medium hover:cursor-pointer`}
               onClick={() => {
                dispatch(setPage({page: "saved"}))
                navigate("/saved")
              }}
          >Saved</div>
          <div className={`hidden md:block ${currPage=="logout"?`bg-black text-white`:`bg-white text-black`} 
                          px-[1rem] py-3 text-base rounded-3xl font-medium hover:cursor-pointer`}
               onClick={() => {
                dispatch(setLogout())
                navigate("/")
              }}
          >Logout</div>
          
          <div className='px-2'>
            <input  className='py-3 px-6 rounded-3xl bg-[#e9e9e9]' 
                    value={searchVal}
                    onChange={(e) => setVal(e.target.value)}
                    onKeyUp={(e) => onKeyUpValue(e)}
                    placeholder="Search" 
                    />
          </div>
        </div>
        <div className='flex flex-row sm:items-center bg-white'>
          <img className="sm:block hidden h-[40px]" src={chatIcon} alt="" /> 
          <img className="sm:block hidden h-[40px]" src={notificationicon} alt="" /> 
          {(user.picturePath && user.picturePath != "undefined_undefined")
            ? <img 
                  onClick={() => {dispatch(setPage({page: "profile"}))}}
                  className='h-[40px] rounded-full' 
                  src={`https://firebasestorage.googleapis.com/v0/b/nicterest.appspot.com/o/${user.picturePath}?alt=media`} />
            : <img 
                  onClick={() => {dispatch(setPage({page: "profile"}))}}
                  className='h-[40px] rounded-full' 
                  src={defaultUserDP}/>
          }
        </div>
      </div>
    </>
  )
}

export default Navbar