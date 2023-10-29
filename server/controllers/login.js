import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import NicUser from "../models/Users.js";
dotenv.config();

export const login = async (req, res) => {
    try{
      const { email, password } = req.body;
      const user = await NicUser.findOne({ email: email });
      if(!user){
        return res.status(400).json({ msg: "User not exist" });
      }
      const isMatchPass = await bcrypt.compare(password, user.password);
      if(!isMatchPass){
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      const token = jwt.sign({id: user._id}, process.env.JWT_SALT);
      res.status(200).json({ user, token });
    } catch(err){
      res.status(500).json({ error: err.message });
    }
  }