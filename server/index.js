import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import { resgister } from "./controllers/auth.js"
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 6000;

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

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).then(() => {

  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
  })
}).catch((err) => console.log(`${err} server not connet`));