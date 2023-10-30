import { useState } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import { useSelector } from 'react-redux';
import Home from "./components/Home"
import { useDispatch } from "react-redux";
import { setLogin, setPost } from "./state";
import { useEffect } from 'react';
import Post from './components/Post';

function App() {

  const isAuth = Boolean(useSelector((state) => state.token));
  console.log(isAuth);
  const dispatch = useDispatch();
  
  // useEffect(() => {
  //   dispatch(
  //     setLogin({
  //       user: null,
  //       token: null,
  //     }),
  //     setPost({
  //       post:[]
  //     })
  //   )
  // })

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route 
            path='/home' 
            element={isAuth ? <Home /> : <Navigate to="/"/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
