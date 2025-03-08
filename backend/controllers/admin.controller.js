const getSalesReport = async (req, res) => {
  try {
    const { range, year } = req.query;
    const currentDate = new Date();
    let startDate, endDate, previousStartDate, previousEndDate;

    // Calculate date ranges based on the selected period
    switch (range) {
      case 'week':
        startDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
        endDate = new Date();
        previousStartDate = new Date(startDate);
        previousStartDate.setDate(previousStartDate.getDate() - 7);
        previousEndDate = startDate;
        break;
      case 'month':
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        endDate = new Date();
        previousStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        previousEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        break;
      case 'year':
        startDate = new Date(year, 0, 1);
        endDate = new Date(year, 11, 31);
        previousStartDate = new Date(year - 1, 0, 1);
        previousEndDate = new Date(year - 1, 11, 31);
        break;
      default: // 'all'
        startDate = new Date(0);
        endDate = new Date();
        previousStartDate = new Date(0);
        previousEndDate = new Date(0);
    }

    // Get current period data
    const currentOrders = await Order.find({
      createdAt: { $gte: startDate, $lte: endDate },
      status: 'completed'
    });

    // Get previous period data for comparison
    const previousOrders = await Order.find({
      createdAt: { $gte: previousStartDate, $lte: previousEndDate },
      status: 'completed'
    });

    // Calculate total sales
    const totalSales = currentOrders.reduce((sum, order) => sum + order.total, 0);
    const previousTotalSales = previousOrders.reduce((sum, order) => sum + order.total, 0);

    // Calculate total orders
    const totalOrders = currentOrders.length;
    const previousTotalOrders = previousOrders.length;

    // Calculate average order value
    const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
    const previousAverageOrderValue = previousTotalOrders > 0 ? previousTotalSales / previousTotalOrders : 0;

    // Get unique customers
    const totalCustomers = new Set(currentOrders.map(order => order.user.toString())).size;
    const previousTotalCustomers = new Set(previousOrders.map(order => order.user.toString())).size;

    // Get sales by month for the chart
    const salesByMonth = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          status: 'completed'
        }
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          sales: { $sum: '$total' }
        }
      },
      {
        $project: {
          _id: 0,
          month: '$_id',
          sales: 1
        }
      },
      {
        $sort: { month: 1 }
      }
    ]);

    // Get top products
    const topProducts = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          status: 'completed'
        }
      },
      {
        $unwind: '$items'
      },
      {
        $group: {
          _id: '$items.product',
          name: { $first: '$items.name' },
          sales: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      {
        $sort: { sales: -1 }
      },
      {
        $limit: 5
      }
    ]);

    // Get recent orders
    const recentOrders = await Order.find({
      createdAt: { $gte: startDate, $lte: endDate }
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name email');

    res.json({
      totalSales,
      previousTotalSales,
      totalOrders,
      previousTotalOrders,
      averageOrderValue,
      previousAverageOrderValue,
      totalCustomers,
      previousTotalCustomers,
      salesByMonth,
      topProducts,
      recentOrders: recentOrders.map(order => ({
        _id: order._id,
        orderNumber: order.orderNumber,
        customerName: order.user.name,
        createdAt: order.createdAt,
        total: order.total,
        status: order.status
      }))
    });
  } catch (error) {
    console.error('Error generating sales report:', error);
    res.status(500).json({ message: 'Error generating sales report' });
  }
};

module.exports = {
  getSalesReport,
}; 