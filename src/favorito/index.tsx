import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";

function Favorito() {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(stored);
    }, []);

    return (
        <div>
            <h1>Favoritos</h1>

            {favorites.length === 0 ? (
                <p>No tienes Digimon favoritos</p>
            ) : (
                <ul>
                    {favorites.map((digimon) => (
                        <li key={digimon}>
                            <Link to={`/digimon/${digimon}`}>
                                {digimon}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Favorito;