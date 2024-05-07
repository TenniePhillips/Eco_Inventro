import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import WasteGenCalculator from "../components/waste_generation_calculator"; // Assuming the component is in a file named WasteGenCalculator.js

test("WasteGenCalculator calculates waste based on user input", async () => {
  const { getByLabelText, getByRole, findByText } = render(
    <WasteGenCalculator />
  );

  // Select material type (Plastic)
  const materialTypeSelect = getByLabelText("Select Type");
  fireEvent.change(materialTypeSelect, { target: { value: "Plastic" } });

  // Enter unit (1kg)
  const unitInput = getByLabelText("Average Food Delivery");
  fireEvent.change(unitInput, { target: { value: "1" } });

  // Select weight per unit (2kg)
  const weightSelect = getByLabelText("Average Weight per unit");
  fireEvent.change(weightSelect, { target: { value: "2" } });

  // Click submit button
  const submitButton = getByRole("button", { name: /Submit/i });
  fireEvent.click(submitButton);

  // Wait for the calculations to finish
  await waitFor(() => {
    // Expect total waste per month to be displayed correctly
    const totalWastePerMonth = findByText("1.4kg");
    expect(totalWastePerMonth).toBeTruthy(); // Check if the text is found

    // Expect total waste per year to be displayed correctly
    const totalWastePerYear = findByText("16.8kg");
    expect(totalWastePerYear).toBeTruthy(); // Check if the text is found
  });
});
