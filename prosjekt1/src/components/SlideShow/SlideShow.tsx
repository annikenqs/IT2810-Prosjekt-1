import { useState } from "react";
import "../JokeCard/JokeCard";
import "./SlideShow.css";
import "../../index.css";
import JokeCard from "../JokeCard/JokeCard";
import { useAllJokes} from "../../restAPI/jokesAPI"; // Pass på at stien er riktig


function JokeSlideshow() {
  const { data: jokes, isLoading, isError } = useAllJokes();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Funksjon for neste vits
  const nextJoke = () => {
    if (jokes && currentIndex < jokes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Hvis det ikke er flere vitser, gå tilbake til starten
    }
  };

  // Funksjon for forrige vits
  const previousJoke = () => {
    if (jokes && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (jokes) {
      setCurrentIndex(jokes.length - 1); // Hvis vi er på første vits, gå til siste
    }
  };

  if (isLoading) {
    return <div>Loading jokes...</div>;
  }

  if (isError || !jokes || jokes.length === 0) {
    return <div>Failed to load jokes or no jokes available.</div>;
  }


  return (
    <div className="slideshow-container">
        <JokeCard jokeId={currentIndex + 1}/>
      <div className="controls">
        <button className="button" onClick={previousJoke}>
          Previous
        </button>
        <button className="button" onClick={nextJoke}>
          Next
        </button>
      </div>
    </div>
  );
}

export default JokeSlideshow;
