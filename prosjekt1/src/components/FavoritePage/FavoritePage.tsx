import React, { useEffect, useState } from "react";
import "./FavoritePage.css";

function FavoritePage() {
    const [favorites, setFavorites] = useState<string[]>([]);
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(savedFavorites);
    }, []);

    // Show list of favorite jokes
    return (
        <section className="favoriteWindow">
            <h3>Favorites</h3>
        
            {favorites.length === 0 ? (
                <p>You don't have any favorite jokes. <br></br>Use the star button to mark your favorites.</p>
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