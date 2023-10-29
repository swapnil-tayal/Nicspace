import dotenv from "dotenv";
dotenv.config();

export default {
  firebaseConfig: {
    apiKey: process.env.API,
    authDomain: process.env.AUT,
    projectId: process.env.PRO,
    storageBucket: process.env.STO,
    messagingSenderId: process.env.MES,
    appId: process.env.APP,
  },
};
