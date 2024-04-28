const Supplier = require("../model/supplier_model");

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
    const createSupplier = await Supplier.create({
      name,
      supplier,
      email,
      phone,
      address,
      website,
      paymentType: payment,
    });
    res.status(200).json({
      message: "Supplier created successfully",
      data: createSupplier,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message ?? "Error creating supplier",
      success: false,
    });
  }
};

const fetchAllSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.find();

    if (supplier) {
      res.status(200).json({
        success: true,
        message: "Supplier found successfully",
        data: supplier,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message ?? "Invalid Supplier",
      success: false,
    });
  }
};

const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    const supplier = await Supplier.findByIdAndDelete(id);

    if (supplier) {
      res.status(200).json({
        success: true,
        message: "Supplier deleted",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message ?? "Invalid Supplier",
      success: false,
    });
  }
};

module.exports = {
  createSupplier,
  deleteSupplier,
  fetchAllSupplier,
};
