import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import NicUser from "../models/Users";

export const register = async (req, res) => {
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
};
