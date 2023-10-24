import React from 'react'
import { useSelector } from 'react-redux';
import Feed from './Feed';
import {useEffect} from 'react';

const Post = () => {

  // useEffect(() => {
  //   // 👇️ scroll to top on page load
  //   console.log("1");
  //   window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  // }, []);

  const currPost = useSelector((state) => state.currPost);
  // console.log(currPost.tag)

  const toTop = () => {
    console.log(1);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }
  
  return (
    <>
    <div className='flex flex-row justify-center' >
      <div className='p-10 rounded-2xl shadow-xl mt-6 flex flex-row justify-center gap-12'>
        <img className="w-80 rounded-xl" src={`http://localhost:3001/assets/${currPost.picturePath}`} alt="" />   
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
                    src={ currPost.userDP === undefined || currPost.userDP === null
                        ? `../images/defaultUserDP.jpg`
                        : `http://localhost:3001/assets/${currPost.userDP}`
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