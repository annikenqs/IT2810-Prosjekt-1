import { useEffect, useState } from "react";
import "../JokeCard/JokeCard";
import "./SlideShow.css";
import "../../index.css";
import JokeCard from "../JokeCard/JokeCard";
import { slideshowIDs, useJokeById } from "../../restAPI/jokesAPI";

function JokeSlideshow() {
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	// Hent vitsen basert på gjeldende ID fra validIDs (ved bruk av index i listen)
	const currentJokeId = slideshowIDs[currentIndex];

	// Funksjon for neste vits
	const nextJoke = () => {
		setCurrentIndex((prevIndex) => (prevIndex < slideshowIDs.length - 1 ? prevIndex + 1 : 0));
	};

	// Funksjon for forrige vits
	const previousJoke = () => {
		setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : slideshowIDs.length - 1));
	};

	const { data: joke, error, isLoading } = useJokeById(currentJokeId);

	useEffect(() => {
		console.log("currentJokeId:", currentJokeId);
	}, [currentIndex, currentJokeId]); // Logs after currentIndex updates

	const handleJoke = (id: number) => {
		setCurrentIndex(slideshowIDs.indexOf(id));
		console.log("currentJokeId:", currentJokeId); // Add this line to log the current joke ID
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error loading joke</div>;
	}

	return (
		<div className="slideshow-container">
			{joke && <JokeCard jokeResponse={joke} key={currentJokeId} />}
			<div className="controls">
				<button className="button" onClick={previousJoke}>
					Previous
				</button>
				<button className="button" onClick={nextJoke}>
					Next
				</button>
			</div>
      <h3 className="skipToJoke">Skip to joke</h3>
			<div className="jokeIDButton-container">
				{slideshowIDs.map((jokeid) => (
					<button className="jokeIDButton" key={jokeid} onClick={() => handleJoke(jokeid)}>
						{slideshowIDs.indexOf(jokeid)}
					</button>
				))}
			</div>
		</div>
	);
}

export default JokeSlideshow;
