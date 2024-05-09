import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import AddInventoryModal from "../components/modal/add_inventry";

describe("AddInventoryModal", () => {
  it("renders correctly", () => {
    render(
      <AddInventoryModal isOpen={true} onClose={() => {}} callBack={() => {}} />
    );
    expect(screen.getByText("Add Inventory")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Supplier")).toBeInTheDocument();
    expect(screen.getByLabelText("Material")).toBeInTheDocument();
    expect(screen.getByLabelText("Measurement")).toBeInTheDocument();
    expect(screen.getByLabelText("Quantity")).toBeInTheDocument();
    expect(screen.getByLabelText("Order Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Delivery Date")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });
});
