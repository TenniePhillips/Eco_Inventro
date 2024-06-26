const TransactionSchema = require("../model/transaction_model");
const {
  Types: { ObjectId },
} = require("mongoose");
const sendFcmToken = require("../config/fem_controller");
const admin = require("firebase-admin");
const InventoryModel = require("../model/inventory_model");

// const fcmToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2E4YmFlZmIyZDU0NmU5NzdiODYwMSIsImlhdCI6MTcxNTQyNDAzMCwiZXhwIjoxNzE4MDE2MDMwfQ.3e4mOVrDQzoaIeYLXFgu8Bc5nrQOngaWzCAF3Ojh9jk";
// const objectId = new ObjectId();

const createTransaction = async (req, res) => {
  const { material, quantity, action, fcmToken } = req.body;

  if (!material || !quantity || !action) {
    return res.status(400).json({
      message: "All input fields required",
      success: false,
    });
  }

  console.log("request body", req.body);

  try {
    const createTransactions = await TransactionSchema.create({
      material,
      measurement: "KG",
      quantity,
      action,
      userId: req.user.id,
    });

    checkSummaryOverview(req, res, fcmToken);
    // const message = {
    //   notification: {
    //     title: "Transaction Update",
    //     body: "Inventroy stats updated",
    //   },
    //   token: fcmToken,
    // };
    // sendFcmToken(message);

    res.status(200).json({
      message: "Transaction created successfully",
      data: createTransactions,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message ?? "Error creating transaction",
      success: false,
    });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await TransactionSchema.findByIdAndDelete(id);

    if (transaction) {
      res.status(200).json({
        success: true,
        message: "Transaction item deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message ?? "Invalid Transaction",
      success: false,
    });
  }
};

const fetchAllTransaction = async (req, res) => {
  try {
    const transactions = await TransactionSchema.find({
      userId: req.user.id,
    })
      .limit(500)
      .sort({ createdAt: -1 });

    if (transactions) {
      res.status(200).json({
        success: true,
        message: "Transaction found successfully",
        data: transactions,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message ?? "Invalid Transactions",
      success: false,
    });
  }
};

const checkSummaryOverview = async (req, res, fcmToken, userId) => {
  try {
    const id = new ObjectId(userId ? userId : req.user.id);

    // Fetch total inventory quantities for each material
    const inventory = await InventoryModel.aggregate([
      {
        $match: {
          userId: id,
          status: "delivered",
        },
      },
      {
        $group: {
          _id: "$material",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $project: {
          _id: 0,
          material: "$_id",
          total: "$totalQuantity",
        },
      },
    ]);

    // Calculate total quantities of each material from transactions
    const transaction = await TransactionSchema.aggregate([
      {
        $match: {
          userId: id,
        },
      },
      {
        $group: {
          _id: "$material",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $project: {
          _id: 0,
          material: "$_id",
          total: "$totalQuantity",
        },
      },
    ]);

    // Create objects to store material totals
    const materialInventory = {};
    const materialTotals = {};

    // Populate material totals from inventory and transactions
    inventory.forEach((item) => {
      materialInventory[item.material] = item.total;
    });

    transaction.forEach((item) => {
      materialTotals[item.material] = item.total;
    });

    // Calculate balance for each material
    const calculateTotal = {
      plastic: materialInventory.Plastic - (materialTotals.Plastic || 0),
      styrofoam: materialInventory.Styrofoam - (materialTotals.Styrofoam || 0),
      biodegradable:
        materialInventory.Biodegradable - (materialTotals.Biodegradable || 0),
    };

    // Find materials with low inventory
    const lowInventoryMaterials = Object.entries(calculateTotal)
      .filter(([material, quantity]) => quantity < 100 && quantity !== 0)
      .map(([material]) => material);
    console.log("low inventory", lowInventoryMaterials);
    // Send notification if there are materials with low inventory
    if (lowInventoryMaterials.length > 0) {
      const message = {
        notification: {
          title: "Low Inventory Alert",
          body: `${lowInventoryMaterials.join(", ")} inventory is running low.`,
        },
        token: fcmToken, // Assuming fcmToken is defined
      };
      sendFcmToken(message);
    }
  } catch (error) {
    console.log(error);
  }
};

const sumTotalOfMaterial = async (req, res) => {
  try {
    // Extract startDate and endDate from req.query or use default values
    const { startDate, endDate } = req.query;
    const currentDate = new Date();
    const defaultStartDate = new Date(currentDate);
    defaultStartDate.setDate(currentDate.getDate() - 21); // Last 7 days
    const id = new ObjectId(req.user.id);
    const transactions = await TransactionSchema.aggregate([
      // Match transactions within the date range
      {
        $match: {
          userId: id,
          createdAt: {
            $gte: startDate ? new Date(startDate) : defaultStartDate,
            $lte: endDate ? new Date(endDate) : currentDate,
          },
        },
      },
      // Group transactions by day and material
      {
        $group: {
          _id: {
            day: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
            material: "$material",
          },
          totalQuantity: { $sum: "$quantity" },
        },
      },
      // Group by day and sum the total quantity for each day
      {
        $group: {
          _id: "$_id.day",
          total: { $sum: "$totalQuantity" },
        },
      },
      // Project the result
      {
        $project: {
          _id: 0,
          date: "$_id",
          total: 1,
        },
      },
      // Sort by date in descending order
      { $sort: { date: -1 } },
    ]);

    // console.log("Transactions:", transactions);.to // Log transactions array for inspection

    // Fill in missing dates with 0 total
    const filledTransactions = fillMissingDates(
      transactions,
      startDate,
      endDate
    );

    if (transactions) {
      res.status(200).json({
        success: true,
        message: "Transactions found successfully",
        data: transactions,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Transactions not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error?.message ?? "Invalid Transactions",
      success: false,
    });
  }
};

const sumRecycledMaterial = async (req, res) => {
  try {
    const id = new ObjectId(req.user.id);
    // Extract startDate and endDate from req.query or use default values
    const { startDate, endDate } = req.query;
    const currentDate = new Date();
    const defaultStartDate = new Date(currentDate);
    defaultStartDate.setDate(currentDate.getDate() - 21); // Last 7 days

    const transactions = await TransactionSchema.aggregate([
      // Match transactions within the date range and with action "Recycled"
      {
        $match: {
          userId: id,
          createdAt: {
            $gte: startDate ? new Date(startDate) : defaultStartDate,
            $lte: endDate ? new Date(endDate) : currentDate,
          },
          action: "Recycled",
        },
      },
      // Group transactions by day and material
      {
        $group: {
          _id: {
            day: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
            material: "$material",
          },
          totalQuantity: { $sum: "$quantity" },
        },
      },
      // Group by day and sum the total quantity for each day
      {
        $group: {
          _id: "$_id.day",
          materials: {
            $push: {
              material: "$_id.material",
              total: "$totalQuantity",
            },
          },
        },
      },
      // Project the result
      {
        $project: {
          _id: 0,
          date: "$_id",
          materials: 1,
        },
      },
      // Sort by date in descending order
      { $sort: { date: -1 } },
    ]);

    if (transactions) {
      res.status(200).json({
        success: true,
        message: "Recycled transactions found successfully",
        data: transactions,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Recycled transactions not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error?.message ?? "Invalid Transactions",
      success: false,
    });
  }
};

const fillMissingDates = (transactions, startDate, endDate) => {
  const filledTransactions = [];
  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);
  while (currentDate <= lastDate) {
    const formattedDate = formatDate(currentDate);
    const foundTransaction = transactions.find((t) => t.date === formattedDate);
    filledTransactions.push({
      date: formattedDate,
      total: foundTransaction ? foundTransaction.total : 0,
    });
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }
  return filledTransactions;
};

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

module.exports = {
  fetchAllTransaction,
  createTransaction,
  deleteTransaction,
  sumTotalOfMaterial,
  sumRecycledMaterial,
  checkSummaryOverview,
};
