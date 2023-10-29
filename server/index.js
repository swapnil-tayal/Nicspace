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
import { verifyToken } from "./middleware/auth.js";
import { login } from "./controllers/login.js";
import { getPosts, getPostSize} from "./controllers/posts.js";
import { saveThePost, getSavedPosts } from "./controllers/savePosts.js";
import { createdPost } from "./controllers/createdPosts.js";
import { searchPosts } from "./controllers/searchPosts.js";

const app = express();
app.use(express.json());
app.use(cors());  

const PORT = process.env.PORT || 6000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
let date;

const update = () => (
  date = Date.now()
)

const storage = multer.diskStorage({
  destination:function(req, file, cb){
      cb(null, "public/assets");
  },
  filename: function(req, file, cb){
    update();
    cb(null, date + "_" + file.originalname);
  }
})

const upload = multer({ storage });

app.post("/posts/video", upload.single("video"), async(req, res) => {
  try{
    const { userId, description, picturePath, title, link, tag, userDP } = req.body;
    const tags = tag.split(" ");    
    const newPath = date + "_" + picturePath;
    
    const user = await NicUser.findById(userId);
    const newPost = new NicPost({
      userId: userId,
      name: user.name,
      description: description,
      picturePath: newPath,
      type: "video",
      title: title,
      link: link,
      tag: tags,
      userDP: userDP
    });
    await newPost.save();
    const post = await NicPost.find( {"userId": userId} );
    res.status(201).json(post);

  }catch(e){
    res.status(409).json({ message: e.message });
  }}
);

app.post("/posts/picture", upload.single("picture"), async(req, res) => {
  try{
    const { userId, description, picturePath, title, link, tag, userDP } = req.body;
    const tags = tag.split(" ");
    // console.log(picturePath)
    const newPath = date + "_" + picturePath;

    const user = await NicUser.findById(userId);
    const newPost = new NicPost({
      userId: userId,
      name: user.name,  
      description: description,
      picturePath: newPath,
      type: "picture",
      title: title,
      link: link,
      tag: tags,
      userDP: userDP
    });
    await newPost.save();
    const post = await NicPost.find( {"userId": userId} );
    res.status(201).json(post);

  }catch(e){
    res.status(409).json({ message: e.message });
}}
);

// register
app.post("/register", upload.single("picture"), async (req, res) => {
  try {
    const { name, email, password, picturePath } = req.body;
    const newPath = date + "_" + picturePath;
    // encryption
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newNicUser = new NicUser({
      name,
      email,
      password: passwordHash,
      picturePath: newPath
    });
    const savedNicUser = await newNicUser.save();
    res.status(201).json(savedNicUser);
  } catch (err) {
    res.status(500).json({ error: err });
  }}
);


app.post("/login", login);
app.get("/posts", verifyToken, getPosts);
app.get("/postsSize", verifyToken, getPostSize);
app.post("/save", verifyToken, saveThePost);
app.get("/getSaved", verifyToken, getSavedPosts);
app.get("/getCreated", verifyToken, createdPost)
app.get('/search', verifyToken, searchPosts);


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
  })
}).catch((err) => console.log(`${err} server not connet`));