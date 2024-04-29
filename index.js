const express = require("express");
const dotenv = require("dotenv").config();
const port = 4000;
const userRoute = require("./backend/routes/user_route");
const supplierRoute = require("./backend/routes/supplier_route");
// app.use("/user", userRoute);
const inventoryRoutes = require("./backend/routes/inventory_route");
const transactionRoutes = require("./backend/routes/transaction_route");
const connectDb = require("./backend/config/db");
const path = require("path");
const cors = require("cors");

const app = express();
connectDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use("/", express.static(path.resolve(__dirname, "./frontend", "static")));
app.use("/user", userRoute);
app.use("/transaction", transactionRoutes);
app.use("/supplier", supplierRoute);
app.use("/inventory", inventoryRoutes);
// app.use("/metrics");

app.listen(port, () => console.log("app started on", port));

//mongodb+srv://donmarito5:znb8RFCsk0aYKiPq@cluster0.uwyfr2o.mongodb.net/?retryWrites=true&w=majority .
