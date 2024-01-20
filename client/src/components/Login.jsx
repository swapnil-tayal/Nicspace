import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogin, setPage } from "../state";
import Dropzone from "react-dropzone";
import validator from "validator";
import logo from "../images/nicspace2.png"

const Login = () => {

  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoginState, setLoginState] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [isCred, setCred] = useState(true);
  const [isLoginSucess, setIsLoginSucess] = useState(false);
  const [isEmailTaken, setIsEmailTaken] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const host = useSelector((state) => state.host);

  const validateEmail = () => {
    return (validator.isEmail(email));
  };

  const registerCall = async () => {

    setIsEmail(true)
    setCred(true)
    setIsLoginSucess(false)
    setIsEmailTaken(false);

    if(!validateEmail()){
      setIsEmail(false);
      return;
    }
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("picture", image);
    if(image){
      formData.append("picturePath", image.name);
    }

    const registerResponse = await fetch(`http://${host}:3001/register`, {
      method: "POST",
      body: formData
    })
    const isRegisSucc = await registerResponse.json();
    
    if(isRegisSucc.email === email){
      setIsLoginSucess(true);
      console.log('user registered');
    }else{
      setIsEmailTaken(true);
    }
  }

  const loginCall = async () => {

    setIsEmail(true)
    setCred(true)
    setIsLoginSucess(false)
    setIsEmailTaken(false);

    if(!validateEmail()){
      setIsEmail(false);
      return;
    }
    const data = {
      email: email,
      password: password,
    }
    const loginResponse = await fetch(`http://${host}:3001/login`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), 
    })
    const isLoginSucc = await loginResponse.json();
    if(isLoginSucc.msg === "Invalid credentials"){
      setCred(false);
      console.log("invalid");
    }else{
      dispatch(
        setLogin({
          user: isLoginSucc.user,
          token: isLoginSucc.token,
        })
      )
      dispatch(
        setPage({
          page:"home"
        })
      )
      navigate("/home");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isLoginState) await loginCall();
    else await registerCall();
  }

  return (
    <div className="h-[100vh] bg-[url('./images/loginBg.png')]
                    flex flex-row justify-center">

      <div className="text-white font-semibold text-8xl w-[100%] items-center select-none hidden
                      md:flex md:justify-center">
        Sign up to <br/> Get your <br/> ideas
      </div>

      <div className="px-0 lg:px-32 w-[95vw]">
        <div className="bg-white  p-[1rem] sm:p-[2rem] w-[100%] sm:w-[30rem] h-[100%]">

            <div className={`flex flex-col justify-center items-center 
                              ${!isLoginState ? 'mt-1 sm:mt-1':'mt-8 sm:mt-16'}`} >
              <img className="w-[250px] mb-10" src={logo} alt="" /> 
              <div className="text-black font-semibold text-[1.2rem] sm:text-[1.8rem]">Welcome to Nicspace</div>
              <div className="text-black font-normal text-[1rem]">Find new ideas to try</div>
            </div>
            
            <form className="px-[2rem] mt-8" onSubmit={handleSubmit}>
              <div className="items-start ml-[7px] mb-[5px]">Email</div>
              <input  className="border-solid border-2 p-[12px] w-[100%] focus:border-cyan-500 
                                focus:outline-none rounded-xl" 
                      text="email" 
                      required
                      placeholder="Email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
              /> 
              {!isEmail && <div className="text-red-400 text-sm ml-2">enter a valid email</div>}
              {isEmailTaken && <div className="text-red-400 text-sm ml-2">email already taken</div>}
              {!isLoginState && 
                <div>
                  <div className="items-start ml-[7px] mb-[5px] mt-[10px]">Name</div>
                  <input  className="border-solid border-2 p-[12px] w-[100%] focus:border-cyan-500 
                                    focus:outline-none rounded-xl" 
                          text="name" 
                          required
                          placeholder="Name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                  /> 
                  <div className="items-start ml-[7px] mb-[5px] mt-[10px]">Picture</div>
                  <Dropzone multiple={false} 
                      onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                      minSize={0}
                      >
                  {({ getRootProps, getInputProps, isDragActive }) => (
                  <div>
                    <div className="border-solid border-2 p-[12px] w-[100%] focus:border-cyan-500 
                                    focus:outline-none rounded-xl bg-[#e9e9e9]"  {...getRootProps()}>
                      <input  {...getInputProps()} />
                      {image ? 
                        <div>
                          <div className=""> {image.name} </div>
                        </div>
                      : isDragActive ? 
                        "Drop it like it's hot!" : 
                        <p className="">Choose a <span className="font-bold">PICTURE</span></p>
                      }
                    </div>
                  </div>
                  )}
                </Dropzone>
                </div>
              }
              <div className="items-start ml-[7px] mb-[5px] mt-[10px]">Password</div>
              <input  className="border-solid border-2 p-[12px] w-[100%] focus:border-cyan-500 
                                focus:outline-none rounded-xl" 
                      text="password" 
                      type="password"
                      required
                      placeholder="Password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
              /> 
              {isLoginSucess && <div className="text-black font-semibold text-sm ml-2">Register Sucess, Try Login</div>}
              
              {!isCred && <div className="text-red-400 text-sm ml-2">your email or password not valid</div>}
              <div className="flex justify-center items-center" >
              {!isLoginState 
              ?
                <button 
                    type="submit" 
                    className="w-[100%] bg-red-600 hover:bg-red-700 text-gray-50 mt-[1rem] rounded-3xl p-3" 
                >Create Account
                </button>
              : <button 
                    type="submit" 
                    className="w-[100%] bg-red-600 hover:bg-red-700 text-gray-50 mt-[1rem] rounded-3xl p-3" 
                >Log In
                </button>
              } 
              </div>

              <div className="mt-[8px] flex flex-col justify-center items-center">OR</div>

              <div className="flex justify-center items-center" >
              {!isLoginState 
              ? <button 
                      onClick={() => setLoginState(!isLoginState)}
                      className="w-[100%] bg-red-600 hover:bg-red-700 text-gray-50 mt-[1rem] rounded-3xl p-3"
                > Log In
                </button>
              : <button 
                    onClick={() => setLoginState(!isLoginState)}
                    className="w-[100%] bg-red-600 hover:bg-red-700 text-gray-50 mt-[1rem] rounded-3xl p-3"
                > Sign Up
                </button>
              }
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
