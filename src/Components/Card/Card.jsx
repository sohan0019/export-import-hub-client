import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router';

const Card = ({ product }) => {

  const { productName, productImage, originCountry, price, _id, availableQuantity, rating } = product

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <figure className="h-48 overflow-hidden">
        <img src={productImage} alt={productName} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{productName}</h2>
        <div className="badge text-xs badge-xs badge-secondary rounded-full">{originCountry}</div>
        <h2>Price: <span className='font-semibold'>{price}</span></h2>
        <h2>Quantity: <span className='font-semibold'>{availableQuantity}</span></h2>
        <div className='flex justify-between mb-2'>
          <h2>Ratings: <span className="ml-1 font-semibold">
            {rating.toFixed(1)}
          </span></h2>
          
          <span className='flex text-yellow-600'>
            {[...Array(Math.floor(rating))].map((_, i) => (
            <FaStar key={i} />
          ))}
          </span>
        </div>
        <Link to={`/product/${_id}`} className="btn rounded-full bg-linear-to-r from-pink-500 to-red-600 hover:from-red-600 hover:to-pink-500 text-white w-full btn-md text-base">See Details</Link>
      </div>
    </div>
  );
};

export default Card;