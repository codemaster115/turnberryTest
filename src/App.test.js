import React from "react";
import { render, waitFor } from "@testing-library/react";
import CustomerRewards, {calculatePoints} from "./App";

describe("CustomerRewards", () => {
  it("renders without crashing", () => {
    render(<CustomerRewards />);
  });

  it("displays 'Loading...' while data is being fetched", () => {
    const { getByText } = render(<CustomerRewards />);
    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("displays data correctly after it has been fetched", async () => {
    const { getByText } = render(<CustomerRewards />);
    await waitFor(() => {
      expect(getByText("2022/08/09")).toBeInTheDocument()
    }, { timeout: 3000 });
    expect(getByText("2022/09/30")).toBeInTheDocument()
    expect(getByText("2022/10/11")).toBeInTheDocument()
  });

  it("calculates points correctly", async () => {
    expect(calculatePoints(120)).toBe(90);
    expect(calculatePoints(90)).toBe(40);
    expect(calculatePoints(70)).toBe(20);
    expect(calculatePoints(150)).toBe(150);
  });
});
