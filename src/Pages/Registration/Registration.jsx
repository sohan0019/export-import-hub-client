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
        updateUserProfile(displayName, photoURL)
          .then(() => {
            const newUser = {
              name: displayName,
              email: result.user.email,
              photo: photoURL,
            }

            fetch('https://import-export-hub-server-three.vercel.app/users', {
              method: 'POST',
              headers: {
                "content-type": 'application/json',
              },
              body: JSON.stringify(newUser),
            })
              .then(res => res.json())
              .then((data) => {
                console.log('Data after user saved', data);
                e.target.reset();
                setLoading(false);
                navigate("/");
                
                if (data.message === 'User Already Exist.') {
                    toast.info("User alreadt exists.");
                } else {
                    toast.success("User created Successfully!");
                }
              })
              .catch(dbError => {
                console.log('Database save error:', dbError.message);
                toast.error("Failed to save user data to database.");
              });
          })
          .catch(updateError => {
            console.log('Error updating profile:', updateError.message);
            toast.error("Registration failed: Could not update user profile.");
          });
      })
      .catch(error => {
        console.log(error.message);
        toast.error(error.message);
      })
  }

  const handleGoogleSignIn = () => {
    googleLogin()
      .then(result => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        }
        
        fetch('https://import-export-hub-server-three.vercel.app/users', {
          method: 'POST',
          headers: {
            "content-type": 'application/json',
          },
          body: JSON.stringify(newUser),
        })
          .then(res => res.json())
          .then((data) => {
            console.log('Data after user saved', data);
            setLoading(false);
            navigate("/");
            
            if (data.message === 'User Already Exist.') {
                toast.success("Welcome back! Logged in with Google.");
            } else {
                toast.success("User created Successfully with Google!");
            }
          })
          .catch(dbError => {
            console.log('Database save error:', dbError.message);
            toast.error("Failed to save user data to database after Google sign-in.");
          });
      })
      .catch(error => {
        console.log(error.message);
        toast.error(error.message);
      })
  }

  return (
    <section style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url(${regImg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", }}>
      <div className='flex md:flex-row flex-col min-h-screen'>
        <div className='flex-1 my-auto md:text-left text-center lg:py-0 py-30'>
          <h1 className='lg:text-6xl text-3xl font-semibold text-white px-10'>Create an Account and start exploring..</h1>
        </div>

        <div className="card lg:flex-1 md:flex-2 flex-1 h-fit shrink-0 my-auto md:pb-0 pb-10">
          <div className="card-body sm:mx-[13%] mx-6 bg-base-100 shadow-2xl rounded-3xl">
            <h2 className='text-5xl font-semibold italic text-center text-purple-950 mb-5'>Register</h2>
            <form onSubmit={handleSignUp} className="fieldset">

              <div>
                <label className="label text-xl text-black mb-1">Name</label>
                <input type="text" className="input w-full mb-3" placeholder="Your Name" name='name' required/>
              </div>

              <div>
                <label className="label text-xl text-black mb-1">Email</label>
                <input type="email" className="input w-full mb-3" placeholder="abc@gmail.com" name='email' required/>
              </div>

              <div>
                <label className="label text-xl text-black mb-1">Photo URL</label>
                <input type="text" className="input w-full mb-3" placeholder="Your Photo URL (optional)" name='photo' />
              </div>

              <div className='relative'>
                <label className="label text-xl text-black mb-1">Password</label>
                <input type={show ? "text" : "password"} className="input w-full mb-1" placeholder="*********" name='password' required/>
                <span onClick={() => setShow(!show)} className="absolute right-3 top-11 cursor-pointer z-50">
                  {show ? <FaEye className='w-5 h-5' /> : <IoEyeOff className='w-5 h-5' />}
                </span>
              </div>

              <button className="btn bg-gray-800 rounded-full text-white border-amber-100 mt-4 text-lg hover:text-yellow-100">Register</button>
            </form>
            <h3 className='my-2 text-lg text-center text-gray-600 font-bold'>------- OR -------</h3>

            <button onClick={handleGoogleSignIn} className="btn bg-gray-800 rounded-full text-white border-amber-100 text-lg hover:text-yellow-100">
              <SiGoogle />Sign Up with Google</button>

            <p className="text-[15px] mt-1 pl-1">Already have an account? Please <Link className="text-blue-700 hover:text-blue-800 hover:underline" to="/login">Login</Link></p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;