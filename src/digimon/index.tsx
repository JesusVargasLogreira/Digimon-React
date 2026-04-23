import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "./style.css";

interface Digimon {
    name: string
    img: string
    level: string
}

function Digimon() {
    const { digimon } = useParams<{ digimon: string }>();

    const [data, setData] = useState<Digimon[]>([]);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (!digimon) return;

        // Revisar si ya es favorito
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

        if (favorites.includes(digimon)) {
            setIsFavorite(true);
        }

        const fetchData = async () => {
            try {
                const res = await fetch(
                    `https://digimon-api.vercel.app/api/digimon/name/${digimon}`
                );

                const data = await res.json();
                setData(data);
            } catch (error) {
                console.error("Error cargando datos:", error);
            }
        };

        fetchData();
    }, [digimon]);

    const toggleFavorite = () => {
        if (!digimon) return;

        let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

        if (favorites.includes(digimon)) {
            favorites = favorites.filter((fav: string) => fav !== digimon);
            setIsFavorite(false);
        } else {
            favorites.push(digimon);
            setIsFavorite(true);
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
    };

    if (data.length === 0) return <p>Cargando...</p>;

    return (
        <div className="informacion">
            <h1>{data[0].name}


            </h1>
            <img src={data[0].img} alt={data[0].name} />
            <p><strong>Nivel:</strong> {data[0].level}</p>
            <button onClick={toggleFavorite}>
                {isFavorite ? "❤️" : "🤍"}
            </button>

        </div>
    );

}

export default Digimon;