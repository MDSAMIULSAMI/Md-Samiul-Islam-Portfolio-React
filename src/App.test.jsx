import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App.jsx";
import { profile } from "./data/profile.js";

describe("App", () => {
  test("renders the hero with the profile name", async () => {
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1 })).toHaveTextContent(profile.name);
  });

  test("renders the primary navigation", () => {
    render(<App />);
    ["Home", "About", "Experience", "Projects", "Awards", "Resume"].forEach((label) => {
      expect(screen.getAllByRole("link", { name: new RegExp(`^${label}$`) }).length).toBeGreaterThan(0);
    });
  });
});
