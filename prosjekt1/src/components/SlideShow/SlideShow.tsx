import { useState } from "react";
import "../JokeCard/JokeCard";
import "./SlideShow.css";
import "../../index.css";

function JokeSlideshow() {
  // En statisk vits for eksempelets skyld
  const [joke, setJoke] = useState<string>(
    "Why don't skeletons fight each other? They don't have the guts."
  );

  const nextJoke = () => {
    // Funksjon for neste vits, foreløpig tom
    console.log("Next joke clicked");
  };

  const previousJoke = () => {
    // Funksjon for forrige vits, foreløpig tom
    console.log("Previous joke clicked");
  };

  return (
    <div className="slideshow-container">
      <div className="card" role="figure">
        <h3>Random Joke</h3>
        <p>- {joke}</p>
      </div>
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
