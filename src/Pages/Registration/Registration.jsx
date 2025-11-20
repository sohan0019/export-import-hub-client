import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { SiGoogle } from 'react-icons/si';
import { Link } from 'react-router';
import regImg from '../../assets/Images/regBg.jpg'

const Registration = () => {

  const [show, setShow] = useState(false);

  return (
    <section style={{backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)),  url(${regImg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", }}>
          <div className='flex flex-row  min-h-screen'>
            <div className='flex-1 my-auto text-left'>
              <h1 className='text-6xl font-semibold text-white px-10'>Create an Account and start exploring..</h1>
            </div>
    
            <div className="card flex-1 h-fit shrink-0 my-auto">
              <div className="card-body mx-[13%] bg-base-100 shadow-2xl rounded-3xl">
                <h2 className='text-5xl font-semibold italic text-center text-purple-950 mb-5'>Register</h2>
                <fieldset className="fieldset">
    
                  <div>
                  <label className="label text-2xl text-black mb-1">Name</label>
                  <input type="text" className="input w-full mb-3" placeholder="Your Name" />
                  </div>
                  
                  <div>
                  <label className="label text-2xl text-black mb-1">Email</label>
                  <input type="email" className="input w-full mb-3" placeholder="abc@gmail.com" />
                  </div>

                  <div>
                  <label className="label text-2xl text-black mb-1">Photo URL</label>
                  <input type="text" className="input w-full mb-3" placeholder="Your Photo URL" />
                  </div>
    
                  <div className='relative'>
                  <label className="label text-2xl text-black mb-1">Password</label>
                  <input type={show ? "text" : "password"} className="input w-full mb-1" placeholder="*********" />
                   <span onClick={() => setShow(!show)} className="absolute right-3 top-12 cursor-pointer z-50">
                    {show ? <FaEye className='w-5 h-5' /> : <IoEyeOff className='w-5 h-5'/>}
                  </span>
                  </div>
    
                  <button className="btn bg-gray-800 rounded-full text-white border-amber-100 mt-4 text-lg hover:text-yellow-100">Register</button>
                  <h3 className='my-2 text-lg text-center text-gray-600 font-bold'>------- OR -------</h3>
    
                  <button
                    // onClick={handleGoogleSignIn}
                    className="btn bg-gray-800 rounded-full text-white border-amber-100 text-lg hover:text-yellow-100">
                    <SiGoogle/>Sign Up with Google</button>
    
                  <p className="text-[15px] mt-1 pl-1">Already have an account? Please  <Link className="text-blue-700 hover:text-blue-800 hover:underline" to="/login">Login</Link></p>
    
                </fieldset>
              </div>
            </div>
          </div>
        </section>
  );
};

export default Registration;