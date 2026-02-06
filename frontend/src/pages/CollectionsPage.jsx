import { useEffect, useRef, useState } from "react";
import {FaFilter} from "react-icons/fa"
import FilterSideBar from "../components/Products/FilterSideBar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";  
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
const CollectionPage = () => {
    const { collection } = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const rawParams = Object.fromEntries([...searchParams.entries()]);

    const queryParams = Object.fromEntries(
        Object.entries(rawParams).filter(
            ([_, value]) => value !== "" && value !== "1111"
        )
    );


    const sidebarRef=useRef(null)
    const [isSideBarOpen,setSideBarOpen]=useState(false)

    useEffect(() => {
        dispatch(fetchProductsByFilters({ collection, ...queryParams }));
    },[dispatch ,collection, searchParams.toString()]);

    const togglesSidebar=()=>{
        setSideBarOpen(!isSideBarOpen);
    }

    const handleClickOutside=(e)=>{
        //if clciked outside the sidebar close , first check its loaded on dom then find where user is clicking
        if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
            setSideBarOpen(false)
        }
    }

    useEffect(() => {
        // Add Event listner for clicks ,,,add & remove in bw perfor a action
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside);
        }
    },[]);

   
        
    return (
        <div className="flex flex-col lg:flex-row">
            {/* Mobile Filter button */}
            <button 
                onClick={togglesSidebar}
                className="lg:hidden border p-2 flex justify-center items-center">
              <FaFilter className="mr-2" />Filters
            </button>

            {/* Filter Sidebar */}
            <div ref={sidebarRef} 
                    className={`${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} 
                    fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
                <FilterSideBar/> 
            </div>
            {/* main content in colection poage */}
            <div className="flex grow flex-col p-4">
                <h2 className="text-2xl uppercase mb-4">All Collection</h2>
                {/* Sort Option */}
                <SortOptions/>

                {/* product grid  */}
                <ProductGrid products={products} loading={loading} error={error}/>
            </div>
        </div>
    )
    
    
};
export default CollectionPage;