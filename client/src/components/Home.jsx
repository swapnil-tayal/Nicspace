import React from 'react'
import Navbar from './Navbar'
import CreatePost from './CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import Feed from './Feed'
import { BottomScrollListener } from 'react-bottom-scroll-listener';
import { useState, useEffect } from 'react'
import state, { setPost } from '../state';

const shuffle = (array) => { 
  return array.map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value); 
}; 
function removeDuplicates(arr) { 
  return [...new Set(arr)]; 
} 

const Home = () => {

  const currPage = useSelector((state) => state.page);
  const posts = useSelector((state) => state.posts);
  const [pageNo, setPageNo] = useState(0);
  const dispatch = useDispatch();
  const [postSize, setPostSize] = useState(1);

  const getSize = async() => {
    const response = await fetch(`http://localhost:3001/postsSize`, {
      method: "GET"
    })
    const size = await response.json();
    // console.log(size);
    setPostSize(size);  
  }

  const updatePost = async() => {

    // alert("hello");
    if(posts.length >= postSize) return;
    // setPageNo(pageNo+1);
    // console.log(pageNo);

    const response = await fetch(`http://localhost:3001/posts?page=${1}` ,{
      method: "GET",
    });
    const data = await response.json();
    const dataSh = shuffle(data);
    // console.log(dataSh);
    // console.log(posts);
    const newPosts = posts.concat(dataSh);
    console.log(newPosts);
    dispatch(setPost({posts: newPosts}));
  }

  useEffect(() => {
    getSize();
  }, []);

  return (
    <>
      <BottomScrollListener onBottom={() => updatePost()} >
        <Navbar />
        { currPage == "home" && <Feed /> }
        { currPage == 'create' && <CreatePost /> }
      </BottomScrollListener>
    </>
  )
}

export default Home