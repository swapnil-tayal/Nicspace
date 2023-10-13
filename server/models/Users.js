import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      min: 2,
      max: 30,
    },
    email: {
      type: String,
      // unique: true,
      require: true,
      max: 50,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
  },
  { timestamps: true }
);

const NicUser = mongoose.model("NicUser", UserSchema);
export default NicUser;
