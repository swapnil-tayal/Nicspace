import React, { useEffect } from 'react'
import Feed from './Feed';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../state';
import backArrow from "../images/backArrow.png"
import defaultDP from "../images/defaultUserDP.jpg"
import { useNavigate } from "react-router-dom";

const Post = () => {

  const currPost = useSelector((state) => state.currPost);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toTop = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }
  
  useEffect(() => {
    toTop();
  }, [])

  return (  
    <>
    <img 
      alt="de"
      onClick={() => {dispatch(setPage({page: "home"})); navigate('/home')}}
      className='w-[50px] ml-12 mt-10 hover:bg-[#e9e9e9] p-4 rounded-full absolute hidden lg:block' 
      src={backArrow} ></img>
      
    <div className='flex flex-row justify-center' >
      <div className='p-10 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-6 flex flex-col md:flex-row justify-center gap-12'>
        <img 
          className="max-w-md rounded-xl" 
          src={`https://firebasestorage.googleapis.com/v0/b/nicterest.appspot.com/o/${currPost.picturePath}?alt=media`} 
          alt="" 
        />   
        <div className='w-72 mt-10 flex flex-col gap-3'>
          { currPost.link && <div className='underline' > {currPost.link} </div> }
          <div className='flex flex-row items-center justify-between'>
            <div className='mb-4 text-3xl font-semibold' >{ currPost.title }</div>
            <div className='bg-red-600 ml-1 px-3 py-2 rounded-3xl block text-white'>Save</div>
          </div>
          <div className='mb-4 text-base font-normal' >{ currPost.description }</div>
          <div className='flex flex-row items-center justify-between' >
            <div className='flex flex-row items-center' >
              <img  className='w-[50px] mr-3 rounded-full inline-block' 
                    alt=''
                    src={ (currPost.userDP === undefined || currPost.userDP === null || currPost.userDP === "undefined_undefined")
                        ? `${defaultDP}`
                        : `https://firebasestorage.googleapis.com/v0/b/nicterest.appspot.com/o/${currPost.userDP}?alt=media`
                      } 
              ></img>
              <p className='font-semibold' > {currPost.name} </p>
            </div>
            <div className='bg-red-600 ml-1 px-3 py-2 rounded-3xl block text-white'>Follow</div>
          </div>
          <div>
            {currPost.tag &&
              currPost.tag.map((tag) => <p className='inline mr-2' key={Math.random()} >{tag}</p>)
            }
          </div>
        </div>
      </div>
    </div>
    <div onClick={() => toTop()}>
      <div className='flex flex-row justify-center mt-10 mb-4 font-semibold text-2xl' >More to explore</div>
      <Feed />
    </div>
    </>
  )
}

export default Post;