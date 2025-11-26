import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate, useParams } from 'react-router';
import { FaStar } from 'react-icons/fa';
import { TbDownload } from 'react-icons/tb';
import { toast } from 'react-toastify';

const ProductDetails = () => {

  const { id } = useParams();
  const { loading, setLoading, user, } = useContext(AuthContext);
  const [product, setProduct] = useState({});
  const [importQuantity, setImportQuantity] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://import-export-hub-server-three.vercel.app/product/${id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProduct(data);
        setLoading(false);
      })
  }, [id, user, setLoading])

  const handleQuantityChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue === '') {
      setImportQuantity('');
      setIsValid(true);
      return;
    }

    const value = Number(inputValue);
    setImportQuantity(value);

    if (value > product.availableQuantity) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const handleSubmit = () => {
    if (!product._id) { // Check if _id exists before proceeding
      toast.error("Product ID not found.");
      return;
    }

    const importedData = {
      productId: product._id,
      productName: product.productName,
      productImage: product.productImage,
      price: product.price,
      originCountry: product.originCountry,
      rating: product.rating,
      quantity: importQuantity,
      created_at: new Date(),
      imported_by: user.email
    }

    fetch(`https://import-export-hub-server-three.vercel.app/product/import/${product._id}`, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(importedData),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProduct(prev => ({
          ...prev,
          availableQuantity: prev.availableQuantity - importQuantity
        }));
        toast.success("Import Successful");
        document.getElementById("my_modal_7").checked = false;
        navigate('/allProducts')
      })
      .catch(error => {
        console.log(error.message);
        toast.error(error.message);
      })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <section>
      <title>Import-Export-Hub - Product Details</title>
      <div className="hero bg-gray-50 py-20">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className='flex-1'>
            <img src={product.productImage} className=" rounded-lg shadow-2xl max-h-[480px] min-h-[300px] w-full" />
          </div>
          <div className='flex-1 text-center md:text-left'>
            <h1 className="text-5xl font-bold">{product.productName}</h1>
            <h2 className="badge badge-lg badge-outline text-pink-900 border-pink-600 font-medium my-6">
              Origin Country: {product.originCountry}
            </h2>
            <h3 className='text-[22px]'>Available Quantity: <span className='font-semibold text-blue-900'>{product.availableQuantity}</span></h3>
            <h3 className='text-[22px] my-3'>Price: <span className='font-semibold text-blue-900'>{product.price}</span></h3>
            <div className='flex flex-col'>
              <h3 className='text-[22px]'>Rating:
                <span className='inline-flex text-yellow-600 mx-2'>
                  {[...Array(Math.floor(product.rating || 0))].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </span> <span className='font-semibold text-blue-900'>({product.rating})</span></h3>
            </div>
            <label htmlFor="my_modal_7" className="btn btn-info mt-4 text-lg rounded-2xl">Import Now <TbDownload /></label>

            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
              <div className="modal-box">
                <h3 className="text-xl font-bold mb-2">Import Product</h3>

                <p className="mb-3">Enter quantity to import:</p>

                <input type="number" className="input input-bordered w-full" placeholder='0'
                  onChange={handleQuantityChange}
                  min="1" />

                {!isValid && (
                  <p className="text-red-600 mt-2">Quantity cannot exceed available amount!</p>
                )}

                <div className="modal-action">
                  <button className="btn btn-primary" disabled={!isValid || importQuantity <= 0}
                    onClick={handleSubmit}>Import</button>
                </div>
              </div>
              <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;