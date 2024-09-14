import { useEffect, useState } from "react";
import "./JokeCard.css";
import { JokeResponse, useJokeById } from "../../restAPI/jokesAPI";

interface JokeCardProps {
	jokeResponse: JokeResponse; 
	jokeId: number;
  }

function JokeCard({ jokeResponse: j, jokeId }: JokeCardProps) {
	const [joke, setJoke] = useState<string>("Loading...");
	const [isFavorite, setIsFavorite] = useState<boolean>(false);
	const { data: jokeData, error, isLoading} = useJokeById(jokeId);
	
	useEffect(() => {
		if (isLoading) {
			setJoke("Loading...");
		} else if (error) {
			setJoke(error.message);
		} else if (jokeData) {
			if (j.type === "single" && j.joke) {
				//setJoke(jokeData.joke);
				setJoke(j.joke)
			} else if (j.type === "twopart" && j.setup && j.delivery) {
				setJoke(`${j.setup} - ${j.delivery}`);
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
		  <h3>Joke #{jokeId}</h3>
		  <p>- {joke}</p>

		  {/* Star: to favorite a joke */}
		  <button onClick={handleFavoriteClick} className="favorite-button">
			{isFavorite ? "★" : "☆"}
		  </button>
		</section>
	  );
}

export default JokeCard;
