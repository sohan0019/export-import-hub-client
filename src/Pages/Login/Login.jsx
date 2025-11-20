import React, { useState } from 'react';
import { FaEye, FaGoogle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SiGoogle } from 'react-icons/si';
import { Link } from 'react-router';
import loginImg from '../../assets/Images/Login.png'
import bgImg from '../../assets/Images//bg.jpg'
import { IoEyeOff } from 'react-icons/io5';
// bg-linear-to-tr from-[#ff6e7f] to-[#bfe9ff]
const Login = () => {

  const [show, setShow] = useState(false);

  return (
    <section style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${bgImg})` }}>
      <div className='flex flex-row  min-h-screen'>
        <div className='flex-1 my-auto text-center'>
          <h1 className='text-7xl font-semibold text-purple-950'>Welcome Back</h1>
          <img className='mx-auto h-96' src={loginImg} alt="" />
          <h2 className='text-3xl mt-5 text-gray-600'>Please login to get started......</h2>
        </div>

        <div className="card flex-1 h-fit shrink-0 my-auto">
          <div className="card-body mx-[13%] bg-base-100 shadow-2xl rounded-3xl">
            <h2 className='text-5xl font-semibold italic text-center text-purple-950 mb-5'>Login</h2>
            <fieldset className="fieldset">

              <div>
              <label className="label text-2xl text-black mb-1">Email</label>
              <input type="email" className="input w-full mb-3" placeholder="abc@gmail.com" />
              </div>

              <div className='relative'>
              <label className="label text-2xl text-black mb-1">Password</label>
              <input type={show ? "text" : "password"} className="input w-full mb-1" placeholder="*********" />
               <span onClick={() => setShow(!show)} className="absolute right-3 top-12 cursor-pointer z-50">
                {show ? <FaEye className='w-5 h-5' /> : <IoEyeOff className='w-5 h-5'/>}
              </span>
              </div>

              <div><a className="link link-hover text-base text-blue-900">Forgot password?</a></div>

              <button className="btn bg-gray-800 rounded-full text-white border-amber-100 mt-4 text-lg hover:text-yellow-100">Login</button>
              <h3 className='my-2 text-lg text-center text-gray-600 font-bold'>------- OR -------</h3>

              <button
                // onClick={handleGoogleSignIn}
                className="btn bg-gray-800 rounded-full text-white border-amber-100 text-lg hover:text-yellow-100">
                <SiGoogle/>Login with Google</button>

              <p className="text-[15px] mt-1 pl-1">New to our website? Please  <Link className="text-blue-700 hover:text-blue-800 hover:underline" to="/registration">Register</Link></p>

            </fieldset>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;