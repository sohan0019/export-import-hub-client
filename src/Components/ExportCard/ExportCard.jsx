import React, { useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';
// import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router';
import { GrUpdate } from 'react-icons/gr';

const ExportCard = ({ product, onUpdate, onRemove }) => {

  const { user } = useContext(AuthContext);
  const { productName, productImage, originCountry, price, _id, availableQuantity, rating } = product

  const handleDelete = () => {
    if (!_id) {
      toast.error("Product ID not Found.")
      return;
    }

    Swal.fire({
      title: "Are you sure you want to delete the product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
      .then((result) => {
        if (result.isConfirmed) {

          fetch(`http://localhost:3000/exportProduct/${_id}`, {
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

              Swal.fire({
                title: "Deleted!",
                text: "Your Product has been deleted.",
                icon: "success"
              });
            })
            .catch(error => {
              console.error("Deletion error:", error);
              toast.error("Failed to delete product.");
            });
        }
      });

  }

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = {
      productName: e.target.name.value,
      productImage: e.target.photo.value,
      originCountry: e.target.country.value,
      price: Number(e.target.price.value),
      availableQuantity: Number(e.target.availableQuantity.value),
      rating: Number(e.target.rating.value),
      created_at: new Date(),
      created_by: user.email,
    }

    fetch(`http://localhost:3000/exportProduct/${_id}`, {
      method: 'PUT',
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${user.accessToken}`
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        document.getElementById(modalId).checked = false;
        onUpdate(_id, formData);
        toast.success("Successfully Updated.")
      })
      .catch(error => {
        console.log(error);
      })
  }
  
  const modalId = `modal_${_id}`;

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <figure className="h-48 overflow-hidden">
        <img src={productImage} alt={productName} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{productName}</h2>
        <div className="badge text-xs badge-xs badge-secondary rounded-full">{originCountry}</div>
        <h2>Price: <span className='font-semibold'>{price}</span></h2>
        <h2>Available Quantity: <span className='font-semibold'>{availableQuantity}</span></h2>
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

          <label htmlFor={modalId} className="btn bg-[#FF9900] text-black border-[#e17d00] hover:border hover:border-black rounded-xl w-40"><GrUpdate />  Update Product</label>

          <input type="checkbox" id={modalId} className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <h3 className="text-lg font-bold">Update Product</h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="label font-medium mb-2 text-black text-base">Name</label>
                    <input type="text" defaultValue={productName} name="name" required className="input w-full rounded-full focus:border-0 focus:outline-gray-200" placeholder="Enter name" />
                  </div>
                  <div>
                    <label className="label font-medium mb-2 text-black text-base">PhotoURL</label>
                    <input type="text" defaultValue={productImage} name="photo" required className="input w-full rounded-full focus:border-0 focus:outline-gray-200" placeholder="Enter name" />
                  </div>
                  <div>
                    <label className="label font-medium mb-2 text-black text-base">Origin Country</label>
                    <input type="text" defaultValue={originCountry} name="country" required className="input w-full rounded-full focus:border-0 focus:outline-gray-200" placeholder="Enter name" />
                  </div>
                  <div>
                    <label className="label font-medium mb-2 text-black text-base">Price</label>
                    <input type="number" defaultValue={price} name="price" required className="input w-full rounded-full focus:border-0 focus:outline-gray-200" placeholder="Enter name" />
                  </div>
                  <div>
                    <label className="label font-medium mb-2 text-black text-base">Available Quantity</label>
                    <input type="number" defaultValue={availableQuantity} name="availableQuantity" required className="input w-full rounded-full focus:border-0 focus:outline-gray-200" placeholder="Enter name" />
                  </div>
                  <div>
                    <label className="label font-medium mb-2 text-black text-base">Rating</label>
                    <input type="number" defaultValue={rating} name="rating" required className="input w-full rounded-full focus:border-0 focus:outline-gray-200" step="any" placeholder="Enter name" />
                  </div>
                  <button className='btn btn-secondary'>Update</button>
                </form>
            </div>
            <label className="modal-backdrop" htmlFor={modalId}>Close</label>
          </div>

          <button onClick={handleDelete} className="btn bg-[#FEE502] text-[#181600] border-[#f1d800] rounded-xl hover:border hover:border-black w-40">
            <MdDeleteForever /> Delete Product
          </button>

        </div>
      </div>
    </div>
  );
}

export default ExportCard;