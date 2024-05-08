const Inventory = require("../model/inventory_model");
const Supplier = require("../model/supplier_model");
const Transaction = require("../model/transaction_model");
const {
  Types: { ObjectId },
} = require("mongoose");

async function getInventoryData(req, res) {
  let startDate, endDate;
  var interval = req.params.interval;

  if (interval === "monthly") {
    startDate = moment().subtract(6, "month").startOf("month");
    endDate = moment().endOf("month");
  } else if (interval === "weekly") {
    endDate = moment().endOf("day");
    startDate = moment().subtract(6, "days").startOf("day");
  } else {
    throw new Error("Invalid interval");
  }

  try {
    // Fetch inventory data from the database within the selected date range
    const inventoryData = await Inventory.find({
      userId: req.user.id,
      orderDate: { $gte: startDate.toDate(), $lte: endDate.toDate() },
    });

    // Group inventory data by material and calculate total quantity for each material
    const groupedData = inventoryData.reduce((acc, inventory) => {
      const material = inventory.material;
      if (!acc[material]) {
        acc[material] = 0;
      }
      acc[material] += inventory.quantity;
      return acc;
    }, {});

    // Convert grouped data to array format for charting
    const chartData = Object.keys(groupedData).map((material) => {
      return {
        material,
        totalQuantity: groupedData[material],
      };
    });

    return chartData;
  } catch (error) {
    console.error("Error fetching chart data:", error);
    throw error;
  }
}

const getOverview = async (req, res) => {
  try {
    const totalInventory = await Inventory.find({
      userId: req.user.id,
    }).countDocuments();
    const totalTransaction = await Transaction.find({
      userId: req.user.id,
    }).countDocuments();
    const totalSupplier = await Supplier.find({
      userId: req.user.id,
    }).countDocuments();

    if (totalInventory || totalTransaction || totalSupplier) {
      res.status(200).json({
        success: true,
        data: {
          totalInventory: totalInventory,
          totalSupplier: totalSupplier,
          totalTransaction: totalTransaction,
        },
        message: "data success",
      });
    } else {
      res.status(400).json({
        message: error.message ?? "Error not found",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message ?? "Error not found",
      success: false,
    });
  }
};

const getMaterialOverview = async (req, res) => {
  try {
    const inventoryData = await Inventory.find({ userId: req.user.id });

    // Group inventory data by material and calculate total quantity for each material
    const groupedData = inventoryData.reduce((acc, inventory) => {
      const material = inventory.material;
      if (!acc[material]) {
        acc[material] = 0;
      }
      acc[material] += inventory.quantity;
      return acc;
    }, {});

    // Convert grouped data to array format for charting
    const chartData = Object.keys(groupedData).map((material) => {
      return {
        material,
        totalQuantity: groupedData[material],
      };
    });

    console.log("chart data", chartData);

    if (inventoryData) {
      res.status(200).json({
        success: true,
        data: chartData,
        message: "data success",
      });
    } else {
      res.status(400).json({
        message: error.message ?? "Error not found",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message ?? "Error not found",
      success: false,
    });
  }
};

const getDailyTransactions = async (req, res) => {
  var startDate = moment().subtract(6, "days").startOf("day");
  var endDate = moment().endOf("day");
  console.log("start ", startDate.toDate());
  console.log("end ", endDate.toDate());

  try {
    const id = new ObjectId(req.user.id);
    const dailyTransactions = await Transaction.aggregate([
      {
        $match: {
          userId: id,
          createdAt: { $gte: startDate.toDate(), $lte: endDate.toDate() },
        },
      },
      {
        $group: {
          _id: {
            material: "$material",
            date: { $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
          },
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $group: {
          _id: "$_id.date",
          data: {
            $push: {
              material: "$_id.material",
              value: { $toString: "$totalQuantity" },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          data: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);
    console.log("data", dailyTransactions);
    if (dailyTransactions) {
      res.status(200).json({
        success: true,
        message: "Transaction data",
        data: dailyTransactions,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "data not found",
      });
    }
    // return dailyTransactions;
  } catch (error) {
    console.error("Error fetching daily transactions:", error);
    throw error;
  }
};

// [
//   {
//     date: "21/12/2024",
//     data: [
//       {
//         material: "plastic",
//         total: "2000",
//       },
//       {
//         material: "styrofoam",
//         total: "4000",
//       },
//     ],
//   },
//   {
//     date: "22/12/2024",
//     data: [
//       {
//         material: "plastic",
//         total: "2000",
//       },
//       {
//         material: "styrofoam",
//         total: "4000",
//       },
//     ],
//   },
// ];

// Example usage:
// getChartData()
//   .then((weeklyData) => {
//     console.log("Weekly Chart Data:", weeklyData);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

module.exports = {
  getInventoryData,
  getOverview,
  getMaterialOverview,
  getDailyTransactions,
};
