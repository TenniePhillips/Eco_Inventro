const InventoryModel = require("../model/inventory_model");

const createInventory = async (req, res) => {
  const {
    name,
    supplier,
    material,
    measurement,
    quantity,
    orderDate,
    deliveryDate,
    // disposal,
  } = req.body;

  if (
    !name ||
    !supplier ||
    !material ||
    !measurement ||
    !quantity ||
    !orderDate ||
    !deliveryDate
    // !disposal
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
    const inventory = await InventoryModel.find()
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
    const inventory = await InventoryModel.aggregate([
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

module.exports = {
  createInventory,
  deleteInventroy,
  fetchAllInventory,
  inventoryOverview,
};
