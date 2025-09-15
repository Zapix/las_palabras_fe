import { expect, test } from "vitest";
import { screen, render } from "@testing-library/react";

import Home from "./Home.tsx";

test("renders", () => {
  render(<Home />);
  const logo = screen.getByTestId("vite-logo");
  expect(logo).toBeDefined();
});
