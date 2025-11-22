import React from 'react';
import Banner from '../../Components/Banner/Banner';
import { useLoaderData } from 'react-router';

const Home = () => {

  const data = useLoaderData();
  console.log(data);

  return (
    <div>
      <Banner></Banner>

      {/* Latest Products */}
      <div className='py-20 bg-lime-50'>
        <h1 className='text-center text-3xl font-semibold text-orange-800 mb-10'>Latest Products</h1>

        <div className='grid grid-cols-3 gap-6'>

        </div>
      </div>
      

      Home
    </div>
  );
};

export default Home;