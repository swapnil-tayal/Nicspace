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
  }
})

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
  }
});

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

app.get("/posts", async(req, res) => {
  try{
    // console.log(req.query.page);
    const skipVal = req.query.page * 18;
    const post = await NicPost.find().limit(18).skip(skipVal);
    // const post = await NicPost.find();
    res.status(200).json(post);
  } catch(e){
    res.status(404).json({ message: err.message });
  }
})

app.get("/postsSize", async(req, res) => {
  try{
    const size = await NicPost.count();
    res.status(200).json(size);
  } catch(e){
    res.status(404).json({ message: e.message });
  }
})

app.post("/save", async(req, res) => {
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
})

app.get("/getSaved", async(req, res) => {
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
})

app.get("/getCreated", async(req, res) => {
  try{
    const userId = req.query.userId;
    const data = await NicPost.find({ userId: userId });
    res.status(200).json(data);
  }catch(e){
    res.status(404).json({ message: e.message });
  }
})

app.get('/search', async(req, res) => {
  try{
    const word = req.query.word;
    const posts = await NicPost.find({ tag: word }).exec();
    res.status(200).json(posts);

  }catch(e){
    res.status(404).json({ message: e.message });
  }
})

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
  })
}).catch((err) => console.log(`${err} server not connet`));