import React, { useState } from "react";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoginState, setLoginState] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('You have submitted');
    console.log(email, password, name);
  }

  return (
    <div className="h-[786px] bg-[url('../images/loginBg.png')]
                    flex flex-row">

      <div className="w-[60%] text-white font-bold text-8xl mt-14 p-[10rem] select-none">
        Sign up to Get your ideas
      </div>

      <div className="mt-[3.5rem]">
        <div className="bg-white p-[2rem] w-[30rem] rounded-2xl">

            <div className="flex flex-col justify-center items-center" >
              <img className="w-[85px]" src="../images/logo.png" alt="" /> 
              <div className="text-black font-semibold text-[1.8rem]">Welcome to Nicterest</div>
              <div className="text-black font-normal text-[1rem]">Find new ideas to try</div>
            </div>
            
            <form className="px-[3.5rem] mt-8" onSubmit={handleSubmit}>
              <div className="items-start ml-[7px] mb-[5px]">Email</div>
              <input  className="border-solid border-2 p-[12px] w-[100%] focus:border-cyan-500 
                                focus:outline-none rounded-xl" 
                      text="email" 
                      required
                      placeholder="Email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
              /> 
              {isLoginState && 
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
              {isLoginState 
              ? <button 
                    type="submit" 
                    className="w-[100%] bg-red-600 text-gray-50 mt-[1rem] rounded-2xl p-3" 
                >Create Account
                </button>
              : <button 
                    type="submit" 
                    className="w-[100%] bg-red-600 text-gray-50 mt-[1rem] rounded-2xl p-3" 
                >Log In
                </button>
              } 
              <div className="mt-[8px] flex flex-col justify-center items-center">OR</div>
              {isLoginState 
              ? <button 
                      onClick={() => setLoginState(!isLoginState)}
                      type="submit" 
                      className="w-[100%] bg-red-600 text-gray-50 mt-[1rem] rounded-2xl p-3"
                > Log In
                </button>
              : <button 
                    onClick={() => setLoginState(!isLoginState)}
                    type="submit" 
                    className="w-[100%] bg-red-600 text-gray-50 mt-[1rem] rounded-2xl p-3"
                > Sign Up
                </button>
              }
            </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
