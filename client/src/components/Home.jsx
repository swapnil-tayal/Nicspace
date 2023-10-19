import React from 'react'
import Navbar from './Navbar'
import CreatePost from './CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import Feed from './Feed'

const Home = () => {

  const currPage = useSelector((state) => state.page);

  return (
    <>
      <Navbar />
      { currPage == "home" && <Feed /> }
      { currPage == 'create' && <CreatePost /> }
    </>
  )
}

export default Home