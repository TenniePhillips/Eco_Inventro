const InventoryModel = require("../model/inventory_model");
const TransactionModel = require("../model/transaction_model");
const {
  Types: { ObjectId },
} = require("mongoose");

// const objectId = new ObjectId();

const createInventory = async (req, res) => {
  const {
    name,
    supplier,
    material,
    measurement,
    quantity,
    orderDate,
    deliveryDate,
  } = req.body;

  if (
    !name ||
    !supplier ||
    !material ||
    !measurement ||
    !quantity ||
    !orderDate ||
    !deliveryDate
  ) {
    return res.status(400).json({
      message: "All input fields required",
      success: false,
    });
  }

  try {
    const createInventory = await InventoryModel.create({
      name,
      supplier,
      material,
      measurement,
      quantity,
      orderDate,
      deliveryDate,
      userId: req.user.id,
      // disposal,
    });
    res.status(200).json({
      message: "Inventory created successfully",
      data: createInventory,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message ?? "Error creating inventory",
      success: false,
    });
  }
};

const fetchAllInventory = async (req, res) => {
  try {
    const inventory = await InventoryModel.find({ userId: req.user.id })
      .populate("supplier")
      .limit(100);

    if (inventory) {
      res.status(200).json({
        success: true,
        message: "Inventory found successfully",
        data: inventory,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Inventory not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message ?? "Error",
      success: false,
    });
  }
};

const recentInventory = async (req, res) => {
  try {
    const inventory = await InventoryModel.find({ userId: req.user.id })
      .populate("supplier")
      .sort({ createdAt: -1 })
      .limit(5);

    if (inventory) {
      res.status(200).json({
        success: true,
        message: "Inventory found successfully",
        data: inventory,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Inventory not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message ?? "Error",
      success: false,
    });
  }
};

const deleteInventroy = async (req, res) => {
  const { id } = req.params;

  try {
    const inventory = await InventoryModel.findByIdAndDelete(id);

    if (inventory) {
      res.status(200).json({
        success: true,
        message: "Inventory item deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Inventory not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message ?? "Invalid Inventory",
      success: false,
    });
  }
};

const inventoryOverview = async (req, res) => {
  try {
    const id = new ObjectId(req.user.id);
    const inventory = await InventoryModel.aggregate([
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

    console.log("inventory", inventory);

    const materialTotals = {};

    inventory.forEach((item) => {
      materialTotals[item.material] = item.total;
    });

    console.log("mmm", materialTotals);

    if (inventory) {
      res.status(200).json({
        success: true,
        message: "Transaction found successfully",
        data: materialTotals,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    console.log("materialTotals", materialTotals);
  } catch (error) {
    res.status(400).json({
      message: error?.message ?? "Invalid Transactions",
      success: false,
    });
  }
};

const checkBalanceOverview = async (req, res) => {
  try {
    const id = new ObjectId(req.user.id);
    const inventory = await InventoryModel.aggregate([
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

    const materialInventory = {};

    inventory.forEach((item) => {
      materialInventory[item.material] = item.total;
    });

    console.log("data", req.user.id);

    const transaction = await TransactionModel.aggregate([
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

    console.log("inventory123", inventory, "mt", materialInventory);

    const materialTotals = {};

    transaction.forEach((item) => {
      materialTotals[item.material] = item.total;
    });

    console.log("transaction123", transaction, "mg", materialTotals);

    const calculateTotal = {
      plastic: materialInventory.Plastic - (materialTotals.Plastic || 0),
      styrofoam: materialInventory.Styrofoam - (materialTotals.Styrofoam || 0),
      biodegradable:
        materialInventory.Biodegradable - (materialTotals.Biodegradable || 0),
      // plastic: materialInventory.Plastic - materialTotals.Plastic,
      // styrofoam: materialInventory.Styrofoam - materialTotals.Styrofoam,
      // biodegradable:
      //   materialInventory.Biodegradable - materialTotals.Biodegradable,
    };

    if (transaction) {
      res.status(200).json({
        success: true,
        message: "Transaction found successfully",
        data: calculateTotal,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error?.message ?? "Invalid Transactions",
      success: false,
    });
  }
};

module.exports = {
  createInventory,
  deleteInventroy,
  fetchAllInventory,
  inventoryOverview,
  recentInventory,
  checkBalanceOverview,
  // dailyInventryOverview,
};
