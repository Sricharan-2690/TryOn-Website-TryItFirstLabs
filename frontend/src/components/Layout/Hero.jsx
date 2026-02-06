import React from 'react'
import heroImg from "../../assets/Gemini_Generated_Image_fx4cohfx4cohfx4c.png";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
   <section className='relative'>
    <img src={heroImg} alt="rabbit" className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover "/>
    <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
        <div className="text-center text-white p-6 inline-block bg-black/50 backdrop-blur-md px-6 py-4 rounded-xl">
            <h1 className="text-xl md:text-6xl font-bold tracking-tighter uppercase mb-4">
            Try Before You Buy — Virtually <br />
            </h1>
            <p className="text-sm tracking-tighter md:text-lg mb-6">
            Explore our vaction-ready outfits with fast worldwide shipping.
            </p>
            <Link 
            to="#"
            className="bg-yellow-400 text-gray-950 px-6 py-2 rounded-sm text-lg">
                Shop Now
            </Link>
        </div>
    </div>
   </section>
  )
}

export default Hero