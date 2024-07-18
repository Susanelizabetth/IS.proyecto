import Header from "../components/Header";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

test("Header", () => {
  render(<Header title="Hola" />);
  expect(screen.getByText("Hola")).toBeDefined();
});

test("Header send numbers", () => {
  render(<Header title={23112} />);
  expect(screen.getByText("23112")).toBeDefined();
});

test("BooleanComponent does not show 'Falso' for boolean true", () => {
  render(<Header title={true} />);
  expect(screen.queryByText("Falso")).toBeNull();
});
