import { useEffect, useState } from "react";
import "./App.css";
import SlideShow from "./components/SlideShow/SlideShow";
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
		{ categoryID: 1, label: "Christmas" },
		{ categoryID: 2, label: "Spooky" },
		{ categoryID: 3, label: "Programming" },
	];

	
	//Updates the jokes shown when the selected categories or the list of jokes are changed
	useEffect(() => {
		if (!jokeError && selectedCategories.length > 0) {
			const filtratedJokes = jokes.filter((j) => selectedCategories.includes(j.category));
			setFilteredJokes(filtratedJokes);
		} else {
			setFilteredJokes(jokes);
		}
	}, [selectedCategories, jokes, jokeError]);
	
	useEffect(() => {
		if (jokeError) {
			setError("Failed to fetch jokes");
		} else if (jokeData) {
			setJokes(jokeData);
		}
	}, [jokeData, jokeError]);
	
	useEffect(() => {
		const savedCategories = JSON.parse(sessionStorage.getItem("savedCategories") || "[]");
		setCategories(savedCategories);
	}, []);
	
	const handleToggleClick = () => {
		setShowFavorites((prevShowFavorites) => !prevShowFavorites); // Toggle between true and false
	};
	
	//Updates selected categories to filter on
	const handleFilterInput = (checkedCategory: string) => {
		let updatedCategories = [];
		if (!selectedCategories.includes(checkedCategory)) {
			updatedCategories = [...selectedCategories, checkedCategory];
		} else {
			updatedCategories = selectedCategories.filter((cat) => cat != checkedCategory);
		}
		setCategories(updatedCategories);
		sessionStorage.setItem("savedCategories", JSON.stringify(updatedCategories));
	};
	
	const DropDownFilter = () => {
		return (
			<>
				<div className="dropdown">
					<button className="button">Filter</button>
					<div className="dropdown-content">
						{categories.map((category) => (
							<label key={category.categoryID}>
								<input
									type="checkbox"
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
		);
	};
	
	return (
		<>
			<div className="header-container">
				<img src="/src/assets/plant.png" className="plant plant-left" alt="Plant Left" />
				<h1 className="title">The Giggle Garden</h1>
				<img src="/src/assets/plant.png" className="plant plant-right" alt="Plant Right" />
			</div>
			<SlideShow />
			{!showFavorites && <DropDownFilter />}
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
					<JokeCard jokeResponse={joke} key={joke.id} />
				))
			)}
		</>
	);
}

export default App;
