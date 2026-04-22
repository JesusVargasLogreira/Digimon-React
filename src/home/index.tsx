import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router'
import "./style.css";

interface Digimon {
    name: string
    img: string
    level: string
}

type FiltroTipo = 'nombre' | 'nivel'

function Home() {

    const [lista, setLista] = useState<Digimon[]>([])

    //filtro
    const [filtro, setFiltro] = useState<FiltroTipo>('nombre')

    const filtros: FiltroTipo[] = ['nombre', 'nivel']

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://digimon-api.vercel.app/api/digimon")
                const data = await res.json()
                setLista(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    const listaOrdenada =
        filtro === 'nombre'
            ? [...lista].sort((a, b) => a.name.localeCompare(b.name))
            : [...lista].sort((a, b) => a.level.localeCompare(b.level))

    return (
        <>
            <div className="filtros">
                {filtros.map((item) => (
                    <button
                        key={item}
                        onClick={() => setFiltro(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Imagen</th>
                        <th>Nivel</th>
                    </tr>
                </thead>

                <tbody>
                    {listaOrdenada.map((digimon) => (
                        <tr key={digimon.name}>
                            <td>{digimon.name}</td>
                            <td>
                                <img src={digimon.img} width="80" />
                            </td>
                            <td>{digimon.level}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Home