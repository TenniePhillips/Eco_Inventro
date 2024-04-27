const InventoryModel = require("../model/inventory_model");

const createInventory = async (req, res) => {
  const {
    name,
    supplier,
    type,
    measurement,
    quatity,
    orderDate,
    deliveryDate,
    disposal,
  } = req.body;

  if (
    !name ||
    !supplier ||
    !type ||
    !measurement ||
    !quatity ||
    !orderDate ||
    !deliveryDate ||
    !disposal
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
      type,
      measurement,
      quatity,
      orderDate,
      deliveryDate,
      disposal,
    });
    res.status(200).json({
      message: "Inventory created successfully",
      data: createInventory,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message ?? "Error creating category",
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
        message: "Inventory deleted",
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

module.exports = {
  createInventory,
  deleteInventroy,
};
