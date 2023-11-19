// Part 2: Smoke and Snapshot tests for Card.js

import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

const testProps = {
  caption: "Test Caption",
  src: "test-image.jpg",
  currNum: 1,
  totalNum: 3,
};

// smoke tests
it("renders without crashing with no props", function() {
  render(<Card />);
});
it("renders without crashing with props", function() {
  render(<Card {...testProps} />);
});

// snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(<Card {...testProps} />);
  expect(asFragment()).toMatchSnapshot();
});


