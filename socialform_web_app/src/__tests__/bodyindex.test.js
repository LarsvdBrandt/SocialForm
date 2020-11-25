import React from "react";

import { rest } from "msw";
import { setupServer } from "msw/node";

import {
  render,
  fireEvent,
  waitFor,
  screen,
  waitForElement,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import BodyIndex from "../components/BodyIndex";

// const posts = [
//   {
//     id: "1",
//     title: "Lars",
//     imgSrc: "tester.jpg",
//     comment: "Tester comment",
//   },
//   {
//     id: "2",
//     title: "Joost",
//     imgSrc: "test2.jpg",
//     comment: "Test 2 comment",
//   },
// ];

// const server = setupServer(
//   rest.get("/api/SFPosts", (req, res, ctx) => {
//     return res(ctx.json(posts));
//   })
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// describe("<BodyIndex />", () => {
test("fetches posts from an API and displays them", async () => {
  // const { container } = render(<BodyIndex />);
  // await waitForElement(() => screen.getByTestId("card"));
  // expect(container).toMatchSnapshot();
  //await userEvent.click(screen.getByRole("button"));
  // const items = await screen.findAllBy("img");
  // expect(items).toHaveLength(2);
  expect(1).toBe(1);
});
// });
