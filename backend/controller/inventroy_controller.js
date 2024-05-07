const InventoryModel = require("../model/inventory_model");
const TransactionModel = require("../model/transaction_model");

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

const recentInventory = async (req, res) => {
  try {
    const inventory = await InventoryModel.find()
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

const checkBalanceOverview = async (req, res) => {
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

    const materialInventory = {};

    inventory.forEach((item) => {
      materialInventory[item.material] = item.total;
    });

    const transaction = await TransactionModel.aggregate([
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

    transaction.forEach((item) => {
      materialTotals[item.material] = item.total;
    });

    const calculateTotal = {
      plastic: materialInventory.Plastic - materialTotals.Plastic,
      styrofoam: materialInventory.Styrofoam - materialTotals.Styrofoam,
      biodegradable:
        materialInventory.Biodegradable - materialTotals.Biodegradable,
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

// [
//   {
//     date: "12/12/2024",
//     data: [
//       {
//         supplier: "adf",
//         quantity: "200",
//       },
//       {
//         supplier: "def",
//         quantity: "300",
//       },
//     ],
//   },
//   {
//     date: "10/12/2024",
//     data: [
//       {
//         supplier: "adf",
//         quantity: "200",
//       },
//       {
//         supplier: "def",
//         quantity: "300",
//       },
//     ],
//   },
// ];

// const dailyInventryOverview = async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;
//     const currentDate = new Date();
//     const defaultStartDate = new Date(currentDate);
//     defaultStartDate.setDate(currentDate.getDate() - 7); // Last 7 days

//     // Match transactions within the date range
//     const matchQuery = {
//       $match: {
//         orderDate: {
//           $gte: startDate ? new Date(startDate) : defaultStartDate,
//           $lte: endDate ? new Date(endDate) : currentDate,
//         },
//       },
//     };

//     // Group transactions by date and supplier
//     const groupQuery = {
//       $group: {
//         _id: {
//           date: { $dateToString: { format: "%d/%m/%Y", date: "$orderDate" } },
//           supplier: "$supplier",
//         },
//         quantity: { $sum: "$quantity" },
//       },
//     };

//     // Group transactions by date and format the output
//     const finalQuery = [
//       matchQuery,
//       groupQuery,
//       {
//         $group: {
//           _id: "$_id.date",
//           data: {
//             $push: {
//               supplier: "$_id.supplier",
//               quantity: "$quantity",
//             },
//           },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           date: "$_id",
//           data: 1,
//         },
//       },
//     ];

//     const transactions = await InventoryModel.aggregate(finalQuery);

//     // Return the result
//     res.status(200).json({
//       success: true,
//       message: "Supplier transactions retrieved successfully",
//       data: transactions,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error?.message ?? "Error retrieving supplier transactions",
//     });
//   }
// };

// const dailyInventryOverview = async (req, res) => {
//   try {
//     // Extract startDate and endDate from req.query or use default values
//     const { startDate, endDate } = req.query;
//     const currentDate = new Date();
//     const defaultStartDate = new Date(currentDate);
//     defaultStartDate.setDate(currentDate.getDate() - 21); // Last 7 days

//     const inventory = await InventoryModel.aggregate([
//       // Match transactions within the date range and with action "Recycled"
//       {
//         $match: {
//           createdAt: {
//             $gte: startDate ? new Date(startDate) : defaultStartDate,
//             $lte: endDate ? new Date(endDate) : currentDate,
//           },
//           // action: "Recycled",
//         },
//       },
//       // Group transactions by day and material
//       {
//         $group: {
//           _id: {
//             day: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
//             material: "$supplier",
//           },
//           totalQuantity: { $sum: "$quantity" },
//         },
//       },
//       // Group by day and sum the total quantity for each day
//       {
//         $group: {
//           _id: "$_id.day",
//           materials: {
//             $push: {
//               material: "$_id.supplier",
//               total: "$totalQuantity",
//             },
//           },
//         },
//       },
//       // Project the result
//       {
//         $project: {
//           _id: 0,
//           date: "$_id",
//           materials: 1,
//         },
//       },
//       // Sort by date in descending order
//       { $sort: { date: -1 } },
//     ]);

//     console.log("Inventory data:", inventory); // Log transactions array for inspection

//     // Fill in missing dates with 0 total for each material

//     if (inventory) {
//       res.status(200).json({
//         success: true,
//         message: "Inventory found successfully",
//         data: inventory,
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         message: "Inventory not found",
//       });
//     }
//   } catch (error) {
//     res.status(400).json({
//       message: error?.message ?? "Invalid Inventory",
//       success: false,
//     });
//   }
// };

// const fillMissingDates = (transactions, startDate, endDate) => {
//   const filledTransactions = [];
//   const currentDate = new Date(startDate);
//   const lastDate = new Date(endDate);
//   while (currentDate <= lastDate) {
//     const formattedDate = formatDate(currentDate);
//     const foundTransaction = transactions.find((t) => t.date === formattedDate);
//     filledTransactions.push({
//       date: formattedDate,
//       total: foundTransaction ? foundTransaction.total : 0,
//     });
//     currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
//   }
//   return filledTransactions;
// };

// const formatDate = (date) => {
//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   return `${day}-${month}-${year}`;
// };

module.exports = {
  createInventory,
  deleteInventroy,
  fetchAllInventory,
  inventoryOverview,
  recentInventory,
  checkBalanceOverview,
  // dailyInventryOverview,
};
