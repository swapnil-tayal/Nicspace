import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Postcard from './Postcard';
import { HashLoader } from "react-spinners"
import { setPage } from '../state';
import defaultDp from '../images/defaultUserDP.jpg'

const Profile = () => {

  const user = useSelector((state) => state.user);
  const [isSaved, setIsSaved] = useState(true);
  const [savedPost, setSavedPost] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [anyPost, setAnyPost] = useState(true);
  const [anySave, setAnySave] = useState(true);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const host = useSelector((state) => state.host);

  const getSavedPost = async() => {
    const response = await fetch(`${host}/getSaved?userId=${user._id}&full=${1}`, {
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
    const response = await fetch(`${host}/getCreated?userId=${user._id}`, {
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
        {(user.picturePath && user.picturePath !== "undefined_undefined")
          ? <img alt='d' className='h-32 rounded-full' src={`https://firebasestorage.googleapis.com/v0/b/nicterest.appspot.com/o/${user.picturePath}?alt=media`} />
          : <img alt='d' className='h-32 rounded-full' src={defaultDp}/>
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
          savedPost.length === 0 && anySave ?
          <div className='h-60 flex flex-col justify-center items-center' >
            <HashLoader color="#000000"/>
          </div> 
          : (!anySave) ?
            <div className="flex flex-row justify-center items-center h-56 font-semibold text-3xl " > 
              Try Saving Some Posts 
            </div>
          :
          <div className='columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 col-span-4
                          gap-2 px-2 sm:gap-3 md:gap-4 sm:px-3 md:px-3 lg:px-4 xl:px-6 py-5'>
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
        myPosts.length === 0 && anyPost ?
          <div className='h-60 flex flex-col justify-center items-center' >
            <HashLoader color="#000000"/>
          </div> 
          : (!anyPost) ?
            <div className="flex flex-row justify-center items-center h-56 font-semibold text-3xl " > 
              Lets Create Some Nic's 
            </div>
          :
          <div className='columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 col-span-4
                          gap-2 px-2 sm:gap-3 md:gap-4 sm:px-3 md:px-3 lg:px-4 xl:px-6 py-5'>
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