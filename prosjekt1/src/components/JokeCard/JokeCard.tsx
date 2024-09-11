import { useEffect, useState } from "react";
import "./JokeCard.css";
import { useSpookyJoke } from "../../restAPI/jokesAPI";

function JokeCard() {
	const [joke, setJoke] = useState<string>("Loading...");
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


	return (
		<>
			<div className="card" role="figure">
				<h3>Random Joke</h3>
				<p>- {joke}</p>
			</div>
		</>
	);
}

export default JokeCard;
