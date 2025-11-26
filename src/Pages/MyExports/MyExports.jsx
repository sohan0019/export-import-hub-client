import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import ExportCard from '../../Components/ExportCard/ExportCard';

const MyExports = () => {

  const [product, setProduct] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://import-export-hub-server-three.vercel.app/myExports?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
  }, [user, setLoading])

  const handleRemoveFromUI = (id) => {
    setProduct(prev => prev.filter(product => product._id !== id));
  };

  const handleUpdateProduct = (id, updatedValues) => {
    setProduct(prev =>
      prev.map(p => p._id === id ? { ...p, ...updatedValues } : p)
    );
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-primary w-20"></span>
      </div>
    )
  }

  return (
    <section>
      <div className='bg-gray-50 py-10'>
        <h1 className="text-2xl text-center font-bold mb-10">Exported Products</h1>
        <div className="grid big:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 px-10">
          {product.length === 0 ? (
            <p className="col-span-3 text-center text-xl font-semibold">
              No Items Found
            </p>
          ) : (
            product.map(product => <ExportCard key={product._id} product={product} onUpdate={handleUpdateProduct} onRemove={handleRemoveFromUI}/>)
          )}
        </div>
      </div>
    </section>
  );
};

export default MyExports;