import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft, FaTruck, FaShieldAlt, FaCreditCard } from "react-icons/fa";
import { AuthContext } from "../../context/auth/AuthContext";
import AuthModal from "../auth/AuthModal";

const ShoppingCart = () => {
  const { cart, removeFromCart, updateQuantity, handleCheckout, isAuthModalOpen, setIsAuthModalOpen } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price;
    return price - (price * (discount / 100));
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
      return total + (discountedPrice * item.quantity);
    }, 0);
  };

  const shipping = 109; // Fixed shipping cost
  const subtotal = calculateSubtotal();
  const total = subtotal + shipping;

  const formatPrice = (price) => {
    return price.toFixed(2);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <FaShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <FaArrowLeft />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <FaArrowLeft />
              Continue Shopping
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => {
                const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
                const itemTotal = discountedPrice * item.quantity;

                return (
                  <div
                    key={item.productId}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex items-start gap-6"
                  >
                    {/* Product Image */}
                    <div className="w-32 h-32 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            SKU: {item.sku || 'N/A'}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                        >
                          <FaTrash className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            >
                              <FaMinus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 text-gray-900 dark:text-white font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            >
                              <FaPlus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 justify-end">
                            {item.discount > 0 && (
                              <span className="text-sm text-red-600 dark:text-red-400">
                                -{item.discount}%
                              </span>
                            )}
                            <div>
                              <p className="text-lg font-semibold text-blue-500">
                                {formatPrice(discountedPrice)}৳
                              </p>
                              {item.discount > 0 && (
                                <p className="text-sm text-gray-500 line-through">
                                  {formatPrice(item.price)}৳
                                </p>
                              )}
                              <p className="text-sm text-gray-500 mt-1">
                                Total: {formatPrice(itemTotal)}৳
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sticky top-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {formatPrice(subtotal)}৳
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">✅ Delivery Charge</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      Only: {shipping}৳
                    </span>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {formatPrice(total)}৳
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <FaTruck className="w-5 h-5" />
                    <span>Free shipping on orders over 10000৳</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <FaShieldAlt className="w-5 h-5" />
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <FaCreditCard className="w-5 h-5" />
                    <span>Cash on delivery available</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => handleCheckout(user, navigate)}
                  className="mt-8 w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2"
                  disabled={cart.length === 0}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        redirectTo="/checkout"
      />
    </>
  );
};

export default ShoppingCart;