import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight, FiPhoneCall } from 'react-icons/fi'

const NewArrivals = () => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const newArrivals = [
        {
        _id: "1",
        name: "Stylish Jacket",
        price: 120,
        images: [
            {
            url: "https://picsum.photos/500/500?random=1",
            altText: "Stylish Jacket",
           }
        ]
        },
        {
        _id: "2",
        name: "Stylish Jacket",
        price: 120,
        images: [
            {
            url: "https://picsum.photos/500/500?random=2",
            altText: "Stylish Jacket",
           }
        ]
        },
        {
        _id: "3",
        name: "Stylish Jacket",
        price: 120,
        images: [
            {
            url: "https://picsum.photos/500/500?random=3",
            altText: "Stylish Jacket",
           }
        ]
        },
        {
        _id: "4",
        name: "Stylish Jacket",
        price: 120,
        images: [
            {
            url: "https://picsum.photos/500/500?random=4",
            altText: "Stylish Jacket",
           }
        ]
        },
        {
        _id: "5",
        name: "Stylish Jacket",
        price: 120,
        images: [
            {
            url: "https://picsum.photos/500/500?random=5",
            altText: "Stylish Jacket",
           }
        ]
        },
        {
        _id: "6",
        name: "Stylish Jacket",
        price: 120,
        images: [
            {
            url: "https://picsum.photos/500/500?random=6",
            altText: "Stylish Jacket",
           }
        ]
        },
        {
        _id: "7",
        name: "Stylish Jacket",
        price: 120,
        images: [
            {
            url: "https://picsum.photos/500/500?random=7",
            altText: "Stylish Jacket",
           }
        ]
        },
        {
        _id: "8",
        name: "Stylish Jacket",
        price: 120,
        images: [
            {
            url: "https://picsum.photos/500/500?random=8",
            altText: "Stylish Jacket",
           }
        ]
        },
    ];
const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
};

// Update Scroll Buttons
const updateScrollButtons = () => {
  const container = scrollRef.current;
  if (!container) return;

  const currentScrollLeft = container.scrollLeft;
  const maxScrollLeft = container.scrollWidth - container.clientWidth;

  const EPS = 5; // tolerance for rounding issues

  setCanScrollLeft(currentScrollLeft > EPS);
  setCanScrollRight(maxScrollLeft - currentScrollLeft > EPS);
};
useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons();

    return () => {
        container.removeEventListener("scroll", updateScrollButtons);
    };
}, []);  //  VERY IMPORTANT

  return (
    <section >
        <div className='container mx-auto text-center mb-10 relative'>
            <h2 className='text-3xl font-bold mb-4'>Expore new arrivals</h2>
            <p className='text-gray-600 text-lg mb-8'>
                Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
            </p>
        </div>
            {/* Scrollable content wrapper */}
            <div className="relative container mx-auto">
                 {/* Scroll Buttons */}
                <div className="absolute -top-5 -translate-y-1/2 right-4 flex space-x-3 z-10  ">
                <button
                    onClick={() => scroll("left")}
                    disabled={!canScrollLeft}
                    className="p-2 rounded-full bg-white text-black border shadow-sm disabled:opacity-30 active:scale-90 transition"
                >
                    <FiChevronLeft className="text-xl" />
                </button>

                <button
                    onClick={() => scroll("right")}
                    disabled={!canScrollRight}
                    className="p-2 rounded-full bg-white text-black border shadow-sm disabled:opacity-30 active:scale-90 transition"
                >
                    <FiChevronRight className="text-xl" />
                </button>
                </div>
                {/* scroll conetent */}
                <div 
                    ref={scrollRef} 
                    className='container mx-auto p-5 overflow-x-scroll flex space-x-6 relative'>
                    {newArrivals.map((product) => (
                        <div key={product._id} className='min-w-full sm:min-w-[50%] lg:min-w-[30%] relative'>
                            <img 
                            src={product.images[0]?.url} 
                            alt={product.images[0]?.altText || product.name} 
                            className='object-cover w-full h-[500px] rounded-lg'
                            />
                        <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white
                                p-4 rounded-b-lg">
                                <Link to={`/product/${product._id}`} className="block">
                                    <h4 className="font-medium">{product.name}</h4>
                                    <p className="mt-1">${product.price}</p>
                                </Link>
                            </div>
                        </div>
                    ))}  
                </div>
            </div>
        


    </section>
  )
}

export default NewArrivals
