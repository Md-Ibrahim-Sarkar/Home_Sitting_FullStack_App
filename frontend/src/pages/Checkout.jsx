import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AuthModal from '../components/auth/AuthModal';
import { axiosInstance } from '../lib/axiosInstanace';
import ScrollToTop from '../components/ScrollToTop';

// Utility function to calculate discounted price
const calculateDiscountedPrice = (price, discount) => {
  if (!discount) return price;
  return price - (price * discount / 100);
};

const districts = [
  "Bagerhat", "Bandarban", "Barguna", "Barisal", "Bhola", "Bogra", "Brahmanbaria", "Chandpur",
  "Chittagong", "Chuadanga", "Comilla", "Cox's Bazar", "Dhaka", "Dinajpur", "Faridpur", "Feni",
  "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jessore", "Jhalokati", "Jhenaidah",
  "Joypurhat", "Khagrachari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur",
  "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj",
  "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore", "Nawabganj", "Netrokona",
  "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi",
  "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet",
  "Tangail", "Thakurgaon"
];

const Checkout = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(!user);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    phone: '',
    district: 'Dhaka',
    address: '',
    notes: ''
  });

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
      return total + (discountedPrice * item.quantity);
    }, 0);
  };


  const shipping = 109; // Flat rate shipping
  const subtotal = calculateSubtotal();
  const total = subtotal + shipping;

  const formatPrice = (price) => {
    return price.toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    toast.success('Item removed from cart');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      setLoading(true);
      const orderData = {
        ...formData,
        total,
        items: cart.map(item => ({
          productId: item.productId,
          name: item.name,
          price: calculateDiscountedPrice(item.price, item.discount),
          originalPrice: item.price,
          discount: item.discount,
          quantity: item.quantity,
          image: item.image
        })),
        userId: user.uid,
        status: 'pending',
        paymentMethod: 'Cash on delivery',
        orderDate: new Date()
      };

      const response = await axiosInstance.post('/order', orderData);
      console.log('Order Response:', response.data); // Debug log

      // Check if we have a valid order ID in the response
      const orderId = response.data?._id || response.data?.id || response.data?.orderId;

      if (response.status === 201 && response.data.id) {
        // Store order ID for confirmation page
        localStorage.setItem('lastOrderId', response.data.id);

        // Clear the cart
        cart.forEach(item => removeFromCart(item.productId));

        // Show success message
        toast.success('Order placed successfully!');

        // Navigate to confirmation page
        setTimeout(() => {
          navigate('/order-confirmation');
        }, 800);
      } else {
        throw new Error('Invalid order response from server');
      }
    } catch (error) {
      console.error('Order creation error:', error);
      toast.error(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/shopping-cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ScrollToTop />
        {/* Left Side - Billing Details */}
        <div>
          <h2 className="text-2xl font-bold mb-6">BILLING DETAILS</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label className="block mb-1 text-gray-700">
                আপনার নাম <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="আপনার নাম লিখুন"
                className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="form-group">
              <label className="block mb-1 text-gray-700">
                মোবাইল নাম্বার <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="১১ ডিজিটের নাম্বারটি লিখুন"
                className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
                pattern="[0-9]{11}"
              />
            </div>

            <div className="form-group">
              <label className="block mb-1 text-gray-700">
                জেলা সিলেক্ট করুন <span className="text-red-500">*</span>
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              >
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="block mb-1 text-gray-700">
                সম্পূর্ণ ঠিকানা <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="রোড নাম/নং, বাড়ি নাম/নং, ফ্ল্যাট নাম্বার..."
                className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label className="block mb-1 text-gray-700">নির্দেশনা (optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="আপনার স্পেশাল কোন নির্দেশনা থাকলে এখানে লিখুন"
                className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                rows="3"
              />
            </div>
          </form>
        </div>

        {/* Right Side - Order Summary */}
        <div>
          <h2 className="text-2xl font-bold mb-6">YOUR ORDER</h2>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between font-semibold mb-4 pb-2 border-b">
              <span>PRODUCT</span>
              <span>SUBTOTAL</span>
            </div>

            <div className="space-y-4">
              {cart.map((item) => {
                const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
                const itemTotal = discountedPrice * item.quantity;

                return (
                  <div key={item.productId} className="border-b py-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleRemoveItem(item.productId)}
                          className="hover:bg-gray-100 p-1 rounded-full transition-colors"
                        >
                          <FaTimes className="text-gray-400 hover:text-red-500" />
                        </button>
                        <div className="relative">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                          {item.discount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              -{item.discount}%
                            </span>
                          )}
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-blue-500">
                          {formatPrice(discountedPrice)}৳
                        </div>
                        {item.discount > 0 && (
                          <div className="text-sm text-gray-500 line-through">
                            {formatPrice(item.price)}৳
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        className="px-2 py-1 border rounded hover:bg-gray-100"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                        className="w-16 text-center border rounded py-1"
                        min="1"
                      />
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        className="px-2 py-1 border rounded hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right mt-2 text-sm text-gray-500">
                      Total: {formatPrice(itemTotal)}৳
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}৳</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>✅ Delivery Charge</span>
                <span>Only: {shipping}৳</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>{formatPrice(total)}৳</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="bg-gray-100 p-4 rounded-md mb-4">
                <h3 className="font-bold mb-2">Cash on delivery</h3>
                <p className="text-gray-600">পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন।</p>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Your personal data will be used to process your order. Described in our{' '}
                <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800">
                  Privacy policy
                </a>
                .
              </p>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <FaLock />
                    PLACE ORDER
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        redirectTo="/checkout"
      />
    </div>
  );
};

export default Checkout; 