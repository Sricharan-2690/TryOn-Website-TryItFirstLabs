import React from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilters, fetchProductsByFilters } from '../../redux/slices/productsSlice';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleSearchToggle=()=>{
        setIsOpen(!isOpen);
    }
    const handleSearch=(e)=>{
        e.preventDefault();
        dispatch(setFilters ({ search: searchTerm }));
        dispatch(fetchProductsByFilters({ search: searchTerm }));
        navigate(`/collections/all?search=${searchTerm}`);
        setIsOpen(false);
    }
  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300
                     ${isOpen ? "absolute left-0 top-0 w-full bg-white h-24 z-50":"w-auto" }`}>
        {isOpen? 
        (<form onSubmit={handleSearch} className="relative flex items-center justify-center w-full">
            <div className='relative w-1/2'>
                <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
               className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
                />
                <button type='submit' className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
                    <HiMagnifyingGlass className="h-6 w-6" />
                </button>
                {/* close-btn */}
                <button 
                    type="button"
                    onClick={handleSearchToggle}
                    className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                    >
                    <HiMiniXMark className="h-6 w-6" />
                    </button>

            </div>
        </form>): 
        (<button onClick={handleSearchToggle}>
            <HiMagnifyingGlass />
        </button>)}
    </div>
  )
}

export default SearchBar
