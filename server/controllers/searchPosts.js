import dotenv from "dotenv";
import NicPost from "../models/Post.js";
dotenv.config();

export const searchPosts = async(req, res) => {
    try{
      const word = req.query.word;
      const posts = await NicPost.find({ tag: word }).exec();
      res.status(200).json(posts);
  
    }catch(e){
      res.status(404).json({ message: e.message });
    }
  }