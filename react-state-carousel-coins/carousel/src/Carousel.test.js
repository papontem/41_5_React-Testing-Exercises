import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

// PAM: Part 2: Smoke and Snapshot tests for Carousel.js

// PAM: smoke tests
// it("fails to render Carousel with no props", function () {
// 	// catching if an error is throuwn by the render function when no props are sent through with Carousel call.
// 	expect(() => render(<Carousel />)).toThrow();
// });

it("renders without crashing with props", function () {
	render(<Carousel photos={TEST_IMAGES} title="TEST_Carousel_Title" />);
});

// PAM: snapshot test
it("matches snapshot", function () {
	const { asFragment } = render(
		<Carousel photos={TEST_IMAGES} title="TEST_Carousel_Title" />
	);
	expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
	const { container } = render(
		<Carousel photos={TEST_IMAGES} title="images for testing" />
	);
	// expect the first image to show, but not the second
	expect(
		container.querySelector('img[alt="testing image 1"]')
	).toBeInTheDocument();
	expect(
		container.querySelector('img[alt="testing image 2"]')
	).not.toBeInTheDocument();

	// move forward in the carousel
	const rightArrow = container.querySelector(".bi-arrow-right-circle");
	fireEvent.click(rightArrow);

	// expect the second image to show, but not the first
	expect(
		container.querySelector('img[alt="testing image 1"]')
	).not.toBeInTheDocument();
	expect(
		container.querySelector('img[alt="testing image 2"]')
	).toBeInTheDocument();
});

// PAM: Part 3  write a test that expects that when you’re on the second image, clicking the left arrow will move you to the first image.

it("works when you click on the right arrow, then the left arrow", function () {
	const { container } = render(
		<Carousel photos={TEST_IMAGES} title="images for testing" />
	);

	// expect the first image to show, but not the second
	expect(
		container.querySelector('img[alt="testing image 1"]')
	).toBeInTheDocument();
	expect(
		container.querySelector('img[alt="testing image 2"]')
	).not.toBeInTheDocument();

	// get the arrow buttons <- & ->
	const leftArrow = container.querySelector(".bi-arrow-left-circle");
	const rightArrow = container.querySelector(".bi-arrow-right-circle");
	
	// move forward in the carousel 1 -> 2 - 3
	fireEvent.click(rightArrow);
	// expect the second image to show, but not the first
	expect(
		container.querySelector('img[alt="testing image 1"]')
	).not.toBeInTheDocument();
	expect(
		container.querySelector('img[alt="testing image 2"]')
	).toBeInTheDocument();

	// move backward in the carousel 1 <- 2 - 3
	fireEvent.click(leftArrow);
	// expect the first image to show, but not the second
	expect(
		container.querySelector('img[alt="testing image 1"]')
	).toBeInTheDocument();
	expect(
		container.querySelector('img[alt="testing image 2"]')
	).not.toBeInTheDocument();
});
