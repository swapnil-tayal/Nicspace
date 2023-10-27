import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import Postcard from './Postcard';
import { HashLoader } from "react-spinners"

const Save = () => {

  const [savedPost, setSavedPost] = useState([]);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [anySave, setAnySave] = useState(true);

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

  useEffect(() => {
    getSavedPost();
  }, [])


  return (
    <>
      { savedPost.length == 0 && anySave ?
        <div className='h-96 flex flex-col justify-center items-center' >
          <HashLoader color="#000000"/>
        </div>
        : !anySave ?
        <div className="flex flex-row justify-center items-center h-56 font-semibold text-3xl " > 
          Try Saving Some Posts 
        </div>
        : <div className='mt-6 columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 col-span-4 gap-4 px-6 py-4'>
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
      }
    </>
  )
}

export default Save