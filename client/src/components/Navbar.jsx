import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPage, setLogout, setSearchWord, setDark } from '../state';

const Navbar = () => {
  
  const currPage = useSelector((state) => state.page);
  const dispatch = useDispatch();
  const [searchVal, setVal] = useState("");

  const onKeyUpValue = (e) => {
    if(e.key === "Enter"){
      dispatch(setPage({page: "explore"}))
      dispatch(setSearchWord({ searchWord: searchVal }))
    }
  }

  return (
    <>
      <div className='flex flex-row px-1 sm:px-[2rem] py-[1rem] justify-between' >
        <div className='flex flex-row'>
          <div className='hidden sm:block'>
            <img className="w-[50px] mr-[10px]" src="../images/logo.png" alt="" /> 
          </div>
          <div className={`${currPage=="home" || currPage=="post"?`bg-black text-white`:`bg-white text-black`} 
                          px-[1rem] py-3 text-base rounded-3xl font-medium hover:cursor-pointer`}
               onClick={() => {dispatch(setPage({page: "home"}))}}
          >Home</div>
          <div className={`hidden md:block ${currPage=="explore"?`bg-black text-white`:`bg-white text-black`} 
                          px-[1rem] py-3 text-base rounded-3xl font-medium hover:cursor-pointer`}
               onClick={() => {dispatch(setPage({page: "explore"}))}}
          >Explore</div>
          <div className={`hidden md:block ${currPage=="create"?`bg-black text-white`:`bg-white text-black`} 
                          px-[1rem] py-3 text-base rounded-3xl font-medium hover:cursor-pointer`}
               onClick={() => {dispatch(setPage({page: "create"}))}}
          >Create</div>
          <div className={`hidden md:block ${currPage=="profile"?`bg-black text-white`:`bg-white text-black`} 
                          px-[1rem] py-3 text-base rounded-3xl font-medium hover:cursor-pointer`}
               onClick={() => {dispatch(setPage({page: "profile"}))}}
          >Profile</div>
          <div className={`hidden md:block ${currPage=="saved"?`bg-black text-white`:`bg-white text-black`} 
                          px-[1rem] py-3 text-base rounded-3xl font-medium hover:cursor-pointer`}
               onClick={() => {dispatch(setPage({page: "saved"}))}}
          >Saved</div>
          <div className={`hidden md:block ${currPage=="logout"?`bg-black text-white`:`bg-white text-black`} 
                          px-[1rem] py-3 text-base rounded-3xl font-medium hover:cursor-pointer`}
               onClick={() => {dispatch(setLogout())}}
          >Logout</div>
          
          <div className='px-2'>
            <input  className='py-3 px-6 rounded-3xl bg-[#e9e9e9]' 
                    value={searchVal}
                    onChange={(e) => setVal(e.target.value)}
                    onKeyUp={(e) => onKeyUpValue(e)}
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