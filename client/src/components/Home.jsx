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
  const host = (useSelector((state) => state.host));
  // console.log(host);

  return (
      <BrowserRouter>
        { isAuth  && <Navbar /> }
        <Routes>
          <Route path='/' element={<Login />} />
          <Route 
            path='/home' 
            element={isAuth === false ? <Navigate to="/"/>: <Feed />} />
          <Route 
            path='/explore' 
            element={isAuth === false ? <Navigate to="/"/> : <Explore />} />
          <Route 
            path='/create' 
            element={isAuth === false ? <Navigate to="/"/> : <CreatePost />} />
          <Route 
            path='/profile' 
            element={isAuth === false ? <Navigate to="/"/> : <Profile />} />
          <Route 
            path='/saved' 
            element={isAuth === false ? <Navigate to="/"/> : <Save />} />
          <Route 
            path='/postPage' 
            element={isAuth === false ? <Navigate to="/"/> : <Post />} />
        </Routes>
      </BrowserRouter>
  )
}

export default Home