import React, { useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useLoaderData } from 'react-router';
import Card from '../../Components/Card/Card';
import { toast } from 'react-toastify';

const AllProducts = () => {

  const data = useLoaderData();
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(data)

  const handleSearch = (e) => {
    e.preventDefault()

    const searchedText = e.target.search.value;
    setLoading(true);

    fetch(`http://localhost:3000/search?search=${searchedText}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setModel(data);
        setLoading(false);
      })
      .catch(error => {
        toast.error(error.message);
        setLoading(false);
      })
  }

  return (
    <section>
      <div className='bg-gray-50 py-10'>
        <h1 className="text-2xl text-center font-bold"> All Products</h1>

        <form onSubmit={handleSearch} className="text-center mt-5  mb-10 flex gap-2 justify-center">
          <label className="input rounded-full">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" placeholder="Search" name="search" />
          </label>
          <button className="btn btn-secondary rounded-full">{loading ? "Searching..." : "Search"}</button>
        </form>

        <div className="grid grid-cols-3 gap-6 px-10">
          {model.length === 0 ? (
            <p className="col-span-3 text-center text-xl font-semibold">
              No Items Found
            </p>
          ) : (
            model.map(product => <Card key={product._id} product={product} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default AllProducts;