import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import JokeCard from "./components/JokeCard/JokeCard.tsx";
import "./components/JokeCard/JokeCard.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
		<JokeCard
			quote="The only limit to our realization of tomorrow is our doubts of today."
			author="Franklin D. Roosevelt"
		/>
	</StrictMode>,
);
