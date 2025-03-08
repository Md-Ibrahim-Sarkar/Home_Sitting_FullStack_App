import { useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { WishlistContext } from "../../context/WishlistContext";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (item) => {
    // Create a product object that matches the structure expected by addToCart
    const product = {
      _id: item.productId,
      name: item.name,
      price: item.price,
      image: [item.image]
    };
    addToCart(product, 1);
    toggleWishlist(product); // Remove from wishlist after adding to cart
  };

  const removeFromWishlist = (item) => {
    toggleWishlist({
      _id: item.productId,
      name: item.name,
      price: item.price,
      image: [item.image]
    });
  };

  return (
    <>
      <div className="p-4 mx-auto max-w-[1300px]">
        <h1 className="text-xl font-semibold mb-4">YOUR PRODUCTS WISHLIST</h1>
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlist.map((item) => (
              <div key={item.productId} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="relative group">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover mb-4 rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                <h3 className="text-center font-semibold text-gray-800 mb-2">{item.name}</h3>
                <p className="text-center text-orange-500 font-bold mb-3">{item.price}৳</p>
                <div className="flex justify-center">
                  <button
                    onClick={() => removeFromWishlist(item)}
                    className="text-red-500 font-semibold cursor-pointer hover:text-red-600 transition-colors flex items-center gap-2"
                  >
                    <FaHeart />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-4 flex justify-center">
            <div className="max-w-md">
              <div className="mb-8 flex justify-center">
                <FaHeart className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-gray-200" />
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                This wishlist is empty.
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-8">
                You don't have any products in the wishlist yet. You will find a lot of interesting products on our "Shop" page.
              </p>
              <Link to="/">
                <button className="bg-orange-600 text-white py-2 px-4 sm:px-6 rounded hover:bg-orange-700 transition-colors">
                  RETURN TO SHOP
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
