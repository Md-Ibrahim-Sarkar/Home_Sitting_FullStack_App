import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import { axiosInstance } from '../../lib/axiosInstanace';
import { FaUsers, FaShoppingCart, FaBox, FaArrowLeft } from 'react-icons/fa';

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    recentOrders: []
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const [usersRes, ordersRes, productsRes] = await Promise.all([
          axiosInstance.get('/auth/users'),
          axiosInstance.get('/order'),
          axiosInstance.get('/products')
        ]);

        setStats({
          totalUsers: usersRes.data.length,
          totalOrders: ordersRes.data.length,
          totalProducts: productsRes.data.length,
          recentOrders: ordersRes.data.slice(0, 5) // Get latest 5 orders
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="p-6 max-[640px]:p-2">


      {/* Welcome Message */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Welcome back, {user?.displayName || 'Admin'}
        </h2>
        <p className="text-gray-600">
          Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalUsers}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalOrders}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FaShoppingCart className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalProducts}</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <FaBox className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recentOrders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order._id.slice(-6)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;