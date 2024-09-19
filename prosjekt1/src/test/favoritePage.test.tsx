import React from "react";
import { beforeEach, describe } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import FavoritePage from "../components/FavoritePage/FavoritePage";

// Describe the test suite for FavoritePage
describe("FavoritePage", () => {
	// Mock implementation of localStorage for the test environment
	const mockLocalStorage = (() => {
		let store: Record<string, string> = {};
		return {
			// Method to get an item from the mock localStorage
			getItem(key: string) {
				return store[key] || null;
			},
			// Method to set an item in the mock localStorage
			setItem(key: string, value: string) {
				store[key] = value.toString();
			},
			// Method to clear all items in the mock localStorage
			clear() {
				store = {};
			},
			// Method to remove a specific item from the mock localStorage
			removeItem(key: string) {
				delete store[key];
			},
		};
	})();

	// Override the real localStorage with the mockLocalStorage for testing
	Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

	// Runs before each test: clear localStorage to ensure clean state
	beforeEach(() => {
		localStorage.clear();
	});

	// Runs after each test: clean up DOM elements rendered during tests
	afterEach(() => {
		cleanup();
	});

	// Test case 1: Verifies that a message is displayed when there are no favorite jokes
	test("displays message when there are no favorite jokes", () => {
		render(<FavoritePage />);

		expect(screen.getByText(/You don't have any favorite jokes./)).toBeInTheDocument();
		expect(screen.getByText(/Use the star button to mark your favorites./)).toBeInTheDocument();
	});

	// Test case 2: Verifies that the component displays a list of favorite jokes
	test("displays a list of favorite jokes", () => {
		const mockFavorites = ["Joke 1", "Joke 2", "Joke 3"];
		localStorage.setItem("favorites", JSON.stringify(mockFavorites));

		render(<FavoritePage />);

		mockFavorites.forEach((favorite) => {
			expect(screen.getByText(favorite)).toBeInTheDocument();
		});
	});

	// Test case 3: Verifies that an empty list is displayed if localStorage has no favorites
	test("displays empty list when localStorage has no favorites", () => {
		localStorage.clear();

		render(<FavoritePage />);

		expect(screen.getByText(/You don't have any favorite jokes./)).toBeInTheDocument();
	});

	// Test case 4: Verifies that the component matches the snapshot when favorites exist
	test("matches snapshot for FavoritePage with favorites", () => {
		const mockFavorites = ["Joke 1", "Joke 2"];
		localStorage.setItem("favorites", JSON.stringify(mockFavorites));

		const { container } = render(<FavoritePage />);
		expect(container).toMatchSnapshot();
	});

	// Test case 5: Verifies that the component matches the snapshot when no favorites exist
	test("matches snapshot for FavoritePage with no favorites", () => {
		localStorage.clear();

		const { container } = render(<FavoritePage />);
		expect(container).toMatchSnapshot();
	});
});
