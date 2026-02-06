import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";
const ProductDetails = ({productId}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.products);

    const { user, guestId} = useSelector((state) => state.auth);

    const [mainImage, setMainImage] = useState("")
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isButtonDisabled2, setIsButtonDisabled2] = useState(false);

    const [openTryOn, setOpenTryOn] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [tryNowLoading, setTryNowLoading] = useState(false);

    const productFetchId = productId || id;
    useEffect(() => {
        if (productFetchId) {
            dispatch(fetchProductDetails(productFetchId));
            dispatch(fetchSimilarProducts({ id: productFetchId }));
        }
    },[dispatch, productFetchId]);

    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
         setMainImage(selectedProduct.images[0].url);
        }
    }, [selectedProduct]);

    const handleQuantityChange = (action) => {
        if (action === "plus") setQuantity((prev) => prev+1)
        if (action ==="minus" && quantity > 1) setQuantity((prev) => prev-1)
    };

    const handleTryOn = () => {
        // console.log("Try On Clicked");
        setOpenTryOn(true);
    };
    const handleTryNow = () => {
         if (!selectedImage) return;
        setTryNowLoading(true);
        // console.log("Uploaded Image:", selectedImage);

        // simulate API call
        setTimeout(() => {
            setTryNowLoading(false);
            setOpenTryOn(false);
            setSelectedImage(null);
        }, 1500);
    };


    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            toast.error("Please select a size and color",{
                duration:1000,
            })
            return
        }
        setIsButtonDisabled(true)
        dispatch(addToCart({
                    productId: productFetchId,
                    quantity,
                    size: selectedSize,
                    color: selectedColor,
                    guestId,
                    userId: user?._id,
                })
        ).then(() => {
            toast.success("Product added to cart!", { duration: 1000 });
        }).finally(() => {
            setIsButtonDisabled(false);
        });
    }

if (loading) {
    return <p className="text-center">Loading product details...</p>;
}
if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
}

return (
        <div className="p-6 ">
            { selectedProduct && (
                <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
                    <div className="flex flex-col md:flex-row">
                        {/* Left Thumbnails */}
                        <div className="hidden md:flex flex-col space-y-4 mr-6">
                            {selectedProduct.images.map((image, index) => (
                            <img
                            key={index}
                            src={image.url}
                            alt={image.altText || `Thumbnail ${index}`}
                            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage===image.url? "border-black": "border-gray-200" }`}
                            onClick={()=>setMainImage(image.url)}
                            />
                            ))}
                        </div>
                        {/* Main Image */}
                        <div className="md:w-1/2">
                            <div className="mb-4">
                                <img
                                src={mainImage}
                                alt="Main Product"
                                className="w-full h-auto object-cover rounded-lg"
                                />
                            </div>
                        </div>
                        {/* Mobile Thumbnail */}
                        <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
                            {selectedProduct.images.map((image, index) => (
                            <img
                            key={index}
                            src={image.url}
                            alt={image.altText || `Thumbnail ${index}`}
                            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage===image.url? "border-black": "border-gray-200" }`}
                            onClick={()=>setMainImage(image.url)}
                            />
                            ))}
                        </div>
                        {/* Right Side */}
                        <div className="md:w-1/2 md:ml-10">
                            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                            {selectedProduct.name}
                            </h1>
                            <p className="text-lg text-gray-600 mb-1 line-through">
                            {selectedProduct.originalPrice &&`${selectedProduct.originalPrice}`}
                            </p>
                            <p className="text-xl text-gray-500 mb-2"> $ {selectedProduct.price}</p>
                            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                            {/* colors btns */}
                            <div className="mb-4">
                                <p className="text-gray-700">Color:</p>
                                <div className="flex gap-2 mt-2">
                                    {selectedProduct.colors.map((color) =>(
                                    <button 
                                        key={color} 
                                        className={`w-8 h-8 rounded-full border ${selectedColor===color? "border-4 border-black":"border-gray-300"}`}
                                        onClick={()=>setSelectedColor(color)}
                                        style={{ backgroundColor: color.toLocaleLowerCase(),
                                                filter: "brightness(0.5)"
                                                }}
                                        ></button>
                                    ))}
                                </div>
                            </div>
                            {/* sizes btns */}
                            <div className="mb-4">
                                <p className="text-gray-700">Size:</p>
                                <div className="flex gap-2 mt-2">
                                    {selectedProduct.sizes.map((size) => (
                                    <button 
                                        key={size}
                                        className={`px-4 py-2 rounded border ${selectedSize===size? "bg-black text-white":""}`}
                                        onClick={()=>setSelectedSize(size)}
                                    >
                                    {size}
                                    </button>
                                    ))}
                                </div>
                            </div>
                            {/* quantity */}
                            <div className="mb-6">
                                <p className="text-gray-700">Quantity:</p>
                                <div className="flex items-center space-x-4 mt-2">
                                    <button 
                                        onClick={()=>handleQuantityChange("minus")}
                                        className="px-2 py-1 bg-gray-200 rounded text-lg">
                                    -
                                    </button>
                                    <span className="text-lg">{quantity}</span>
                                    <button 
                                        onClick={()=>handleQuantityChange("plus")}
                                        className="px-2 py-1 bg-gray-200 rounded text-lg">
                                    +
                                    </button>
                                </div>
                            </div>

                            <button 
                                onClick={handleAddToCart}
                                disabled={isButtonDisabled}
                                className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${isButtonDisabled?" cursor-not-allowed opacity-50":"hover:bg-gray-900"}`}>
                            {isButtonDisabled? "Adding..":" ADD TO CART"}
                            </button>
                            <button 
                                onClick={handleTryOn}
                                disabled={isButtonDisabled2}
                                className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${isButtonDisabled2?" cursor-not-allowed opacity-50":"hover:bg-gray-900"}`}>
                            {isButtonDisabled2? "Loading..":" TRY ON"}
                            </button>
                            <div className="mt-10 text-gray-700">
                                <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
                                <table className="w-full text-left text-sm text-gray-600">
                                    <tbody>
                                        <tr>
                                        <td className="py-1">Brand</td>
                                        <td className="py-1">{selectedProduct.brand}</td>
                                        </tr>
                                        <tr>
                                        <td className="py-1">Material</td>
                                        <td className="py-1">{selectedProduct.material}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20">
                        <h2 className="text-2xl text-center font-medium mb-4">
                        You May Also Like
                        </h2>
                        <ProductGrid products={similarProducts} loading={loading} error={error}/>
                    </div>

                </div>
            )}
            {openTryOn && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">

      <h2 className="text-xl font-semibold mb-4">
        Upload Image
      </h2>

     <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-black transition mb-4">
  
  {selectedImage ? (
    <img
      src={URL.createObjectURL(selectedImage)}
      alt="Preview"
      className="w-full h-full object-cover rounded-xl"
    />
  ) : (
    <div className="flex flex-col items-center text-gray-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 mb-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"
        />
      </svg>

      <p className="text-sm">Click to upload image</p>
      <p className="text-xs text-gray-400 mt-1">
        JPG, PNG only
      </p>
    </div>
  )}

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setSelectedImage(e.target.files[0])}
    className="hidden"
  />
</label>


      <button
        onClick={handleTryNow}
        disabled={!selectedImage || tryNowLoading}
        className={`w-full py-2 rounded text-white ${
          tryNowLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black hover:bg-gray-900"
        }`}
      >
        {tryNowLoading ? "Loading..." : "Try Now"}
      </button>

      <button
        onClick={() => setOpenTryOn(false)}
        className="w-full mt-3 py-2 rounded border"
      >
        Cancel
      </button>

    </div>
  </div>
)}

        </div>
    );
};
export default ProductDetails;