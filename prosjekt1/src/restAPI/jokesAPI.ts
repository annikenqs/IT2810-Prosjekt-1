import { useQuery} from '@tanstack/react-query';

export interface JokeResponse {
	type: string;
	joke?: string; // For single-type jokes
	setup?: string; // For two-part jokes
	delivery?: string; // For two-part jokes
}

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

//Fetch a joke, given an ID
const fetchJokeById = async (id: number): Promise<JokeResponse> => {
	const response = await fetch(`https://v2.jokeapi.dev/joke/Programming,Spooky,Christmas?blacklistFlags=racist,sexist&idRange=${id}`);
	if (!response.ok) {
		throw new Error("Failed to fetch joke");
	}
	const data: JokeResponse = await response.json();
	return data;
}

//Fetch jokes for a specific category
const fetchJokesByCategory = async (category: string, batchSize: number): Promise<JokeResponse[]> => {
  const response = await fetch(
    `https://v2.jokeapi.dev/joke/${category}?blacklistFlags=racist,sexist&amount=${batchSize}&idRange=0-318`
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

  const christmasJokes = await fetchJokesByCategory("Christmas", batchSize);
  if (christmasJokes.length > 0) allJokes = [...allJokes, ...christmasJokes];

  const spookyJokes = await fetchJokesByCategory("Spooky", batchSize);
  if (spookyJokes.length > 0) allJokes = [...allJokes, ...spookyJokes];

  const programmingJokes = await fetchJokesByCategory("Programming", batchSize);
  allJokes = [...allJokes, ...programmingJokes];

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
	});
};

//Get all relevant jokes
export const useAllJokes = () => {
  return useQuery({
    queryKey: ["joke", "All"],
    queryFn: () => fetchAllJokes(),
  });
};