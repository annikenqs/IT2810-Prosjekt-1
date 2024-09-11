import { useQuery} from '@tanstack/react-query';

export interface JokeResponse {
	type: string;
	joke?: string; // For single-type jokes
	setup?: string; // For two-part jokes
	delivery?: string; // For two-part jokes
}

// Fetch a joke, given a categorie
const fetchJoke = async (type: string): Promise<JokeResponse> => {
	const response = await fetch(`https://v2.jokeapi.dev/joke/${type}`);
	if (!response.ok) {
		throw new Error("Failed to fetch joke");
	}
	const data: JokeResponse = await response.json();
	return data;
}

// Fetch a random joke
export const useRandomJoke = () => {
	return useQuery({
		queryKey:["joke", "Any"],
		 queryFn: () => fetchJoke("Any"),
	})
}

// Fetch a programming joke
export const useProgrammingJoke = () => {

	return useQuery({
		queryKey: ["joke", "Programming"],
		queryFn: () => fetchJoke("Programming"),
	});
};

// Fetch a spooky joke
export const useSpookyJoke = () => {

	return useQuery({
		queryKey: ["joke", "Spooky"],
		queryFn: () => fetchJoke("Spooky"),
	});
};

// Fetch a christmas joke
export const useChristmasJoke = () => {
	
	return useQuery({
		queryKey: ["joke", "Christmas"],
		queryFn: () => fetchJoke("Christmas"),
	});
};
