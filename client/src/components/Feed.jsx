import React, { useEffect } from 'react'
import Postcard from './Postcard';
import { useDispatch, useSelector } from "react-redux";
import state, { setPost } from '../state';
import { BottomScrollListener } from 'react-bottom-scroll-listener';

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
    <BottomScrollListener onBottom={() => alert("hello")} >
      <div className='columns-6 col-span-4 gap-4 px-6 py-4'>
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
      </div>
    </BottomScrollListener>
  )
}

export default Feed