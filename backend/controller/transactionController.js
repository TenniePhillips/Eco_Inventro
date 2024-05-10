const TransactionSchema = require("../model/transaction_model");
const nodemailer = require("nodemailer");
const {
  Types: { ObjectId },
} = require("mongoose");

// const objectId = new ObjectId();

const createTransaction = async (req, res) => {
  const { material, quantity, action } = req.body;

  if (!material || !quantity || !action) {
    return res.status(400).json({
      message: "All input fields required",
      success: false,
    });
  }

  try {
    const createTransactions = await TransactionSchema.create({
      material,
      measurement: "KG",
      quantity,
      action,
      userId: req.user.id,
    });
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
    }).limit(100);

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

    console.log("Transactions:", transactions); // Log transactions array for inspection

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

    console.log("Recycled Transactions:", transactions); // Log transactions array for inspection

    // Fill in missing dates with 0 total for each material

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
};
