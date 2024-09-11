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

	const handleFavoriteClick = () => {
		setIsFavorite(!isFavorite); // Toggle the favorite state
	  }; // TODO: Implement favorite functionality

	return (
		<div className="card" role="figure">
		  <h3>Random Joke</h3>
		  <p>- {joke}</p>

		  {/* Star: to favorite a joke */}
		  <button onClick={handleFavoriteClick} className="favorite-button">
			{isFavorite ? "★" : "☆"}
		  </button>
		</div>
	  );
}

export default JokeCard;
