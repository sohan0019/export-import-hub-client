import React from 'react';
import Banner from '../../Components/Banner/Banner';
import { NavLink, useLoaderData } from 'react-router';
import Card from '../../Components/Card/Card';

const Home = () => {

  const data = useLoaderData();
  console.log(data);

  return (
    <div>
      <Banner></Banner>

      {/* Latest Products */}
      <div className='py-20 bg-lime-50'>
        <h1 className='text-center text-3xl font-semibold text-orange-800 mb-10'>Latest Products</h1>

        <div className='grid grid-cols-3 gap-[3%] px-10'>
          {
            data.map(product => <Card product={product}></Card>)
          }
        </div>
        <div className='flex justify-center mt-16'>
          <NavLink to={'/allProducts'} className="btn btn-warning text-xl text-black">See All</NavLink>
        </div>
      </div>
      

      Home
    </div>
  );
};

export default Home;