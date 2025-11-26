import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import formBg from '../../assets/Images/FormBg.png'
import { useNavigate } from 'react-router';

const AddProduct = () => {

  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      productName: e.target.name.value,
      productImage: e.target.photoURL.value,
      originCountry: e.target.country.value,
      availableQuantity: Number(e.target.quantity.value), 
      price: Number(e.target.price.value),
      rating: Number(e.target.rating.value), 
      created_at: new Date(),
      created_by: user.email,
    }

    if(formData.availableQuantity<0 || formData.price<0) {
      toast.error("Invalid quantity or price")
      return
    }

    fetch('https://import-export-hub-server-three.vercel.app/products', {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${user.accessToken}`
      },
      body: JSON.stringify(formData),
    }, [user])
    .then(res => res.json())
    .then(data => {
      console.log(data);
      toast.success("Product added Successfully.")
      navigate('/myExports')
      e.target.reset();
    })
    .catch(error => {
      toast.error(error.message)
    })
  }

  return (
    <section>
      <title>Import-Export-Hub - AddProduct</title>
      <div className='py-20 bg-gray-50 bg-cover bg-center relative px-5' style={{ 
      backgroundImage: `url(${formBg})`}}>
        <div className="card border border-orange-500 bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl ">
          <div className="card-body p-6 relative">
            <h2 className="text-2xl font-bold text-center mb-6">Add New Model</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="label font-medium text-black text-base mb-2">Product Name</label>
                <input type="text" name="name" required className="input w-full rounded-full focus:border-0 focus:outline-gray-200" placeholder="Enter name" />
              </div>

              {/* Photo URL */}
              <div>
                <label className="label font-medium text-black text-base mb-2">Product Image</label>
                <input type="url" name="photoURL" required className="input w-full rounded-full focus:border-0 focus:outline-gray-200" placeholder="https://example.com/image.jpg" />
              </div>

              {/* Origin Country */}
              <div>
                <label className="label font-medium text-black text-base mb-2">Origin Country</label>
                <input type="text" name="country" required className="input w-full rounded-full focus:border-0 focus:outline-gray-200" placeholder="Country Name" />
              </div>

              {/* Available Quantity */}
              <div>
                <label className="label font-medium text-black text-base mb-2">Available Quantity</label>
                <input type="number" name="quantity" required className="input w-full rounded-full focus:border-0 focus:outline-gray-200" placeholder="0000...." />
              </div>

              {/* Price */}
              <div>
                <label className="label font-medium text-black text-base mb-2">Price</label>
                <input type="number" name="price" required className="input w-full rounded-full focus:border-0 focus:outline-gray-200" placeholder="$0000..." />
              </div>

              {/* Rating */}
              <div>
                <label className="label font-medium text-black text-base mb-2">Rating</label>
                <input type="number" name="rating" required className="input w-full rounded-full focus:border-0 focus:outline-gray-200" placeholder="5" step="0.1"/>
              </div>

              {/* Add Product Button */}
              <button type="submit" className="btn w-full text-white mt-6 rounded-full bg-linear-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700">Add Product</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;