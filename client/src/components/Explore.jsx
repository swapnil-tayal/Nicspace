import { useSelector } from "react-redux"
import { useEffect, useState } from 'react'
import Postcard from './Postcard';
import { HashLoader } from "react-spinners"

const Explore = () => {

  const word = useSelector((state) => state.searchWord);
  const [posts, setPosts] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const token = useSelector((state) => state.token);
  const host = useSelector((state) => state.host);
  // console.log(word);

  const getPosts = async() => {
    const response = await fetch(`http://${host}/search?word=${word}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if(data.length === 0){
      setIsValid(false);
    }
    setPosts(data);
  }

  useEffect(() => {
    getPosts();
  }, [word])

  return (
    <>
      {posts.length === 0 && isValid ?
        <div className='h-60 flex flex-col justify-center items-center' >
          <HashLoader color="#000000"/>
        </div> 
        : isValid ?
          <div className='columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 col-span-4 gap-4 px-6 py-4'>
            {Array.from(posts).map(({_id, description, link, picturePath, title, userId, type, userDP, name, tag}) => 
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
                isSaved={posts.includes(_id)}
              />
            )}
          </div>
          : <div className="flex flex-row justify-center items-center h-56 font-semibold text-3xl " > 
                  Try Searching Other Word </div>
      }
    </>
  )
}

export default Explore