import {
  getByTestId,
  render,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PostRequest from "../components/PostRequest";
import React from "react";
import MockImage from "../uploads/test1.jpg";
import PostService from "../services/PostService";

jest.mock("../services/PostService");

describe("Post component tests", () => {
  it.only("Test if PostRequest component renders", () => {
    // expect.assertions(3);

    const mockFn = PostService.create.mockImplementation((data) => {
      console.log(data);
    });

    render(<PostRequest />);

    const inputTitle = screen.getByTestId("post-input-title");
    fireEvent.change(inputTitle, { target: { value: "Lars van den Brandt" } });
    expect(inputTitle.value).toBe("Lars van den Brandt");

    // const inputImage = screen.getByTestId("post-input-image");
    // fireEvent.change(inputImage, { target: { value: MockImage } });
    // expect(inputImage.value).toBe(MockImage);

    const inputComment = screen.getByTestId("post-input-comment");
    fireEvent.change(inputComment, { target: { value: "Mooie foto" } });
    expect(inputComment.value).toBe("Mooie foto");

    const inputSubmit = screen.getByTestId("post-input-submit");
    fireEvent.click(inputSubmit);
    expect(mockFn).toHaveBeenCalledWith({
      comment: "Mooie foto",
      imgSrc: "",
      title: "Lars van den Brandt",
    });
  });
});
