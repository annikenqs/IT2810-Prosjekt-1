import { useEffect, useState } from "react";
import "./JokeCard.css";
import { useSpookyJoke } from "../../restAPI/jokesAPI";

function JokeCard() {
	const [joke, setJoke] = useState<string>("Loading...");
	const [isFavorite, setIsFavorite] = useState<boolean>(false);
	const { data: jokeData, error, isLoading} = useSpookyJoke();
	
	useEffect(() => {
		if (isLoading) {
			setJoke("Loading...")
		}
		else if (error) {
			setJoke("Failed to fetch joke")
		}
		else if (jokeData) {
			if (jokeData.type === "single" && jokeData.joke) {
				setJoke(jokeData.joke);
			} else if (jokeData.type === "twopart" && jokeData.setup && jokeData.delivery) {
				setJoke(`${jokeData.setup} - ${jokeData.delivery}`);
			}
		}
	}, [isLoading, error, jokeData]);

	useEffect(() => {
		// Load favorite status from localStorage
		const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
		const isCurrentJokeFavorite = savedFavorites.includes(joke);
		setIsFavorite(isCurrentJokeFavorite);
	}, [joke]);

	const handleFavoriteClick = () => {
		const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
		if (isFavorite) {
			// Remove the joke from favorites
			const updatedFavorites = savedFavorites.filter((favJoke: string) => favJoke !== joke);
			localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
		} else {
			// Add the joke to favorites
			const updatedFavorites = [...savedFavorites, joke];
			localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
		}
		setIsFavorite(!isFavorite);
	};

	return (
		<section className="card" role="figure">
		  <h3>Random Joke</h3>
		  <p>- {joke}</p>

		  {/* Star: to favorite a joke */}
		  <button onClick={handleFavoriteClick} className="favorite-button">
			{isFavorite ? "★" : "☆"}
		  </button>
		</section>
	  );
}

export default JokeCard;
