import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import logo from '../../assets/Images/Logo.png'
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {

  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || "light")

  const links = <>
    <li className='hover:text-blue-900'><NavLink to="/">Home</NavLink></li>
    <li className='hover:text-blue-900'><NavLink to="/allProducts">All Products</NavLink></li>
    {
      user && <>
        <li className='hover:text-blue-900'><NavLink to="/myImports">My Imports</NavLink></li>
        <li className='hover:text-blue-900'><NavLink to="/myExports">My Exports</NavLink></li>
        <li className='hover:text-blue-900'><NavLink to="/addProduct">Add Product</NavLink></li>
      </>
    }
  </>

  const hangleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("SignOut Successful")
        navigate("/login")
      })
      .catch(error => {
        toast.error(error.message)
      })
  }

  useEffect(() => {
    const html = document.querySelector('html')
     html.setAttribute("data-theme", theme)
     localStorage.setItem("theme", theme)
  }, [theme])

  const handleTheme = (checked) => {
    setTheme(checked ? "dark": "light")
  }

  return (
    <section>
      <div className="navbar bg-base-100 shadow-sm border-b border-gray-600">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-lg">
              {links}
            </ul>
          </div>
          <Link to={'/'} className="ml-5 text-xl py-2">
            <img className='w-28' src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base font-semibold">
            {links}
          </ul>
        </div>
        <div className="navbar-end gap-4">
          {
            user ? (
              <div className='flex gap-3'>
                <div className="dropdown dropdown-bottom dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-link m-1">
                    <img className='w-15 rounded-full border' src={user.photoURL} alt="User Image" />
                  </div>

                  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-54 p-2 shadow-sm">

                    <div className="pb-3 border-b mb-2">
                      <li className="text-base font-bold ">{user.displayName}</li>
                      <li className="text-am">{user.email}</li>
                    </div>

                    <input
                      onChange={(e) => handleTheme(e.target.checked)}
                      type="checkbox"
                      defaultChecked={localStorage.getItem('theme') === "dark"}
                      className="toggle my-2 mb-3" />

                    <li onClick={hangleSignOut} className="w-full">
                      <a className="btn btn-info text-base w-full justify-center">Sign Out</a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className='flex gap-3'>
                <Link to={'/login'} className="btn btn-info text-base">Login</Link>
                <Link to={'/registration'} className="btn btn-info text-base">Register</Link>
              </div>
            )}
        </div>
      </div>
    </section >
  );
};

export default Navbar;