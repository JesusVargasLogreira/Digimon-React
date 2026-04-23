import { useEffect, useState } from "react";
import "./style.css";


function Informativa() {
  const [totalDigimon, setTotalDigimon] = useState(0);

  useEffect(() => {
    fetch("https://digimon-api.vercel.app/api/digimon")
      .then(response => response.json())
      .then(data => {
        setTotalDigimon(data.length);
      });
  }, []);

  return (
    <>
      <div className="informacion">
        <h1>Digimon API</h1>
        <p>Jesus Maria Vargas Logreira</p>
        <img src="https://www.pngplay.com/wp-content/uploads/7/Digimon-Character-Transparent-File.png" alt="logo-digimon" />

        <div className="totaldigimon">
          <p>API con informacion de {totalDigimon} Digimon</p>
        </div>
        <p className="github">https://github.com/JesusVargasLogreira</p>
        <p>v1.0</p>
      </div>
    </>
  )
}

export default Informativa