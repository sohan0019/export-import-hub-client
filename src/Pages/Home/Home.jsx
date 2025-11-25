import React from 'react';
import Banner from '../../Components/Banner/Banner';
import { Form, NavLink, useLoaderData } from 'react-router';
import Card from '../../Components/Card/Card';
import { toast } from 'react-toastify';
import { FaRegFolderOpen, FaTruckMoving } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoManSharp } from 'react-icons/io5';

const Home = () => {

  const data = useLoaderData();
  console.log(data);

  const handleFormSubmit = (event) => {
    event.preventDefault(); 

    const form = event.target;
    const name = form.elements.name;
    const email = form.elements.email;
    const emailInput = form.elements[1];

    if (!name || !email) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!emailInput.checkValidity()) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Booking Successful! 🎉");
    form.reset();
  };

  return (
    <div>
      <Banner></Banner>

      {/* Latest Products */}
      <div className='py-20 bg-lime-50 border-b'>
        <h1 className='text-center text-3xl font-semibold text-orange-800 mb-10'>Latest Products</h1>

        <div className='grid big:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-[2%] gap-[1%] px-10 sm:pb-0 pb-20'>
          {
            data.map(product => <Card key={product._id} product={product}></Card>)
          }
        </div>
        <div className='flex justify-center big:mt-16 mt-26'>
          <NavLink to={'/allProducts'} className="btn btn-warning text-xl text-black">See All</NavLink>
        </div>
      </div>

      {/* Get connected */}
      <div className='flex md:flex-row flex-col gap-[5%] py-20 border-b bg-gray-200'>
        <div className='flex-1 flex justify-center items-center'>
          <h1 className='lg:text-3xl xs:text-3xl xxs:text-2xl text-xl xxs:font-medium font-semibold text-purple-950 text-center md:mb-0 mb-8'>WANNA GET CONNECTED WITH US?</h1>
        </div>

        <div className='flex-1 flex justify-center items-center'>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <Form onSubmit={handleFormSubmit} className="card-body">
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input type="text" name="name" className="input" placeholder="Name" required />
                <label className="label">Email</label>
                <input type="email" name="email" className="input" placeholder="Email" required />
                <button type='submit' className="btn btn-neutral mt-4">Contact Now</button>
              </fieldset>
            </Form>
          </div>
        </div>
      </div>

      {/* About section */}
      <div className='bg-lime-50 px-10'>
        <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 p-10 gap-6'>
          <div className='p-4 border-2 border-red-700 bg-white rounded-2xl'>
            <FaRegFolderOpen className='size-8'/>
            <h2 className='text-md font-semibold'><span className='sm:text-[30px] text-[20px] font-bold text-red-700'>578  </span> PROJECTS DONE</h2>
          </div>
          <div className='p-4 border-2 border-red-700 bg-white rounded-2xl'>
            <FaPeopleGroup className='size-8'/>
            <h2 className='text-md font-semibold'><span className='sm:text-[30px] text-[20px] font-bold text-red-700'>347  </span> PERMANENT CLIENTS</h2>
          </div>
          <div className='p-4 border-2 border-red-700 bg-white rounded-2xl'>
            <FaTruckMoving className='size-8'/>
            <h2 className='text-md font-semibold'><span className='sm:text-[30px] text-[20px] font-bold text-red-700'>128  </span> OWNED VEHICLES</h2>
          </div>
          <div className='p-4 border-2 border-red-700 bg-white rounded-2xl'>
            <IoManSharp className='size-8'/>
            <h2 className='text-md font-semibold'><span className='sm:text-[30px] text-[20px] font-bold text-red-700'>67  </span> SUPPORT MEMBERS</h2>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Home;