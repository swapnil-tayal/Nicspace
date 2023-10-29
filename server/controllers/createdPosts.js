import dotenv from "dotenv";
import NicPost from "../models/Post.js";
dotenv.config();

export const createdPost = async(req, res) => {
    try{
      const userId = req.query.userId;
      const data = await NicPost.find({ userId: userId });
      res.status(200).json(data);
    }catch(e){
      res.status(404).json({ message: e.message });
    }
  }