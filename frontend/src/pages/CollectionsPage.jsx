import { useEffect, useRef, useState } from "react";
import {FaFilter} from "react-icons/fa"
import FilterSideBar from "../components/Products/FilterSideBar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
const CollectionPage = () => {
    const [products, setProducts] = useState([]);
    const sidebarRef=useRef(null)
    const [isSideBarOpen,setSideBarOpen]=useState(false)

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

    useEffect(() => {
        setTimeout(() => {
            const fetchedProducts =[
                {
                _id: 1,
                name: "Product 1",
                price: 100,
                images: [{ url: "https://picsum.photos/500/500?random=1"}],
                },
                {
                _id: 2,
                name: "Product 2",
                price: 100,
                images: [{ url: "https://picsum.photos/500/500?random=2"}],
                },
                {
                _id: 3,
                name: "Product 3",
                price: 100,
                images: [{ url: "https://picsum.photos/500/500?random=3"}],
                },
                {
                _id: 4,
                name: "Product 4",
                price: 100,
                images: [{ url: "https://picsum.photos/500/500?random=4"}],
                },
                {
                _id: 1,
                name: "Product 1",
                price: 100,
                images: [{ url: "https://picsum.photos/500/500?random=1"}],
                },
                {
                _id: 2,
                name: "Product 2",
                price: 100,
                images: [{ url: "https://picsum.photos/500/500?random=2"}],
                },
                {
                _id: 3,
                name: "Product 3",
                price: 100,
                images: [{ url: "https://picsum.photos/500/500?random=3"}],
                },
                {
                _id: 4,
                name: "Product 4",
                price: 100,
                images: [{ url: "https://picsum.photos/500/500?random=4"}],
                },
            ];
        setProducts(fetchedProducts)
        },1000)
    }, []);
        
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
                <ProductGrid products={products}/>
            </div>
        </div>
    )
    
    
};
export default CollectionPage;