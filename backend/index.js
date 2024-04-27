const express = require("express");
const dotenv = require("dotenv").config();
const port = 6000;
const userRoute = require("./routes/user_route");
const supplierRoute = require("./routes/supplier_route");
const inventoryRoutes = require("./routes/inventory_route");

const app = express();

app.use("/user", userRoute);
app.use("/supplier", supplierRoute);
app.use("/inventory", inventoryRoutes);
// app.use("/metrics");

app.listen(port, () => console.log("app started on", port));
