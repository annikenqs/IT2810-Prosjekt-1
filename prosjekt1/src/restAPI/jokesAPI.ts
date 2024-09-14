import { useQuery} from '@tanstack/react-query';

export interface JokeResponse {
	type: string;
	joke?: string; // For single-type jokes
	setup?: string; // For two-part jokes
	delivery?: string; // For two-part jokes
	id: number;
	category: string;
}

export const validIDs: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 241, 243, 244, 245, 249, 250, 251, 252, 253, 293, 183, 295, 296, 297, 298, 299, 300, 311, 313, 315];

// Fetch a joke, given a category
const fetchJoke = async (type: string): Promise<JokeResponse> => {
	const response = await fetch(`https://v2.jokeapi.dev/${type}?blacklistFlags=racist,sexist&idRange=0-318`);
	if (!response.ok) {
		throw new Error("Failed to fetch joke");
	} else if (!(type=='Christmas' || type=='Spooky' || type=='Programming')) {
		throw new Error("Invalid joke category");
	}
	const data: JokeResponse = await response.json();
	return data;
}

//Fetch a joke, given an ID (the ID has to be valid)
const fetchJokeById = async (id: number): Promise<JokeResponse> => {
	if (!validIDs.includes(id)) {
		throw new Error("Invalid joke ID");
	}
	const response = await fetch(`https://v2.jokeapi.dev/joke/Programming,Spooky,Christmas?blacklistFlags=racist,sexist&idRange=${id}`);
	if (!response.ok) {
		throw new Error("Failed to fetch joke");
	}
	const data: JokeResponse = await response.json();
	return data;
}

//Fetch jokes for a specific category
const fetchJokesByCategory = async (category: string, batchSize: number, rangeStart: number, rangeEnd: number): Promise<JokeResponse[]> => {
  const response = await fetch(
    `https://v2.jokeapi.dev/joke/${category}?blacklistFlags=racist,sexist&amount=${batchSize}&idRange=${rangeStart}-${rangeEnd}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch ${category} jokes`);
  }
  const data = await response.json();
  if (data.error || (data.jokes && data.jokes.length === 0)) {
    console.log(`No jokes found for ${category}. Error:`, data.error ? data.error : 'None found');
    return [];
  }
  return data.jokes ?? [];
};

// Fetch exactly 10 jokes from each category
const fetchAllJokes = async (): Promise<JokeResponse[]> => {
  const batchSize = 10;
  let allJokes: JokeResponse[] = [];
	//Christmas IDs: 241, 243 - 245, 249, 250 - 253, 293
  const christmasJokes = await fetchJokesByCategory("Christmas", batchSize, 241, 293);
  if (christmasJokes.length == 10) allJokes = [...allJokes, ...christmasJokes];
	//Spooky IDs: 183, 295 - 300, 311, 313, 315
  const spookyJokes: JokeResponse[] = await fetchJokesByCategory("Spooky", batchSize, 183, 315);
  if (spookyJokes.length == 10) allJokes = [...allJokes, ...spookyJokes];
	//Programming IDs: 0-9
  const programmingJokes = await fetchJokesByCategory("Programming", batchSize, 0, 10);
  if (programmingJokes.length == 10) allJokes = [...allJokes, ...programmingJokes];
  return allJokes;
};

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
		refetchInterval: 1000 * 60 * 10, // Refetch every 10 min
	});
};

//Get all relevant jokes
export const useAllJokes = () => {
  return useQuery({
    queryKey: ["joke", "All"],
    queryFn: () => fetchAllJokes(),
		refetchInterval: 1000 * 60 * 10,
  });
};