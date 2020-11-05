import React from "react";
import axios from "axios";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BodyIndex from "../src/components/BodyIndex";

jest.mock("axios");

describe("<BodyIndex />", () => {
  test("fetches posts from an API and displays them", async () => {
    const posts = [
      {
        id: "1",
        title: "Lars",
        ImgSrc: "tester.jpg",
        comment: "Tester comment",
      },
      {
        id: "2",
        title: "Joost",
        ImgSrc: "test2.jpg",
        comment: "Test 2 comment",
      },
    ];

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { hits: posts } })
    );

    console.log("test");

    render(<BodyIndex />);

    //await userEvent.click(screen.getByRole("button"));

    const items = await screen.findAllByRole("img");

    expect(items).toHaveLength(2);
  });
});
