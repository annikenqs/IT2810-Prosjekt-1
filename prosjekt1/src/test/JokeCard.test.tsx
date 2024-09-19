import React from "react";
import JokeCard from "../components/JokeCard/JokeCard";
import { JokeResponse } from "../restAPI/jokesAPI";
import { beforeEach, describe } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

describe("JokeCard", () => {
	const mockLocalStorage = (() => {
		let store: Record<string, string> = {};
		return {
			getItem(key: string) {
				return store[key] || null;
			},
			setItem(key: string, value: string) {
				store[key] = value.toString();
			},
			clear() {
				store = {};
			},
			removeItem(key: string) {
				delete store[key];
			},
		};
	})();
	Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

	const mockSingleJokeResponse: JokeResponse = {
		id: 0,
		type: "single",
		joke: "I've got a really good UDP joke to tell you but I don’t know if you'll get it.",
		isLoading: false,
		error: null,
		category: "Programming",
	};

	const mockTwopartJokeResponse: JokeResponse = {
		id: 6,
		type: "twopart",
		setup: "Why did the web developer walk out of a resturant in disgust?",
		delivery: "The seating was laid out in tables.",
		isLoading: false,
		error: null,
		category: "Programming",
	};

	const mockLoadingJokeResponse: JokeResponse = {
		id: 0,
		type: "single",
		joke: "I've got a really good UDP joke to tell you but I don’t know if you'll get it.",
		isLoading: true,
		error: null,
		category: "Programming",
	};

	const mockErrorJokeResponse: JokeResponse = {
		id: 0,
		type: "single",
		joke: "I've got a really good UDP joke to tell you but I don’t know if you'll get it.",
		isLoading: false,
		error: { name: "Error", message: "Failed to load joke" },
		category: "Programming",
	};

	beforeEach(() => {
		localStorage.clear();
	});

	afterEach(() => {
		cleanup();
	});

	test("renders JokeCard correctly and matches snapshot for single joke", () => {
		const { container } = render(<JokeCard jokeResponse={mockSingleJokeResponse} />);
		expect(container).toMatchSnapshot();
	});

	test("renders JokeCard correctly and matches snapshot for twopart joke", () => {
		const { container } = render(<JokeCard jokeResponse={mockTwopartJokeResponse} />);
		expect(container).toMatchSnapshot();
	});

	test("applies slideshow-card class when isSlideshowCard is true", () => {
		render(<JokeCard jokeResponse={mockSingleJokeResponse} isSlideshowCard={true} />);
		const card = screen.getByRole("figure");
		expect(card).toHaveClass("slideshow-card");
	});

	test("displays single joke and joke number", () => {
		render(<JokeCard jokeResponse={mockSingleJokeResponse} />);
		expect(
			screen.getByText(
				/I've got a really good UDP joke to tell you but I don’t know if you'll get it./,
			),
		).toBeInTheDocument();
		expect(screen.getByText(/Joke #1/)).toBeInTheDocument();
	});

	test("displays single joke and joke number", () => {
		render(<JokeCard jokeResponse={mockTwopartJokeResponse} />);
		expect(
			screen.getByText(/Why did the web developer walk out of a resturant in disgust?/),
		).toBeInTheDocument();
		expect(screen.getByText(/The seating was laid out in tables./)).toBeInTheDocument();
		expect(screen.getByText(/Joke #7/)).toBeInTheDocument();
	});

	test("displays loading when loading is true", () => {
		render(<JokeCard jokeResponse={mockLoadingJokeResponse} />);
		expect(screen.getByText(/Loading/)).toBeInTheDocument();
	});

	test("displays error message", () => {
		render(<JokeCard jokeResponse={mockErrorJokeResponse} />);
		expect(screen.getByText(/Failed to load joke/)).toBeInTheDocument();
	});

	test("handles favoriting and unfavoriting correctly", () => {
		render(<JokeCard jokeResponse={mockSingleJokeResponse} />);

		//click favorite joke
		const favoriteButton = screen.getByRole("button", { name: "☆" });
		fireEvent.click(favoriteButton);
		expect(localStorage.getItem("favorites")).toContain(mockSingleJokeResponse.joke);

		//check if the star button gets filled when favorited
		expect(screen.getByRole("button", { name: "★" })).toBeInTheDocument();
		expect(screen.queryByRole("button", { name: "☆" })).toBeNull();

		//click unfavorite joke
		const favoriteButtonAfter = screen.getByRole("button", { name: "★" });
		fireEvent.click(favoriteButtonAfter);
		expect(screen.getByRole("button", { name: "☆" })).toBeInTheDocument();

		//check if the star button gets unfilled when unfavorited
		expect(screen.queryByRole("button", { name: "★" })).toBeNull();
		expect(localStorage.getItem("favorites")).not.toContain(mockSingleJokeResponse.joke);
	});
});
