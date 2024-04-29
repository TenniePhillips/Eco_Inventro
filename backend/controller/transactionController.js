const TransactionSchema = require("../model/transaction_model");

const createTransaction = async (req, res) => {
  const { material, measurement, quantity, action } = req.body;

  if (!material || !measurement || !quantity || !action) {
    return res.status(400).json({
      message: "All input fields required",
      success: false,
    });
  }

  try {
    const createTransactions = await TransactionSchema.create({
      material,
      measurement,
      quantity,
      action,
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

const fetchAllTransaction = async (req, res) => {
  try {
    const transactions = await TransactionSchema.find().limit(100);

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

module.exports = {
  fetchAllTransaction,
  createTransaction,
};
