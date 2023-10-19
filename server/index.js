import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import { resgister } from "./controllers/auth.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import NicUser from "./models/Users.js";
import NicPost from "./models/Post.js";
import cors from "cors"
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 6000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
  destination:function(req, file, cb){
      cb(null, "public/assets");
  },
  filename: function(req, file, cb){
      cb(null, Date.now() + "_" + file.originalname);
  }
})
const upload = multer({ storage });

app.post("/posts/video", upload.single("video"), async(req, res) => {
  try{
    console.log(req.body);
    const { userId, description, videoPath } = req.body;
    const user = await NicUser.findById(userId);
    const newPost = new NicPost({
      userId: userId,
      name: user.name,
      description: description,
      picturePath: videoPath,
      type: "video"
    });
    await newPost.save();
    const post = await NicPost.find( {"userId": userId} );
    res.status(201).json(post);

  }catch(e){
    res.status(409).json({ message: e.message });
  }
})

app.post("/posts/picture", upload.single("picture"), async(req, res) => {
  try{
    const { userId, description, picturePath, title, link, tag } = req.body;
    const tags = tag.split(" ");
    // console.log(tags);

    const user = await NicUser.findById(userId);
    const newPost = new NicPost({
      userId: userId,
      name: user.name,
      description: description,
      picturePath: picturePath,
      type: "picture",
      title: title,
      link: link,
      tag: tags
    });
    await newPost.save();
    const post = await NicPost.find( {"userId": userId} );
    res.status(201).json(post);

  }catch(e){
    res.status(409).json({ message: e.message });
  }
});

// register
app.post("/register", async (req, res) => {
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
    if(!user){
      return res.status(400).json({ msg: "User not exist" });
    }
    const isMatchPass = await bcrypt.compare(password, user.password);
    if(!isMatchPass){
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SALT);
    // console.log(token);
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