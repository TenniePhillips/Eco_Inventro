import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import LandfillCalculator from "../components/landfill_calculator";

test("renders the calculator form", () => {
  render(<LandfillCalculator />);

  // Check if form elements are rendered
  expect(screen.getByLabelText("Plastic (PET)")).toBeInTheDocument();
  expect(
    screen.getByLabelText("Average Food Delivery (unit of plastic)")
  ).toBeInTheDocument();
  expect(screen.getByLabelText("Styrofoam")).toBeInTheDocument();
  expect(
    screen.getByLabelText("Average Food Delivery (unit of styrofoam)")
  ).toBeInTheDocument();
});
