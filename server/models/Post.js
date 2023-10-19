import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  title: String,
  description: String,
  picturePath: String,
  type: String,
  link: String,
  tag: [],
},
  {timestamps: true}
);

const NicPost = mongoose.model("NicPost", postSchema);
export default NicPost;
