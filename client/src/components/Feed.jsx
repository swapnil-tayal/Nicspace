import React, { useEffect } from 'react'
import Postcard from './Postcard';
import { useDispatch, useSelector } from "react-redux";
import { setPost } from '../state';

const shuffle = (array) => { 
  return array.map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value); 
}; 

const Feed = () => {

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  let f = 0;

  const uniqPost = [];
  for(let i=0; i<posts.length; i++){
    let flag = 0;
    for(let j=0; j<uniqPost.length; j++){
      if(uniqPost[j].picturePath === posts[i].picturePath){
        flag = 1;
        break;
      }
    }
    if(flag === 0) uniqPost.push(posts[i]);
  }

  const getUser = async() => {

    if(f == 1) return;
    f = 1;
    const response = await fetch(`http://localhost:3001/posts?page=0` ,{
      method: "GET",
    });
    const data = await response.json();
    const newData = shuffle(data);
    dispatch(setPost({posts: newData}));
  }

  useEffect(() => {
    getUser();
  }, []);

  // console.log(uniqPost);

  return (
      <div className='columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 col-span-4 gap-4 px-6 py-4'>
        {/* <div className='bg-green-500' > */}
          {Array.from(uniqPost).map(({description, link, picturePath, title, userId, type, userDP, name, tag}) => 
            <Postcard 
              key={Math.random()}
              description={description}
              link={link}
              picturePath={picturePath}
              title={title}
              userId={userId}
              type={type}
              userDP={userDP}
              name={name}
              tag={tag}
            />
          )}
      </div>
  )
}

export default Feed