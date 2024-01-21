import React from 'react'
import Navbar from './Navbar'
import CreatePost from './CreatePost'
import { useSelector } from 'react-redux'
import Feed from './Feed'
import Post from './Post';
import Profile from './Profile';
import Save from './Save';
import Explore from './Explore'
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from './Login';

const Home = () => {

  const isAuth = Boolean(useSelector((state) => state.token));
  return (
      <BrowserRouter>
        { isAuth  && <Navbar /> }
        <Routes>
          <Route path='/' element={<Login />} />
          <Route 
            path='/home' 
            element={isAuth ? <Feed /> : <Navigate to="/"/>} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/saved' element={<Save />} />
          <Route path='/postPage' element={<Post />} />
        </Routes>
      </BrowserRouter>
  )
}

export default Home