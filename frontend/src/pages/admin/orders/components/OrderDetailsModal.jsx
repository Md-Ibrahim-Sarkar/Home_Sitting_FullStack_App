import React, { useContext } from 'react';
import { FaTimes, FaTruck, FaBox, FaUser, FaCreditCard, FaMapMarkerAlt, FaCopy } from 'react-icons/fa';
import OrderStatusBadge from './OrderStatusBadge';
import { AuthContext } from '../../../../context/auth/AuthContext';

const OrderDetailsModal = ({ order, onClose, onStatusUpdate, statusOptions, handleCopyOrderId, className }) => {
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const { user } = useContext(AuthContext);
  const isAdmin = user?.Database?.role === 'admin';

  const formatPrice = (price) => {
    if (!price) return '৳0';
    return `৳${price.toLocaleString()}`;
  };

  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-[#00000062] flex items-center justify-center z-50">
      <div className={`bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl mx-4 max-h-[60vh] overflow-y-auto ${className}`}>
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Order Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Order Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Order #{order._id}
                <button
                  onClick={() => handleCopyOrderId(order._id)}
                  className="p-1 text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400 transition-colors duration-200"
                  title="Copy Order ID"
                >
                  <FaCopy className="w-4 h-4" />
                </button>
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <OrderStatusBadge status={order.status === 'cancelled from user' && !isAdmin ? 'cancelled by You' : order.status || 'pending'} />
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Order Items
            </h4>
            <div className="space-y-4">
              {order.items?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item?.image || '/placeholder.png'}
                      alt={item?.name || 'Product'}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                        {item?.name || 'N/A'}
                      </h5>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Quantity: {item?.quantity || 0}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatPrice(item?.price)}
                    </p>
                    {item?.discount > 0 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        {formatPrice(item?.originalPrice)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Information */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <FaUser className="w-5 h-5 mr-2" />
              Customer Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
                <p className="text-sm text-gray-900 dark:text-white">{order?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-sm text-gray-900 dark:text-white">{order?.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                <p className="text-sm text-gray-900 dark:text-white">{order?.phone || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <FaMapMarkerAlt className="w-5 h-5 mr-2" />
              Shipping Information
            </h4>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-900 dark:text-white">
                {order?.address || 'N/A'}
              </p>
              <p className="text-sm text-gray-900 dark:text-white">
                {order?.district || 'N/A'}, {order?.postalCode || 'N/A'}
              </p>
              <p className="text-sm text-gray-900 dark:text-white">
                {order?.country || 'N/A'}
              </p>
            </div>
          </div>

          {/* Payment Information */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <FaCreditCard className="w-5 h-5 mr-2" />
              Payment Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Method</p>
                <p className="text-sm text-gray-900 dark:text-white">{order?.paymentMethod || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Status</p>
                <p className="text-sm text-gray-900 dark:text-white capitalize">{order?.paymentStatus || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Transaction ID</p>
                <p className="text-sm text-gray-900 dark:text-white">{order?.transactionId || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Order Summary
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Subtotal</span>
                <span className="text-sm text-gray-900 dark:text-white">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Shipping</span>
                <span className="text-sm text-gray-900 dark:text-white">{formatPrice(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Tax</span>
                <span className="text-sm text-gray-900 dark:text-white">{formatPrice(order.tax)}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Total</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Update */}
          {statusOptions && (
            <div className="mt-6">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                <FaTruck className="w-5 h-5 mr-2" />
                Update Order Status
              </h4>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => (
                  <button
                    key={status.value}
                    onClick={() => onStatusUpdate(order._id, status.value)}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${order.status === status.value
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal; 