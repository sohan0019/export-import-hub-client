import React, { useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';

const ImportCard = ({ product, onRemove }) => {

  const { user } = useContext(AuthContext);
  const { productName, productImage, originCountry, price, _id, quantity, rating } = product
  const navigate = useNavigate();

  const handleRemove = () => {
    if (!_id) {
      toast.error("Product ID not Found.")
    }

    Swal.fire({
      title: "Are you sure you want to remove the product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then((result) => {
      if (result.isConfirmed) {

        fetch(`https://import-export-hub-server-three.vercel.app/product/${_id}`, {
          method: 'DELETE',
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${user.accessToken}`
          },
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            onRemove(product._id);
            navigate('/myImports')
          })

        Swal.fire({
          title: "Removed!",
          text: "Your Product has been deleted.",
          icon: "success"
        });
      }
    });

  }

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <figure className="h-48 overflow-hidden">
        <img src={productImage} alt={productName} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{productName}</h2>
        <div className="badge text-xs badge-xs badge-secondary rounded-full">{originCountry}</div>
        <h2>Price: <span className='font-semibold'>{price}</span></h2>
        <h2>Imported Quantity: <span className='font-semibold'>{quantity}</span></h2>
        <div className='flex justify-between mb-2'>
          <h2>Ratings: <span className="ml-1 font-semibold">
            {typeof rating === 'number' ? rating.toFixed(1) : 'N/A'}
          </span></h2>

          <span className='flex text-yellow-600'>
            {[...Array(Math.floor(rating))].map((_, i) => (
              <FaStar key={i} />
            ))}
          </span>
        </div>

        <div className='flex flex-col items-center gap-4'>
          <Link to={`/product/${product.productId}`} className="btn bg-[#FF9900] text-black border-[#e17d00] hover:border hover:border-black rounded-xl w-40"><TbListDetails /> See Details</Link>
          <button onClick={handleRemove} className="btn bg-[#FEE502] text-[#181600] border-[#f1d800] rounded-xl hover:border hover:border-black w-40">
            <MdDeleteForever /> Remove Product
          </button>

        </div>
      </div>
    </div>
  );
};

export default ImportCard;