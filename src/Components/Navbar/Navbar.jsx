import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../assets/Images/Logo.png'

const Navbar = () => {

  const links = <>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/allProducts">All Products</NavLink></li>
    <li><NavLink to="/myImports">My Imports</NavLink></li>
    <li><NavLink to="/myExports">My Exports</NavLink></li>
    <li><NavLink to="/addProduct">Add Product</NavLink></li>
    {/* {
      user && <>
        <li><NavLink to="/myProducts">My Products</NavLink></li>
        <li><NavLink to="/myBids">My Bids</NavLink></li>
        <li><NavLink to="/createAProduct">Create A Product</NavLink></li>
      </>
    } */}
  </>

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
          <Link to={'/login'} className="btn btn-info text-base">Login</Link>
          <Link to={'/registration'} className="btn btn-info text-base">Register</Link>
        </div>
      </div>
    </section>
  );
};

export default Navbar;