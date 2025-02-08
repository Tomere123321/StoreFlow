const Order = require("../Model/ordersModel");
const Product = require("../Model/ProductsModel");
const User = require ("../Model/usersModel")

const getAnalyticsData = async () => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();

  const salesData = await Order.aggregate([
    {
      $group: {
        _id: null, // it groups all documents together,
        totalSales: { $sum: 1 }, // $sum: 1 means count the number of documents
        totalRevenue: { $sum: "$totalAmount" }, // $sum: "$totalAmount" means sum the totalAmount field of all documents
      },
    },
  ]);

  const { totalSales, totalRevenue } = salesData[0] || {
    totalSales: 0,
    totalRevenue: 0,
  };

  return {
    users: totalUsers,
    products: totalProducts,
    totalSales,
    totalRevenue,
  };
};

const getDailySalesData = async (startDate, endDate) => {
  try {
    const dailySalesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          sales: { $sum: 1 },
          revenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const dateArray = getDatesInRange(startDate, endDate);

    return dateArray.map((date) => {
      const foundData = dailySalesData.find((item) => item._id === date);

      return {
        date,
        sales: foundData?.sales || 0,
        revenue: foundData?.revenue || 0,
      };
    });
  } catch (error) {
    throw error;
  }
};

function getDatesInRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

// we will get an array of objects, each object will represent a day and will have the following structure:
// {
//     date: "2021-08-01",
//     sales: 5,
//     revenue: 100
// }
// The date will be in the format "YYYY-MM-DD", sales will be the number of orders placed on that day, and revenue will be the total revenue generated on that day.
// The array will contain data for the last 7 days, starting from the current date.
// The data will be sorted by date in ascending order.
// If there is no data for a particular day, the sales and revenue values will be 0.

module.exports = { getAnalyticsData, getDailySalesData };
