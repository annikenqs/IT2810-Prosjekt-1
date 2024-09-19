import React from "react";
import { useState } from "react";
import "../JokeCard/JokeCard";
import "./SlideShow.css";
import "../../index.css";
import JokeCard from "../JokeCard/JokeCard";
import { slideshowIDs, useJokeById } from "../../restAPI/jokesAPI";
import CardPlaceHolder from "../JokeCard/CardPlaceholder";

function JokeSlideshow() {
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	// Get the joke based on the current ID from validIDs (using the index in the list)
	const currentJokeId = slideshowIDs[currentIndex];

	// Function for moving to the next joke
	const nextJoke = () => {
		setCurrentIndex((prevIndex) => (prevIndex < slideshowIDs.length - 1 ? prevIndex + 1 : 0));
	};

	// Function for moving to the previous joke
	const previousJoke = () => {
		setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : slideshowIDs.length - 1));
	};

	const { data: joke } = useJokeById(currentJokeId);

	// Function for directly navigating to a specific joke by its ID
	const handleJoke = (id: number) => {
		setCurrentIndex(slideshowIDs.indexOf(id));
	};

	return (
		<div className="slideshow-container">
			<div className="card-wrapper">
				<button className="arrow left-arrow" onClick={previousJoke}>
					&#8249; {/* arrow */}
				</button>
				{joke ? (
					<JokeCard jokeResponse={joke} key={currentJokeId} isSlideshowCard={true} />
				) : (
					<CardPlaceHolder />
				)}
				<button className="arrow right-arrow" onClick={nextJoke}>
					&#8250;
				</button>
			</div>
			<h3 className="skipToJoke">Skip to joke</h3>
			<div className="jokeIDButton-container">
				{slideshowIDs.map((jokeid) => (
					<button className="jokeIDButton" key={jokeid} onClick={() => handleJoke(jokeid)}>
						{slideshowIDs.indexOf(jokeid) + 1}
					</button>
				))}
			</div>
		</div>
	);
}

export default JokeSlideshow;
