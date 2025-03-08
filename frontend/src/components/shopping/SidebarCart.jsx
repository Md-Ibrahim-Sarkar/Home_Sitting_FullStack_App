import { useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import { AuthContext } from "../../context/auth/AuthContext"
import { FaTrash, FaShoppingCart, FaTimes, FaArrowRight, FaBoxOpen } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import AuthModal from "../auth/AuthModal"
import { toast } from "react-toastify"

// Utility function to calculate discounted price
const calculateDiscountedPrice = (price, discount) => {
  if (!discount) return price;
  return price - (price * discount / 100);
};

const SidebarCart = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    handleCheckout,
    isAuthModalOpen,
    setIsAuthModalOpen
  } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
      return total + (discountedPrice * item.quantity);
    }, 0);
  };

  const handleQuantityUpdate = (productId, newQuantity) => {
    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    toast.success("Item removed from cart");
  };

  const formatPrice = (price) => {
    return price.toFixed(2);
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className={`fixed top-0 right-0 z-[1000] w-full max-w-[400px] h-screen bg-white dark:bg-gray-900 shadow-2xl 
                ${location.pathname === '/shopping-cart' && 'hidden'} 
                max-md:w-full max-md:max-w-none`}
            >
              <div className="h-screen flex flex-col">
                {/* Header */}
                <div className="p-4 sm:p-6 border-b dark:border-gray-700 bg-white dark:bg-gray-900">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <FaShoppingCart className="text-2xl text-blue-500" />
                        {cart.length > 0 && (
                          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                            {cart.length}
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Shopping Cart</h2>
                    </div>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                      aria-label="Close cart"
                    >
                      <FaTimes className="text-gray-500" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
                  </p>
                </div>

                {/* Product List */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6">
                      <FaBoxOpen className="text-6xl text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg font-medium">Your cart is empty</p>
                      <p className="text-gray-400 text-sm mt-2">Add some products to your cart</p>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item, index) => {
                        const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
                        const itemTotal = discountedPrice * item.quantity;

                        return (
                          <motion.div
                            key={item.productId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                          >
                            <div className="relative flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shadow-sm"
                              />
                              {item.discount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                                  -{item.discount}%
                                </span>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white truncate">
                                {item.name}
                              </h3>

                              <div className="flex items-center mt-2">
                                <button
                                  onClick={() => handleQuantityUpdate(item.productId, item.quantity - 1)}
                                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  -
                                </button>
                                <span className="w-8 sm:w-10 text-center font-semibold text-gray-900 dark:text-white">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleQuantityUpdate(item.productId, item.quantity + 1)}
                                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>

                              <div className="mt-3 space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-base sm:text-lg font-bold text-blue-500">
                                    ${formatPrice(discountedPrice)}
                                  </span>
                                  {item.discount > 0 && (
                                    <span className="text-sm text-gray-500 line-through">
                                      ${formatPrice(item.price)}
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Total: ${formatPrice(itemTotal)}
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => handleRemoveItem(item.productId)}
                              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                              aria-label="Remove item"
                            >
                              <FaTrash className="w-5 h-5" />
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                  <div className="p-4 sm:p-6 border-t dark:border-gray-700 bg-white dark:bg-gray-900">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Subtotal:</span>
                      <span className="text-2xl font-bold text-blue-500">
                        ${formatPrice(calculateSubtotal())}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <Link to="/shopping-cart" className="block">
                        <button
                          onClick={() => setIsCartOpen(false)}
                          className="w-full py-3 px-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                        >
                          View Cart
                          <FaArrowRight />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleCheckout(user, navigate)}
                        className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={cart.length === 0}
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className={`fixed top-0 left-0 z-40 w-full h-screen bg-black/50 backdrop-blur-sm 
                ${location.pathname === '/shopping-cart' && 'hidden'}`}
            />
          </>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        redirectTo="/checkout"
      />
    </>
  )
}

export default SidebarCart