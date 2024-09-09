export interface JokeResponse {
	type: string;
	joke?: string; // For single-type jokes
	setup?: string; // For two-part jokes
	delivery?: string; // For two-part jokes
}

// Fetch a random joke
export const fetchRandomJoke = async (): Promise<JokeResponse> => {
	const response = await fetch("https://v2.jokeapi.dev/joke/Any");

	if (!response.ok) {
		throw new Error("Failed to fetch joke");
	}

	const data: JokeResponse = await response.json();
	return data;
};

// Fetch a programming joke
export const fetchProgrammingJoke = async (): Promise<JokeResponse> => {
	const response = await fetch("https://v2.jokeapi.dev/joke/Programming");

	if (!response.ok) {
		throw new Error("Failed to fetch programming joke");
	}

	const data: JokeResponse = await response.json();
	return data;
};

// Fetch a spooky joke
export const fetchSpookyJoke = async (): Promise<JokeResponse> => {
	const response = await fetch("https://v2.jokeapi.dev/joke/Spooky");

	if (!response.ok) {
		throw new Error("Failed to fetch spooky joke");
	}

	const data: JokeResponse = await response.json();
	return data;
};

// Fetch a christmas joke
export const fetchChristmasJoke = async (): Promise<JokeResponse> => {
	const response = await fetch("https://v2.jokeapi.dev/joke/Christmas");

	if (!response.ok) {
		throw new Error("Failed to christmas spooky joke");
	}

	const data: JokeResponse = await response.json();
	return data;
};
