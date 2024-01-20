import React from 'react'
import Navbar from './Navbar'
import CreatePost from './CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import Feed from './Feed'
import { BottomScrollListener } from 'react-bottom-scroll-listener';
import { useState, useEffect } from 'react'
import { setPost } from '../state';
import Post from './Post';
import Profile from './Profile';
import Save from './Save';
import Explore from './Explore'
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from './Login';

const shuffle = (array) => { 
  return array.map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value); 
}; 

const Home = () => {

  const currPage = useSelector((state) => state.page);
  // console.log(currPage);
  const isAuth = Boolean(useSelector((state) => state.token));
  // console.log(isAuth);
  const posts = useSelector((state) => state.posts);
  const [pageNo, setPageNo] = useState(0);
  const dispatch = useDispatch();
  const [postSize, setPostSize] = useState(1);
  const token = useSelector((state) => state.token);
  const host = useSelector((state) => state.host);

  const getSize = async() => {
    if(currPage === '/') return;
    const response = await fetch(`http://${host}:3001/postsSize`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    const size = await response.json();
    setPostSize(size);  
  }

  const updatePost = async() => {
    // alert("hello");
    if(posts.length >= postSize) return;
    // console.log(pageNo);
    setPageNo(pageNo+1);

    let page = pageNo + 1;
    if(currPage === "profile"){
      console.log("return");
      return;
    } 
    // console.log(page);
    const response = await fetch(`http://${host}:3001/posts?page=${page}` ,{
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    const dataSh = shuffle(data);
    const newPosts = posts.concat(dataSh);
    dispatch(setPost({posts: newPosts}));
  }  

  useEffect(() => {
    getSize();
  }, []);

  return (
    <BottomScrollListener onBottom={() => updatePost()} >
      <BrowserRouter>
        { currPage !== "/" && <Navbar /> }
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
    </BottomScrollListener>
  )
}

export default Home