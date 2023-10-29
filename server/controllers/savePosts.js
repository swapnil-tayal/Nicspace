import dotenv from "dotenv";
import NicUser from "../models/Users.js";
import NicPost from "../models/Post.js";
dotenv.config();

export const saveThePost = async(req, res) => {
    try{
      const postId = req.query.postId;
      const userId = req.query.userId;
      
      const user = await NicUser.findById(userId);
      // console.log(user.savePost.length);
      if(user.savePost.includes(postId)){
        const ind = user.savePost.indexOf(postId);
        user.savePost.splice(ind, 1);
      }else{
        user.savePost.push(postId);
      }
      // console.log(user.savePost.length);
      await user.save();
      res.json({ message: 'Post saved successfully' });
      
    } catch(e){
      res.status(404).json({ message: e.message });
    }
  }
  
  export const getSavedPosts = async(req, res) => {
    try{
      const userId = req.query.userId;
      const user = await NicUser.findById(userId);
      const full = req.query.full;
      
      if(full === "1"){
  
        const posts = user.savePost;
        let data = [];
        for(let i=0; i<posts.length; i++){
           const x = await NicPost.findOne( {_id: posts[i]} );
           data.push(x);
        }
        res.status(200).json(data);
      }else{
        res.status(200).json(user.savePost);
      }
    }catch(e){
      res.status(404).json({ message: e.message });
    }
  }