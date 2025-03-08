import { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axiosInstanace";
import { AuthContext } from "../../context/auth/AuthContext";
import ScrollToTop from "../ScrollToTop";
import OrderDetailsModal from "../../pages/admin/orders/components/OrderDetailsModal";
import { toast } from "react-toastify";
import { FaCopy } from "react-icons/fa";
import Swal from 'sweetalert2'

const My_Order = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user } = useContext(AuthContext);

  const filteredOrders = filter === "all" ? orders : orders.filter(order => order.status === filter);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance(`/order/user/${user?.uid}`);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to fetch orders');
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user?.uid]);

  const handleCancelOrder = async (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!"
    }).then(async (result) => {
      if (result.isConfirmed) {

        try {
          await axiosInstance.patch(`/order/update/${orderId}`, { status: 'cancelled from user' });
          setOrders(orders.map(order =>
            order._id === orderId ? { ...order, status: 'cancelled from user' } : order
          ));
          Swal.fire({
            title: "Cancelled !",
            text: "Your order has been cancelled.",
            icon: "success"
          });
        } catch (error) {
          console.error('Error cancelling order:', error);
          toast.error('Failed to cancel order');
        }
      }
    });
  };

  const handleCopyOrderId = (orderId) => {
    navigator.clipboard.writeText(orderId);
    toast.success('Order ID copied to clipboard!');
  };

  // Status options
  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'processing', label: 'Processing', color: 'blue' },
    { value: 'shipped', label: 'Shipped', color: 'indigo' },
    { value: 'completed', label: 'Completed', color: 'green' },
    { value: 'cancelled', label: 'Cancelled', color: 'red' },
    { value: 'cancelled from user', label: 'Cancelled by You', color: 'red' },
    { value: 'refunded', label: 'Refunded', color: 'purple' }
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'cancelled from user':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case 'cancelled from user':
        return 'Cancelled by You';
      case 'cancelled':
        return 'Cancelled by Admin';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const formatPrice = (price) => {
    return `৳${price.toLocaleString()}`;
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <ScrollToTop />
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Title Section */}
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center sm:text-left sm:text-2xl">
              My Orders
            </h2>

            {/* Filter Dropdown */}
            <div className="relative w-full max-w-xs flex sm:justify-end">
              <div className="w-full">
                <label htmlFor="order-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-center sm:text-left">
                  Filter Orders
                </label>
                <div className="relative mt-2">
                  <select
                    id="order-type"
                    className="block w-full appearance-none rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 pr-10 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:text-white"
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="all">All Orders</option>
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
                    ⏬
                  </div>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No orders found</p>
            </div>
          ) : (
            <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
              {[...filteredOrders].reverse().map((order) => (
                <div key={order._id} className="flex flex-wrap items-center gap-y-4 py-6">
                  <dl className="w-1/2 sm:w-1/4  lg:w-auto lg:flex-1">
                    <dt className="text-base inline-flex font-medium text-gray-500 dark:text-gray-400">Order ID:</dt> <button
                      onClick={() => handleCopyOrderId(order._id)}
                      className="p-1 text-gray-500 inline-flex  hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400 transition-colors duration-200"
                      title="Copy Order ID"
                    >
                      <FaCopy className="w-4 h-4" />
                    </button>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <span>{order._id.slice(0, 15)}</span>

                    </dd>
                  </dl>

                  <dl className="w-1/2 sm:w-1/4 lg:w-auto gap-2 lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                      {new Date(order.orderDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </dd>
                  </dl>

                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{formatPrice(order.total)}</dd>
                  </dl>

                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                    <dd className="mt-1.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(order.status)}`}>
                        {formatStatus(order.status)}
                      </span>
                    </dd>
                  </dl>

                  <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto transition-colors duration-200"
                      >
                        Cancel order
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto transition-colors duration-200"
                    >
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          handleCopyOrderId={handleCopyOrderId}
          onClose={() => setSelectedOrder(null)}
          onStatusUpdate={() => { }} // Empty function since users can't update status
          className=" mt-7"
        />
      )}
    </section>
  );
};

export default My_Order;
