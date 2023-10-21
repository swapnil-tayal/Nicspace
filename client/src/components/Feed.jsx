import React, { useEffect } from 'react'
import Postcard from './Postcard';
import { useDispatch, useSelector } from "react-redux";
import state, { setPost } from '../state';

const shuffle = (array) => { 
  return array.map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value); 
}; 

const Feed = () => {

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  let f = 0;

  const getUser = async() => {
    if(f == 1) return;
    f = 1;
    const response = await fetch('http://localhost:3001/posts' ,{
      method: "GET",
    });
    const data = await response.json();
    const newData = shuffle(data);
    dispatch(setPost({posts: newData}));
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className='columns-6 col-span-4 gap-4 p-6'>
      {/* <div className='bg-green-500' > */}
        {Array.from(posts).map(({description, link, picturePath, title, userId, type, userDP, name}) => 
          <Postcard 
            key={picturePath}
            description={description}
            link={link}
            picturePath={picturePath}
            title={title}
            userId={userId}
            type={type}
            userDP={userDP}
            name={name}
          />
        )}
      {/* </div> */}

      {/* <video className="h-full rounded-xl mb-4" loop autoPlay muted>
        <source src="../images/temp/31.mp4" type="video/mp4"/>
      </video> */}
      {/* <img className="h-full rounded-xl mb-4" src="../images/temp/1.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/2.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/3.jpeg" alt="" />  */}
      {/* <video className="h-full rounded-xl mb-4" loop autoPlay muted>
        <source src="../images/temp/34.mp4" type="video/mp4"/>
      </video>
      {/* <img className="h-full rounded-xl mb-4" src="../images/temp/4.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/5.jpeg" alt="" />  */}
      {/* <video className="h-full rounded-xl mb-4" loop autoPlay muted>
        <source src="../images/temp/32.mp4" type="video/mp4"/>
      </video> */}
      {/* <img className="h-full rounded-xl mb-4" src="../images/temp/6.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/7.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/8.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/10.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/11.jpeg" alt="" />  */}
      {/* <video className="h-full rounded-xl mb-4" loop autoPlay muted>
        <source src="../images/temp/33.mp4" type="video/mp4"/>
      </video> */}
      {/* <img className="h-full rounded-xl mb-4" src="../images/temp/12.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/13.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/14.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/15.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/16.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/17.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/18.jpeg" alt="" />  */}
      {/* <video className="h-full rounded-xl mb-4" loop autoPlay muted>
        <source src="../images/temp/35.mp4" type="video/mp4"/>
      </video> */}
      {/* <img className="h-full rounded-xl mb-4" src="../images/temp/19.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/20.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/21.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/22.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/23.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/24.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/25.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/26.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/27.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/28.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/29.jpeg" alt="" /> 
      <img className="h-full rounded-xl mb-4" src="../images/temp/30.jpeg" alt="" />  */} 
    </div>
  )
}

export default Feed