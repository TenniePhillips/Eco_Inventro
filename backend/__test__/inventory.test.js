const request = require("supertest");
const app = require("../app"); // Assuming your Express app is exported from 'app.js'
const InventoryModel = require("../model/inventory_model");

describe("Inventory Controller Tests", () => {
  describe("POST /inventory", () => {
    it("should create a new inventory item", async () => {
      const newInventory = {
        name: "Test Inventory",
        supplier: "supplier_id",
        material: "Plastic",
        measurement: "KG",
        quantity: 100,
        orderDate: "2024-05-10",
        deliveryDate: "2024-05-12",
      };

      const response = await request(app)
        .post("/inventory")
        .send(newInventory)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Inventory created successfully");

      // You can also query the database to ensure the item was created
      const inventoryItem = await InventoryModel.findOne({
        name: "Test Inventory",
      });
      expect(inventoryItem).toBeTruthy();
      expect(inventoryItem.supplier).toBe("supplier_id");
      // Add more expectations as needed
    });

    it("should return 400 if required fields are missing", async () => {
      const invalidInventory = {
        // Missing required fields
      };

      const response = await request(app)
        .post("/inventory")
        .send(invalidInventory)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("All input fields required");
    });

    // Add more test cases as needed for different scenarios
  });
});
