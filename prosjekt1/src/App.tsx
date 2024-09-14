import { useEffect, useState } from "react";
import "./App.css";
import JokeCard from "./components/JokeCard/JokeCard";
import FavoritePage from "./components/FavoritePage/FavoritePage";
import { JokeResponse, useAllJokes } from "./restAPI/jokesAPI";

function App() {
	const [jokes, setJokes] = useState<JokeResponse[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [filtratedJokes, setFilteredJokes] = useState<JokeResponse[]>([]);
	const [selectedCategories, setCategories] = useState<string[]>([]);
	const { data: jokeData, error: jokeError, isLoading } = useAllJokes();
	const [showFavorites, setShowFavorites] = useState(false); // State to track which page to show
	const categories = [
		{categoryID: 1, label: "Christmas"},
		{categoryID: 2, label: "Spooky"},
		{categoryID: 3, label: "Programming"}
	];
	
	useEffect(() => {
		if (selectedCategories.length > 0) {
			const filtratedJokes = jokes.filter((j) =>
				selectedCategories.includes(j.category)
		);
		setFilteredJokes(filtratedJokes);
		} else {
			setFilteredJokes(jokes); 
		}
	}, [selectedCategories, jokes]);

	useEffect(() => {
		if (jokeError) {
			setError("Failed to fetch jokes");
		} else if (jokeData) {
			setJokes(jokeData); 
			setFilteredJokes(jokeData);
		}
	}, [jokeData, jokeError]);

	const handleToggleClick = () => {
		setShowFavorites((prevShowFavorites) => !prevShowFavorites); // Toggle between true and false
	};
	const handleFilterInput = (checkedCategory: string) => {
		if (!selectedCategories.includes(checkedCategory)) {
			setCategories([...selectedCategories, checkedCategory]);
		} else {
			setCategories(selectedCategories.filter(cat => cat != checkedCategory));
		}
	}

	const DropDownFilter = () => {
		return (
			<>
				<div className="dropdown">
					<button>Filter</button>
					<div className="dropdown-content">
					{categories.map((category) => (
						<label key={category.categoryID}>
							<input
								type ="checkbox"
								value={category.categoryID} 
								onChange={() => handleFilterInput(category.label)}
								checked={selectedCategories.includes(category.label)}
								/>
							{category.label}
						</label>
					))}
					</div>
				</div>
			</>
		)
	}


	return (
		<>
			<h1>The Giggle Garden</h1>
			<DropDownFilter />
			{/* Button text changes based on showFavorites state */}
			<button className="button" onClick={handleToggleClick}>
				{showFavorites ? "Back" : "Favorites"}
			</button>
			{error && <p>{error}</p>}
			{/* Conditionally render FavoritePage or JokeCard based on state */}
			{showFavorites ? (
				<FavoritePage />
			) : isLoading ? (
				<p>Loading jokes...</p>
			) : (
				filtratedJokes.map((joke) => (
					<JokeCard jokeResponse={joke} jokeId={joke.id} key={joke.id} />
				))
			)}
		</>
	);
}

export default App;
