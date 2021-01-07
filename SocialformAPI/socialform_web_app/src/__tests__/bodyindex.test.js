import {
  getByTestId,
  render,
  screen,
  waitFor,
  fireEvent,
  toBeInTheDocument,
} from "@testing-library/react";
import { MemoryRouter, Route, Switch } from "react-router-dom";
import BodyIndex from "../components/BodyIndex.js";
import "@testing-library/jest-dom/extend-expect";

describe("BodyIndex", () => {
  it("Get list of objects", async () => {
    render(
      <MemoryRouter>
        <BodyIndex />
      </MemoryRouter>
    );

    const header = await screen.findByText("Vincent Stolwijk");
    expect(header).toBeInTheDocument();
  });
});
});
