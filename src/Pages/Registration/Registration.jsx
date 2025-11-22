import React, { useContext, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { SiGoogle } from 'react-icons/si';
import { Link, useNavigate } from 'react-router';
import regImg from '../../assets/Images/regBg.jpg'
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';

const Registration = () => {

  const [show, setShow] = useState(false);
  const { createUser, updateUserProfile, setLoading, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    const displayName = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photo.value;
    const password = e.target.password.value;

    console.log({ displayName, email, photoURL, password });

    const regex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

    if (!regex.test(password)) {
      toast.error("Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter.");
      return;
    }

    createUser(email, password)
      .then(result => {
        console.log(result.user);
        updateUserProfile(displayName, photoURL);
        e.target.reset();
        setLoading(false);
        navigate("/");
        toast.success("User created Successfully!")
      })
      .catch(error => {
        console.log(error.message);
        toast.error(error.message);
      })
  }

  const handleGoogleSignIn = () => {
    googleLogin()
    .then(result => {
      console.log(result.user);
      setLoading(false);
      navigate("/");
      toast.success("User created Successfully!")
      // const newUser = {
      //   name: result.user.displayName,
      //   email: result.user.email,
      //   image: result.user.photoURL,
      // }

      //create user in the database

    })
    .catch(error => {
      console.log(error.message);
      toast.error(error.message);
    })
  }

  return (
    <section style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)),  url(${regImg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", }}>
      <div className='flex flex-row  min-h-screen'>
        <div className='flex-1 my-auto text-left'>
          <h1 className='text-6xl font-semibold text-white px-10'>Create an Account and start exploring..</h1>
        </div>

        <div className="card flex-1 h-fit shrink-0 my-auto">
          <div className="card-body mx-[13%] bg-base-100 shadow-2xl rounded-3xl">
            <h2 className='text-5xl font-semibold italic text-center text-purple-950 mb-5'>Register</h2>
            <form onSubmit={handleSignUp} className="fieldset">

              <div>
                <label className="label text-xl text-black mb-1">Name</label>
                <input type="text" className="input w-full mb-3" placeholder="Your Name" name='name' />
              </div>

              <div>
                <label className="label text-xl text-black mb-1">Email</label>
                <input type="email" className="input w-full mb-3" placeholder="abc@gmail.com" name='email' />
              </div>

              <div>
                <label className="label text-xl text-black mb-1">Photo URL</label>
                <input type="text" className="input w-full mb-3" placeholder="Your Photo URL" name='photo' />
              </div>

              <div className='relative'>
                <label className="label text-xl text-black mb-1">Password</label>
                <input type={show ? "text" : "password"} className="input w-full mb-1" placeholder="*********" name='password' />
                <span onClick={() => setShow(!show)} className="absolute right-3 top-11 cursor-pointer z-50">
                  {show ? <FaEye className='w-5 h-5' /> : <IoEyeOff className='w-5 h-5' />}
                </span>
              </div>

              <button className="btn bg-gray-800 rounded-full text-white border-amber-100 mt-4 text-lg hover:text-yellow-100">Register</button>
            </form>
            <h3 className='my-2 text-lg text-center text-gray-600 font-bold'>------- OR -------</h3>

            <button onClick={handleGoogleSignIn} className="btn bg-gray-800 rounded-full text-white border-amber-100 text-lg hover:text-yellow-100">
              <SiGoogle />Sign Up with Google</button>

            <p className="text-[15px] mt-1 pl-1">Already have an account? Please  <Link className="text-blue-700 hover:text-blue-800 hover:underline" to="/login">Login</Link></p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;