import React from "react";
import { beforeEach, describe } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import FavoritePage from "../components/FavoritePage/FavoritePage";

describe("FavoritePage", () => {
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

    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        cleanup();
    });

    test("displays message when there are no favorite jokes", () => {
        render(<FavoritePage />);
        
        expect(screen.getByText(/You don't have any favorite jokes./)).toBeInTheDocument();
        expect(screen.getByText(/Use the star button to mark your favorites./)).toBeInTheDocument();
    });

    test("displays a list of favorite jokes", () => {
        const mockFavorites = ["Joke 1", "Joke 2", "Joke 3"];
        localStorage.setItem("favorites", JSON.stringify(mockFavorites));
        
        render(<FavoritePage />);
        
        mockFavorites.forEach((favorite) => {
            expect(screen.getByText(favorite)).toBeInTheDocument();
        });
    });

    test("displays empty list when localStorage has no favorites", () => {
        localStorage.clear();

        render(<FavoritePage />);

        expect(screen.getByText(/You don't have any favorite jokes./)).toBeInTheDocument();
    });

    test("matches snapshot for FavoritePage with favorites", () => {
        const mockFavorites = ["Joke 1", "Joke 2"];
        localStorage.setItem("favorites", JSON.stringify(mockFavorites));

        const { container } = render(<FavoritePage />);
        expect(container).toMatchSnapshot();
    });

    test("matches snapshot for FavoritePage with no favorites", () => {
        localStorage.clear();

        const { container } = render(<FavoritePage />);
        expect(container).toMatchSnapshot();
    });
});
