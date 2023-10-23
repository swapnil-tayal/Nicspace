import React from 'react'
import Navbar from './Navbar'
import CreatePost from './CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import Feed from './Feed'
import { BottomScrollListener } from 'react-bottom-scroll-listener';

const Home = () => {

  const currPage = useSelector((state) => state.page);

  const onScrollFuc = () => {
    console.log(1);
    // if (listInnerRef.current) {
    //   const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
    //   const isNearBottom = scrollTop + clientHeight >= scrollHeight;

    //   if (isNearBottom) {
    //     console.log("Reached bottom");
    //     // DO SOMETHING HERE
    //   }
    // }
  };


  return (
    <>
      <Navbar />
      { currPage == "home" && <Feed /> }
      { currPage == 'create' && <CreatePost /> }
    </>
  )
}

export default Home