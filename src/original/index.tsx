import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router'
import "./style.css";

interface Digimon {
  name: string;
  img: string;
  level: string;
}

function Original() {
  const [lista, setLista] = useState<Digimon[]>([]);
  const [digimon, setDigimon] = useState<Digimon | null>(null);
  const [opciones, setOpciones] = useState<string[]>([]);
  const [resultado, setResultado] = useState("");

  useEffect(() => {
    fetch("https://digimon-api.vercel.app/api/digimon")
      .then((res) => res.json())
      .then((data) => {
        setLista(data);
      });
  }, []);

  useEffect(() => {
    if (lista.length > 0) {
      nuevaPregunta();
    }
  }, [lista]);

  const nuevaPregunta = () => {
    const digiRandom = lista[Math.floor(Math.random() * lista.length)];

    const niveles = ["Fresh", "In Training", "Rookie", "Champion", "Ultimate", "Mega", "Armor"];

    const falsas = niveles
      .filter((nivel) => nivel !== digiRandom.level)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    const mezcla = [digiRandom.level, ...falsas].sort(() => 0.5 - Math.random());

    setDigimon(digiRandom);
    setOpciones(mezcla);
    setResultado("");
  };

  const responder = (opcion: string) => {
    if (!digimon) return;

    if (opcion === digimon.level) {
      setResultado("Correcto");
    } else {
      setResultado(`Incorrecto, era ${digimon.level}`);
    }
  };

  if (!digimon) return <p>Cargando...</p>;

  return (
    <div className="trivia">
      <h1>Trivia Digimon</h1>

      <img src={digimon.img} alt={digimon.name} className="digimon-img" />

      <h2>¿Qué nivel es {digimon.name}?</h2>

      <div className="botones">
        {opciones.map((opcion) => (
          <button className="opciones" key={opcion} onClick={() => responder(opcion)}>
            {opcion}
          </button>

        ))}

      </div>

      <button className="cambiar-pregunta" onClick={nuevaPregunta}>
        Otra pregunta
      </button>

      <p className="resultado">{resultado}</p>
    </div>
  );
}

export default Original;