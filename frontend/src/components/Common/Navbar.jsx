import { Link } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);

    const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
    };
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }
return (
    <>
    <nav className="container mx-auto flex items-center justify-between py-4 px-6">

        {/* Left Logo */}
        <div>
            <Link to="/" className="text-2xl font-medium">
            TRYON
            </Link>
        </div>
        
        {/* Center Navigation Links */}
        <div className="hidden md:flex space-x-6">
            <Link to="/collections/all" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Men</Link>
            <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Women</Link>
            <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Topwear</Link>
            <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Bottomwear</Link>
        </div>
        
        {/* Right Icons */}
        <div className="flex items-center space-x-4">
            <Link
                to="/admin"
                className="block bg-black px-2 rounded text-sm text-white">
                Admin
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-black">
                <FiUser className="h-5 w-5" />
            </Link>
            <button onClick={toggleDrawer} className="relative text-gray-700 hover:text-black">
                <FiShoppingCart className="h-5 w-5 text-gray-700" />
               <span className="absolute -top-1 bg-black text-white text-xs rounded-full px-2 py-0.5 ">5</span>
            </button>
          

            {/* search */}
            <div className="overflow:hidden">
                <SearchBar/>
            </div>

            <button onClick={toggleNavDrawer} className="md:hidden">
                <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
            </button>

        </div>
    </nav>
     <CartDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer}/>

     {/* mobile bavigation drawer */}
     <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0": "-translate-x-full"}`}>

            <div className="flex justify-end p-4">
                <button onClick={toggleNavDrawer}>
                <IoMdClose className="h-6 w-6 text-gray-600"/>
                </button>
            </div>

            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Menu</h2>
                <nav className="space-y-4 ">
                    <Link onClick={toggleNavDrawer} to="#" className="block text-gray-700 hover:text-black">Men</Link>
                    <Link  onClick={toggleNavDrawer} to="#" className="block  text-gray-700 hover:text-black">Women</Link>
                    <Link  onClick={toggleNavDrawer} to="#" className="block  text-gray-700 hover:text-black">Topwear</Link>
                    <Link  onClick={toggleNavDrawer} to="#" className="block  text-gray-700 hover:text-black">Bottomwear</Link>
                </nav>
            </div>

    </div>
</>
)};
export default Navbar;