import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Postcard from './Postcard';
import { HashLoader } from "react-spinners"
import { setPage } from '../state';

const Profile = () => {

  const user = useSelector((state) => state.user);
  const [isSaved, setIsSaved] = useState(true);
  const [savedPost, setSavedPost] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [anyPost, setAnyPost] = useState(true);
  const [anySave, setAnySave] = useState(true);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const getSavedPost = async() => {
    const response = await fetch(`http://localhost:3001/getSaved?userId=${user._id}&full=${1}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if(data.length === 0){
      setAnySave(false);
    }
    setSavedPost(data);
  }
  const getCreatedPosts = async() => {
    const response = await fetch(`http://localhost:3001/getCreated?userId=${user._id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if(data.length === 0){
      setAnyPost(false);
    }
    setMyPosts(data);
  }

  useEffect(() => {
    getSavedPost();
    getCreatedPosts();
  }, [])


  return (
    <div>

      <div className='mt-4 flex flex-col items-center'>
        {(user.picturePath && user.picturePath != "undefined_undefined")
          ? <img className='h-32 rounded-full' src={`https://firebasestorage.googleapis.com/v0/b/nicterest.appspot.com/o/${user.picturePath}?alt=media`} />
          : <img className='h-32 rounded-full' src='../images/defaultUserDP.jpg'/>
        }
        <div className='mt-2 font-semibold text-4xl' > {user.name} </div>
        <div className='mt-2 font-light' >{user.email}</div>
        <div className='flex flex-row gap-2 mt-4'>
          <div 
            onClick={() => {dispatch(setPage({page: "create"}))}}
            className='bg-[#e9e9e9] hover:cursor-pointer text-base font-medium px-4 py-3 rounded-3xl'>
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
          savedPost.length == 0 && anySave ?
          <div className='h-60 flex flex-col justify-center items-center' >
            <HashLoader color="#000000"/>
          </div> 
          : (!anySave) ?
            <div className="flex flex-row justify-center items-center h-56 font-semibold text-3xl " > 
              Try Saving Some Posts 
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
        myPosts.length == 0 && anyPost ?
          <div className='h-60 flex flex-col justify-center items-center' >
            <HashLoader color="#000000"/>
          </div> 
          : (!anyPost) ?
            <div className="flex flex-row justify-center items-center h-56 font-semibold text-3xl " > 
              Lets Create Some Nic's 
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