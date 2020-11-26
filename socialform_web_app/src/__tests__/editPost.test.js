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

//put in setupTests.js file in root folder
import "@testing-library/jest-dom/extend-expect";

jest.mock("../services/PostService");

describe("Edit Post component tests", () => {
  it.only("Test if EditPost component renders", async () => {
    // expect.assertions(3);

    const mockFn = PostService.get.mockImplementation((data) => {
      console.log(data);
      return {
        data: {
          title: "Lars",
          imgSrc: "test.jpg",
          comment: "testcomment",
        },
      };
    });

    render(
      <MemoryRouter initialEntries={["/EditPost/1"]}>
        <EditPost match={{ params: { id: 1 } }} />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByTestId("post-input-title")).toBeInTheDocument()
    );

    const inputTitle = screen.getByTestId("post-input-title");
    fireEvent.change(inputTitle, { target: { value: "Lars van den Brandt" } });
    expect(inputTitle.value).toBe("Lars van den Brandt");

    // const inputImage = screen.getByTestId("post-input-image");
    // fireEvent.change(inputImage, { target: { value: MockImage } });
    // expect(inputImage.value).toBe(MockImage);

    const inputComment = screen.getByTestId("post-input-comment");
    fireEvent.change(inputComment, { target: { value: "Mooie foto" } });
    expect(inputComment.value).toBe("Mooie foto");

    // const inputSubmit = screen.getByTestId("post-input-submit");
    // fireEvent.click(inputSubmit);
    // expect(mockFn).toHaveBeenCalledWith({
    //   comment: "Mooie foto",
    //   imgSrc: "",
    //   title: "Lars van den Brandt",
    // });
  });
});
