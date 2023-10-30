import React, { useEffect, useState } from 'react'
import Postcard from './Postcard';
import { useDispatch, useSelector } from "react-redux";
import { setPost } from '../state';
import { HashLoader } from "react-spinners"

const shuffle = (array) => { 
  return array.map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value); 
}; 

const Feed = () => {

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  const [savedPost, setSavedPost] = useState([]);
  const token = useSelector((state) => state.token)
  const host = useSelector((state) => state.host);
  let f = 0;
  // console.log(token);

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

    if(f === 1) return;
    f = 1;
    const response = await fetch(`http://${host}:3001/posts?page=0` ,{
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    const newData = shuffle(data);
    dispatch(setPost({posts: newData}));
  }

  const getSavedPost = async() => {

    const response = await fetch(`http://${host}:3001/getSaved?userId=${user._id}&full=${0}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    // console.log(data);
    // dispatch(setSavePost({ savePost: data }));
    setSavedPost(data);
  }

  useEffect(() => {
    getUser();
    // console.log("feed");
    getSavedPost();
  }, []);

  // console.log(uniqPost);

  return (
    <div>
      <div className='columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 col-span-4 gap-4 px-6 py-4'>
        {/* <div className='bg-green-500' > */}
          {Array.from(uniqPost).map(({_id, description, link, picturePath, title, userId, type, userDP, name, tag}) => 
            <Postcard 
              key={_id}
              _id={_id}
              description={description}
              link={link}
              picturePath={picturePath}
              title={title}
              userId={userId}
              type={type}
              userDP={userDP}
              name={name}
              tag={tag}
              isSaved={savedPost.includes(_id)}
            />
          )}
      </div>
      
      <div className='h-60 flex flex-col justify-center items-center' >
          <HashLoader color="#000000"/>
      </div> 
    </div>
  )
}

export default Feed