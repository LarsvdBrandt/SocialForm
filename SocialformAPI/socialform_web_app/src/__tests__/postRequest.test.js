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
  it("Test if PostRequest component renders", () => {
    const mockFn = PostService.create.mockImplementation((data) => {
      console.log(data);
    });

    render(<PostRequest />);

    const inputTitle = screen.getByTestId("post-input-title");
    fireEvent.change(inputTitle, { target: { value: "Lars van den Brandt" } });
    expect(inputTitle.value).toBe("Lars van den Brandt");

    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    const inputImage = screen.getByTestId("post-input-image");
    fireEvent.change(inputImage, { target: { files: [file] } });
    console.log(inputImage.files[0]);
    expect(inputImage.files[0]).toBe(file);

    const inputComment = screen.getByTestId("post-input-comment");
    fireEvent.change(inputComment, { target: { value: "Mooie foto" } });
    expect(inputComment.value).toBe("Mooie foto");

    const inputSubmit = screen.getByTestId("post-input-submit");
    fireEvent.click(inputSubmit);
    expect(mockFn).toHaveBeenCalledWith({
      comment: "Mooie foto",
      imgSrc: "chucknorris.png",
      title: "Lars van den Brandt",
    });
  });
});
