const SupplierModel = require("../model/supplier_model");

const createSupplier = async (req, res) => {
  const { name, email, phone, supplier, address, website, payment } = req.body;

  if (
    !name ||
    !email ||
    !phone ||
    !supplier ||
    !address ||
    !website ||
    !payment
  ) {
    return res.status(400).json({
      message: "All input fields required",
      success: false,
    });
  }

  try {
    const createSupplier = await SupplierModel.create({
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
      data: createSupplier,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message ?? "Error creating category",
      success: false,
    });
  }
};

const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    const supplier = await SupplierModel.findByIdAndDelete(id);

    if (supplier) {
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
  createSupplier,
  deleteSupplier,
};
