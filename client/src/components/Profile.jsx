import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Postcard from './Postcard';
import { HashLoader } from "react-spinners"

const Profile = () => {

  const user = useSelector((state) => state.user);
  const [isSaved, setIsSaved] = useState(true);
  const [savedPost, setSavedPost] = useState([]);
  const [myPosts, setMyPosts] = useState([]);

  const getSavedPost = async() => {
    const response = await fetch(`http://localhost:3001/getSaved?userId=${user._id}&full=${1}`, {
      method: "GET",
    });
    const data = await response.json();
    setSavedPost(data);
  }
  const getCreatedPosts = async() => {
    const response = await fetch(`http://localhost:3001/getCreated?userId=${user._id}`, {
      method: "GET",
    });
    const data = await response.json();
    setMyPosts(data);
  }

  useEffect(() => {
    getSavedPost();
    getCreatedPosts();
  }, [])


  return (
    <div>

      <div className='mt-4 flex flex-col items-center'>
        {user.picturePath 
          ? <img className='h-32 rounded-full' src={`http://localhost:3001/assets/${user.picturePath}`} />
          : <img className='h-32 rounded-full' src='../images/defaultUserDP.jpg'/>
        }
        <div className='mt-2 font-semibold text-4xl' > {user.name} </div>
        <div className='mt-2 font-light' >{user.email}</div>
        <div className='flex flex-row gap-2 mt-4'>
          <div className='bg-[#e9e9e9] hover:cursor-pointer text-base font-medium px-4 py-3 rounded-3xl'>
            Share 
          </div>
          <div className='bg-[#e9e9e9] hover:cursor-pointer text-base font-medium px-4 py-3 rounded-3xl'>
            Edit Profile
          </div>
        </div>
      </div>

      <div className='flex flex-row justify-center gap-8 mt-14'>
        <div className='font-semibold hover:cursor-pointer' onClick={() => setIsSaved(!isSaved)}> 
          Created 
          {!isSaved && <div className='mt-2 w-[100%] h-[3px] bg-black'></div>}
        </div>
        <div className='font-semibold hover:cursor-pointer' onClick={() => setIsSaved(!isSaved)}>
          Saved
          {isSaved && <div className='mt-2 w-[100%] h-[3px] bg-black'></div>}
        </div>
      </div>
      { isSaved ? 

        savedPost.length == 0 ?

          <div className='h-60 flex flex-col justify-center items-center' >
            <HashLoader color="#000000"/>
          </div> 
          :
          <div className='mt-6 columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 col-span-4 gap-4 px-6 py-4'>
              {Array.from(savedPost).map(({_id, description, link, picturePath, title, userId, type, userDP, name, tag}) => 
                <Postcard 
                  key={Math.random()}
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
                  isSaved={1}
                />
              )}
          </div>
        :
        myPosts.length == 0 ?
          <div className='h-60 flex flex-col justify-center items-center' >
            <HashLoader color="#000000"/>
          </div> 
          :
          <div className='mt-6 columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 col-span-4 gap-4 px-6 py-4'>
              {Array.from(myPosts).map(({_id, description, link, picturePath, title, userId, type, userDP, name, tag}) => 
                <Postcard 
                  key={Math.random()}
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
                  isSaved={0}
                />
              )}
          </div>
      }
    </div>
  )
}

export default Profile