import dotenv from "dotenv";
import NicPost from "../models/Post.js";
dotenv.config();

export const getPosts = async(req, res) => {
  try{
    const skipVal = req.query.page * 20;
    const post = await NicPost.find().limit(20).skip(skipVal);
    res.status(200).json(post);
  } catch(e){
    res.status(404).json({ message: err.message });
  }
}

export const getPostSize = async(req, res) => {
  try{
    const size = await NicPost.count();
    res.status(200).json(size);
  } catch(e){
    res.status(404).json({ message: e.message });
  }
}
