import React from "react";
import { describe, it, beforeEach, afterEach, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import SlideShow from "../components/SlideShow/SlideShow";
import { useJokeById, slideshowIDs } from "../restAPI/jokesAPI";

vi.mock("../restAPI/jokesAPI", async (importOriginal) => {
	const actual = (await importOriginal()) as Record<string, unknown>;
	return {
		...actual,
		slideshowIDs: [0, 1, 2],
		inUseIDs: [0, 1, 2, 3, 4],
		useJokeById: vi.fn(),
	};
});

describe("SlideShow", () => {
	const mockJokeResponse = {
		id: 0,
		type: "single",
		joke: "I've got a really good UDP joke to tell you but I don’t know if you'll get it.",
		isLoading: false,
		error: null,
		category: "Programming",
	};

	beforeEach(() => {
		// Specify type for the mock return value
		(useJokeById as jest.Mock).mockReturnValue({
			data: mockJokeResponse,
		});
	});

	afterEach(() => {
		cleanup();
	});

	it("renders SlideShow correctly and matches snapshot", () => {
		const { container } = render(<SlideShow />);
		expect(container).toMatchSnapshot();
	});

	it("displays current joke and allows navigating to next and previous jokes", async () => {
		let currentIndex = 0;
		
		// Mock the behavior of useJokeById to update based on currentIndex
		(useJokeById as jest.Mock).mockImplementation(() => ({
			data: { ...mockJokeResponse, id: slideshowIDs[currentIndex] },
		}));
		render(<SlideShow />);

		// Expect the first joke to be displayed
		expect(
			screen.getByText(
				/I've got a really good UDP joke to tell you but I don’t know if you'll get it./,
			),
		).toBeInTheDocument();

		// Click Next and expect the next joke to load
		currentIndex = 1;
		fireEvent.click(screen.getByRole("button", { name: /›/ }));
		expect(useJokeById).toHaveBeenCalledWith(slideshowIDs[1]);

		// Click Previous and expect the first joke to load again
		currentIndex = 0;
		fireEvent.click(screen.getByRole("button", { name: /‹/ }));
		expect(useJokeById).toHaveBeenCalledWith(slideshowIDs[0]);
	});

	it("allows skipping to a specific joke by joke ID", () => {
		render(<SlideShow />);

		// Click on the joke ID button for the second joke
		fireEvent.click(screen.getByText("2"));
		expect(useJokeById).toHaveBeenCalledWith(slideshowIDs[1]);

		// Click on the joke ID button for the first joke
		fireEvent.click(screen.getByText("1"));
		expect(useJokeById).toHaveBeenCalledWith(slideshowIDs[0]);
	});

	it("displays loading message when joke is loading", () => {
		// Mock loading state
		(useJokeById as jest.Mock).mockReturnValue({
			data: null,
		});

		render(<SlideShow />);

		expect(screen.getByText(/Loading/)).toBeInTheDocument();
	});

	it("displays error message when there's an error", () => {
		// Mock error state
		(useJokeById as jest.Mock).mockReturnValue({
			data: { ...mockJokeResponse, error: { message: "Failed to load joke" } },
		});

		render(<SlideShow />);

		expect(screen.getByText(/Failed to load joke/)).toBeInTheDocument();
	});

	it("rolls over to the first joke when Next is clicked on the last joke", () => {
		render(<SlideShow />);

		// Mock `useJokeById` to handle current joke as the last joke in slideshowIDs
		(useJokeById as jest.Mock).mockReturnValue({
			data: { ...mockJokeResponse, id: slideshowIDs[slideshowIDs.length - 1] },
		});

		// Simulate clicking the "Next" button on the last joke
		fireEvent.click(screen.getByRole("button", { name: /›/ }));

		// Expect `useJokeById` to be called with the first joke ID (rollover behavior)
		expect(useJokeById).toHaveBeenCalledWith(slideshowIDs[0]);
	});

	it("rolls over to the last joke when Previous is clicked on the first joke", () => {
		render(<SlideShow />);

		// Mock `useJokeById` to handle current joke as the first joke in slideshowIDs
		(useJokeById as jest.Mock).mockReturnValue({
			data: { ...mockJokeResponse, id: slideshowIDs[0] },
		});

		// Simulate clicking the "Previous" button on the first joke
		fireEvent.click(screen.getByRole("button", { name: /‹/ }));

		// Expect `useJokeById` to be called with the last joke ID (rollover behavior)
		expect(useJokeById).toHaveBeenCalledWith(slideshowIDs[slideshowIDs.length - 1]);
	});

	it("navigates between jokes and handles rollovers", () => {
		render(<SlideShow />);

		// Simulate clicking the "Next" button and check navigation
		fireEvent.click(screen.getByRole("button", { name: /›/ }));
		expect(useJokeById).toHaveBeenCalledWith(slideshowIDs[1]);

		// Simulate clicking "Next" at the end and check rollover to first joke
		fireEvent.click(screen.getByRole("button", { name: /›/ }));
		fireEvent.click(screen.getByRole("button", { name: /›/ })); // This would be the third click
		expect(useJokeById).toHaveBeenCalledWith(slideshowIDs[0]);

		// Simulate clicking "Previous" and check navigation
		fireEvent.click(screen.getByRole("button", { name: /‹/ }));
		expect(useJokeById).toHaveBeenCalledWith(slideshowIDs[2]);

		// Simulate clicking "Previous" at the start and check rollover to last joke
		fireEvent.click(screen.getByRole("button", { name: /‹/ }));
		fireEvent.click(screen.getByRole("button", { name: /‹/ }));
		expect(useJokeById).toHaveBeenCalledWith(slideshowIDs[slideshowIDs.length - 1]);
	});
});
