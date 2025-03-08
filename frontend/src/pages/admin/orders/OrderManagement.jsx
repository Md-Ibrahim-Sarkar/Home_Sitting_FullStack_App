import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaSort, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../lib/axiosInstanace';
import OrderStatusBadge from './components/OrderStatusBadge';
import OrderEditModal from './components/OrderEditModal';
import OrderDetailsModal from './components/OrderDetailsModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';

const OrderManagement = () => {
  // States
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Status options
  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'processing', label: 'Processing', color: 'blue' },
    { value: 'shipped', label: 'Shipped', color: 'indigo' },
    { value: 'completed', label: 'Completed', color: 'green' },
    { value: 'cancelled', label: 'Cancelled', color: 'red' },
    { value: 'refunded', label: 'Refunded', color: 'purple' }
  ];

  // Fetch orders
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance('/order');
      setOrders(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch orders');
      console.error(error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyOrderId = (orderId) => {
    navigator.clipboard.writeText(orderId);
    toast.success('Order ID copied to clipboard!');
  };

  // Handle order status update
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axiosInstance.patch(`/order/update/${orderId}`, { status: newStatus });
      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      toast.success('Order status updated successfully');
    } catch (error) {
      toast.error('Failed to update order status');
      console.error(error);
    }
  };

  // Handle order deletion
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/order/delete/${selectedOrder._id}`);
      setOrders(orders.filter(order => order._id !== selectedOrder._id));
      setShowDeleteModal(false);
      toast.success('Order deleted successfully');
    } catch (error) {
      toast.error('Failed to delete order');
      console.error(error);
    }
  };

  // Filter and sort orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = (
      (order?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (order?._id || '').includes(searchTerm)
    );
    const matchesStatus = filterStatus === 'all' || order?.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0);
      case 'oldest':
        return new Date(a?.createdAt || 0) - new Date(b?.createdAt || 0);
      case 'highest':
        return (b?.total || 0) - (a?.total || 0);
      case 'lowest':
        return (a?.total || 0) - (b?.total || 0);
      default:
        return 0;
    }
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  console.log(currentOrders);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Order Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track all orders
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by order ID or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {order?._id || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {order?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <OrderStatusBadge status={order?.status || 'pending'} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    ৳{(order?.total || 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowDetailsModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 me-3 dark:hover:text-blue-300"
                      >
                        <FaEye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedOrders.length)} of {sortedOrders.length} orders
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDetailsModal && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          handleCopyOrderId={handleCopyOrderId}
          onClose={() => setShowDetailsModal(false)}
          onStatusUpdate={handleStatusUpdate}
          statusOptions={statusOptions}
        />
      )}

      {showDeleteModal && selectedOrder && (
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          title="Delete Order"
          message="Are you sure you want to delete this order? This action cannot be undone."
        />
      )}
    </div>
  );
};

export default OrderManagement; 