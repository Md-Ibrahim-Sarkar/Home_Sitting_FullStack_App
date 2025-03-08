import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaShoppingBag } from 'react-icons/fa';
import { axiosInstance } from '../lib/axiosInstanace';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/auth/AuthContext';
import ScrollToTop from '../components/ScrollToTop';

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Check for orderId in localStorage
        const orderId = localStorage.getItem('lastOrderId');
        console.log('Fetching order with ID:', orderId); // Debug log
        // Fetch order details
        const response = await axiosInstance.get(`/order/${orderId}`);
        console.log('Order details response:', response.data); // Debug log

        if (response.data) {
          setOrder(response.data);
        } else {
          throw new Error('Order not found');
        }
      } catch (error) {
        console.error('Error fetching order:', error);

        // More specific error message
        const errorMessage = error.response?.status === 404
          ? 'Order not found'
          : error.response?.data?.message || 'Failed to load order details';

        toast.error(errorMessage);


      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we have a user
    if (user) {
      fetchOrderDetails();
    }

    // Cleanup function
    return () => {
      localStorage.removeItem('lastOrderId');
    };
  }, [navigate, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Order Found</h2>
          <p className="text-gray-600 mb-4">We couldn't find your order details.</p>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors mx-auto"
          >
            <FaHome />
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <ScrollToTop />
      <div className="text-center mb-12">
        <FaCheckCircle className="mx-auto text-green-500 text-6xl mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600">Thank you for your purchase. Your order has been confirmed.</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Order ID:</span>
            <span className="font-medium">{order._id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Order Date:</span>
            <span className="font-medium">
              {new Date(order.orderDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className="font-medium capitalize">{order.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method:</span>
            <span className="font-medium">{order.paymentMethod}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
        <div className="space-y-2">
          <p className="font-medium">{order.name}</p>
          <p className="text-gray-600">{order.address}</p>
          <p className="text-gray-600">{order.district}</p>
          <p className="text-gray-600">Phone: {order.phone}</p>
          {order.notes && <p className="text-gray-600 mt-2">Notes: {order.notes}</p>}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.productId} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>
              <p className="font-medium">{item.price * item.quantity}৳</p>
            </div>
          ))}
          <div className="flex justify-between pt-4">
            <span className="font-semibold">Total Amount:</span>
            <span className="font-bold text-lg">{order.total}৳</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          <FaHome />
          Continue Shopping
        </button>
        <button
          onClick={() => navigate('/my-orders')}
          className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          <FaShoppingBag />
          View All Orders
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation; 