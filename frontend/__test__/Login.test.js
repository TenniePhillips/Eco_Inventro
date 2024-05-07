import React from "react";
import { expect, jest } from "@jest/globals";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Index from "../pages/login/index";

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the useToast hook
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => jest.fn(),
}));

describe("Index component", () => {
  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<Index />);

    // Assert that the component renders the necessary elements
    expect(getByText("Eco Inventro")).toBeInTheDocument();
    expect(getByText("Login")).toBeInTheDocument();
    expect(getByPlaceholderText("Email")).toBeInTheDocument();
    expect(getByPlaceholderText("Password")).toBeInTheDocument();
    expect(getByText("Submit")).toBeInTheDocument();
  });

  it("handles form submission correctly", async () => {
    const { getByPlaceholderText, getByText } = render(<Index />);

    // Mock the API response
    const mockResponse = {
      success: true,
      data: {
        name: "John Doe",
        token: "xyz123",
        userType: "admin",
        email: "john@example.com",
      },
      message: "Login successful",
    };
    global.HandleAllRequest = jest.fn().mockResolvedValue(mockResponse);

    // Simulate user input and form submission
    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(getByText("Submit"));

    // Assert that the form submission triggers the correct behavior
    // await waitFor(() => {
    //   expect(global.HandleAllRequest).toHaveBeenCalledWith(
    //     "/user/login",
    //     "post",
    //     "",
    //     {
    //       email: "test@example.com",
    //       password: "password123",
    //     }
    //   );
    //   expect(mockResponse.success).toBe(true);
    //   // Add more assertions based on the expected behavior
    // });
  });
});
