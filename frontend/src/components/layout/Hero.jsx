import React from "react";
import video1 from "../../assets/homePage.mp4";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center pb-10 pt-40 text-center">
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="w-full h-full object-cover"
          src={video1}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className="relative bg-black bg-opacity-50 w-full flex items-center justify-center p-8">
        <div className="text-center text-white">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
            Elegance in
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light">
              Every Detail
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-light text-gray-300 mt-4">
            Bold, Beautiful, and Unforgettable.
          </p>
          <Link
            to="collections/:collection"
            className="mt-6 inline-block bg-white text-gray-900 px-8 py-3 rounded-md text-lg uppercase tracking-wider hover:bg-gray-200 shadow-lg transition duration-300 ease-in-out"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
