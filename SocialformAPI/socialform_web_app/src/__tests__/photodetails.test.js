import {
  getByTestId,
  render,
  screen,
  waitFor,
  fireEvent,
  waitForElement,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PhotoDetails from "../components/PhotoDetails";
import React from "react";
import MockImage from "../uploads/test1.jpg";
import PostService from "../services/__services__/PostServiceMock";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../services/__services__/PostServiceMock");

describe("Photodetails component tests", () => {
  it("Test if photodetails component renders", async () => {
    let useLocation;

    render(
      <MemoryRouter initialEntries={["/PhotoDetails/1"]}>
        <PhotoDetails />
      </MemoryRouter>
    );

    const header = await screen.findByText("Gerwin Lips");
    expect(header).toBeInTheDocument();
  });
});
