import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';

const RootLayouts = () => {
  return (
    <div className='max-w-7xl mx-auto lato-font overflow-hidden'>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default RootLayouts;