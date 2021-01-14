import {
  getByTestId,
  render,
  screen,
  waitFor,
  fireEvent,
  waitForElement,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EditPost from "../components/EditPost";
import React from "react";
import MockImage from "../uploads/test1.jpg";
import PostService from "../services/PostService";
import "@testing-library/jest-dom/extend-expect";

// jest.mock("../services/__services__/PostServiceMock");
jest.mock("../services/PostService");

describe("Edit Post component tests", () => {
  it("Test if EditPost component renders", async () => {
    // expect.assertions(3);

    PostService.get.mockImplementation((data) => {
      console.log(data);
      return {
        data: {
          id: 1,
          title: "Lars",
          imgSrc: "test.jpg",
          comment: "testcomment",
        },
      };
    });
    const mockFnUpdate = PostService.update.mockImplementation((data) => {
      console.log(data);
    });

    render(
      <MemoryRouter initialEntries={["/EditPost/1"]}>
        <EditPost />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByTestId("post-input-title")).toBeInTheDocument()
    );

    const inputTitle = screen.getByTestId("post-input-title");
    fireEvent.change(inputTitle, { target: { value: "Lars van den Brandt" } });
    expect(inputTitle.value).toBe("Lars van den Brandt");

    const inputComment = screen.getByTestId("post-input-comment");
    fireEvent.change(inputComment, { target: { value: "Mooie foto" } });
    expect(inputComment.value).toBe("Mooie foto");

    const inputSubmit = screen.getByTestId("post-input-submit");
    fireEvent.click(inputSubmit);
    expect(mockFnUpdate).toHaveBeenCalledWith(1, {
      comment: "Mooie foto",
      id: 1,
      imgSrc: "test.jpg",
      title: "Lars van den Brandt",
    });
  });
});
