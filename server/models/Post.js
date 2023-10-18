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
  description: String,
  picturePath: String,
  // userPicturePath: String,
},
  {timestamps: true}
);

const NicPost = mongoose.model("NicPost", postSchema);
export default NicPost;
