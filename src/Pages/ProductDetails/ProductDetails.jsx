import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useParams } from 'react-router';
import { FaStar } from 'react-icons/fa';
import { TbDownload } from 'react-icons/tb';

const ProductDetails = () => {

  const { id } = useParams();
  const { loading, setLoading, user, } = useContext(AuthContext);
  const [product, setProduct] = useState({});
  const [importQuantity, setImportQuantity] = useState(0);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/product/${id}`, {
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

  return (
    <section>
      <div className="hero bg-amber-50 py-20">
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

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
              <div className="modal-box">
                <h3 className="text-xl font-bold mb-2">Import Product</h3>

                <p className="mb-3">Enter quantity to import:</p>

                <input type="number" className="input input-bordered w-full" value={importQuantity}
                  // onChange={handleQtyChange} 
                  min="1" />

                {!isValid && (
                  <p className="text-red-600 mt-2">Quantity cannot exceed available amount!</p>
                )}

                <div className="modal-action">
                  <button className="btn btn-primary" disabled={!isValid || importQuantity <= 0} 
                  // onClick={handleSubmit}
                  >Submit</button>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;