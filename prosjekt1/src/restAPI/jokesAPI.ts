import { useQuery} from '@tanstack/react-query';

export interface JokeResponse {
	type: string;
	joke?: string; // For single-type jokes
	setup?: string; // For two-part jokes
	delivery?: string; // For two-part jokes
}

// Fetch a joke, given a categorie
const fetchJoke = async (type: string): Promise<JokeResponse> => {
	const response = await fetch(`https://v2.jokeapi.dev/${type}?blacklistFlags=nsfw,religious,racist,sexist,explicit&idRange=1-100`);
	if (!response.ok) {
		throw new Error("Failed to fetch joke");
	} else if (!(type=='Christmas' || type=='Spooky' || type=='Programming')) {
		throw new Error("Invalid joke category");
	}
	const data: JokeResponse = await response.json();
	return data;
}

//Fetch a joke, given an ID
const fetchJokeById = async (id: number): Promise<JokeResponse> => {
	const response = await fetch(`https://v2.jokeapi.dev/joke/Programming,Spooky,Christmas?blacklistFlags=nsfw,religious,racist,sexist,explicit&idRange=${id}`);
	if (!response.ok) {
		throw new Error("Failed to fetch joke");
	} else if (id < 1 || id > 100) {
		throw new Error("Invalid joke ID");
	}
	const data: JokeResponse = await response.json();
	return data;
}

// Get a random joke
export const useRandomJoke = () => {
	return useQuery({
		queryKey:["joke", "Any"],
		 queryFn: () => fetchJoke("Any"),
	})
}

// Get a programming joke
export const useProgrammingJoke = () => {

	return useQuery({
		queryKey: ["joke", "Programming"],
		queryFn: () => fetchJoke("Programming"),
	});
};

// Get a spooky joke
export const useSpookyJoke = () => {

	return useQuery({
		queryKey: ["joke", "Spooky"],
		queryFn: () => fetchJoke("Spooky"),
	});
};

// Get a christmas joke
export const useChristmasJoke = () => {
	
	return useQuery({
		queryKey: ["joke", "Christmas"],
		queryFn: () => fetchJoke("Christmas"),
	});
};


// Get a joke by ID
export const useJokeById = (id: number) => {
	return useQuery({
		queryKey: ["joke", id],
		queryFn: () => fetchJokeById(id),
	});
};
