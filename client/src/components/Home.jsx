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

const shuffle = (array) => { 
  return array.map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value); 
}; 

const Home = () => {

  const currPage = useSelector((state) => state.page);
  const posts = useSelector((state) => state.posts);
  const [pageNo, setPageNo] = useState(0);
  const dispatch = useDispatch();
  const [postSize, setPostSize] = useState(1);
  const token = useSelector((state) => state.token);
  const host = useSelector((state) => state.host);

  const getSize = async() => {
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
    const response = await fetch(`http://${host}:3001/posts?page=${pageNo+1}` ,{
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
      <Navbar />
      
      { currPage === "home" && <Feed /> }
      { currPage === 'create' && <CreatePost /> }
      { currPage === 'post' && <Post /> }
      { currPage === 'profile' && <Profile /> }
      { currPage === 'saved' && <Save /> }
      { currPage === 'explore' && <Explore /> }

    </BottomScrollListener>
  )
}

export default Home