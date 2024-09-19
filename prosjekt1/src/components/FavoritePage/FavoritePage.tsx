import React, { useEffect, useState } from "react";
import "./FavoritePage.css";

function FavoritePage() {
	// State hook to store the array of favorite jokes
	const [favorites, setFavorites] = useState<string[]>([]);
	useEffect(() => {
		// // Retrieve favorites from localStorage, or default to an empty array if none are found
		const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
		setFavorites(savedFavorites);
	}, []);

	// Return JSX to display the list of favorite jokes or a message if the list is empty
	return (
		<section className="favoriteWindow">
			<h3>Favorites</h3>

			{favorites.length === 0 ? (
				<p>
					You don't have any favorite jokes. <br></br>Use the star button to mark your favorites.
				</p>
			) : (
				<ul>
					{favorites.map((favorite, index) => (
						<li key={index}>{favorite}</li>
					))}
				</ul>
			)}
		</section>
	);
}

export default FavoritePage;
