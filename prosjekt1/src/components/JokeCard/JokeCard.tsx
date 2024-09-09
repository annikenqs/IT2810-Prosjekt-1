import { useEffect, useState } from "react";
import "./JokeCard.css";
import { fetchSpookyJoke, JokeResponse } from "../../restAPI/jokesAPI";

function JokeCard() {
	const [joke, setJoke] = useState<string>("Loading...");

	useEffect(() => {
		const getJoke = async () => {
			try {
				const jokeData: JokeResponse = await fetchSpookyJoke();

				// Check the type of joke (single or two-part)
				if (jokeData.type === "single" && jokeData.joke) {
					setJoke(jokeData.joke);
				} else if (jokeData.type === "twopart" && jokeData.setup && jokeData.delivery) {
					setJoke(`${jokeData.setup} - ${jokeData.delivery}`);
				}
			} catch (error) {
				console.error(error);
				setJoke("Failed to fetch joke.");
			}
		};

		getJoke();
	}, []);
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
