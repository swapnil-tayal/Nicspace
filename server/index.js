import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import { resgister } from "./controllers/auth.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import NicUser from "./models/Users.js";
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 6000;


// register
app.get("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // encryption
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newNicUser = new NicUser({
      name,
      email,
      password: passwordHash,
    });
    const savedNicUser = await newNicUser.save();
    res.status(201).json(savedNicUser);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//login
app.post("/login", async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = await NicUser.findOne({ email: email });
    // console.log(user);
    if(!user){
      return res.status(400).json({ msg: "User not exist" });
    }
    const isMatchPass = await bcrypt.compare(password, user.password);
    // console.log(isMatchPass);
    if(!isMatchPass){
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SALT)
    res.status(200).json({ user, token });

  } catch(err){
    res.status(500).json({ error: err.message });
  }
});

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
  })
}).catch((err) => console.log(`${err} server not connet`));