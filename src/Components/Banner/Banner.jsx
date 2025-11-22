import React from 'react';

const Banner = () => {
  return (
    <section>
      <div className="hero h-[550px] overflow-hidden transition-transform duration-600 hover:scale-102"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-photo/logistics-means-transport-together-with-technological-futuristic-holograms_23-2151662955.jpg?semt=ais_hybrid&w=740&q=80)",
        }}>
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-lg">
            <h1 className="mb-5 text-5xl font-bold">Connect. Trade. Grow.</h1>
            <p className="mb-5 text-lg">Bridging the gap between buyers and sellers worldwide. Welcome to the future of international logistics.</p>
            <button className="btn btn-primary">Join the Hub</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;