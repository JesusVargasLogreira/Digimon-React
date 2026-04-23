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

    const [busqueda, setBusqueda] = useState('')

    useEffect(() => {
        setBusqueda('')
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
    }, [filtro])

    const ordenNombre = lista.filter((digimon) =>
        busqueda.length < 3
            ? true // muestra todos si hay menos de 3 caracteres
            : digimon.name.toLowerCase().includes(busqueda.toLowerCase())
    ).sort((a, b) => a.name.localeCompare(b.name))

    const ordenNivel = lista.filter((digimon) =>
        busqueda.length < 3
            ? true // muestra todos si hay menos de 3 caracteres
            : digimon.name.toLowerCase().includes(busqueda.toLowerCase())
    ).sort((a, b) => a.level.localeCompare(b.level))


    return (
        <>
            <div className="filtros">
                {filtros.map((onestat) => (
                    <button
                        key={onestat}
                        onClick={() => setFiltro(onestat)}
                        className={filtro === onestat ? 'activo' : ''}
                    >
                        {onestat}
                    </button>
                ))}
            </div>

            <input
                type="text"
                placeholder='Buscar...'
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            <div className="tabla-container">
                <h2>Digimon</h2>
                {filtro === 'nombre' ? (
                    <table className="tabla-posiciones">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Imagen</th>
                                <th>Nivel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordenNombre.map((digimon) => (
                                <tr key={digimon.name}
                                    className={busqueda.length >= 3 &&
                                        digimon.name.toLowerCase().includes(busqueda.toLowerCase())
                                        ? 'resaltado'
                                        : ''
                                    }

                                >
                                    <td>{digimon.name}</td>
                                    <td>
                                        <img src={digimon.img} width="80" />
                                    </td>
                                    <td>{digimon.level}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <table className="tabla-posiciones">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Imagen</th>
                                <th>Nivel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordenNivel.map((digimon) => (
                                <tr key={digimon.name}
                                    className={busqueda.length >= 3 &&
                                        digimon.name.toLowerCase().includes(busqueda.toLowerCase())
                                        ? 'resaltado'
                                        : ''
                                    }
                                >
                                    <td>{digimon.name}</td>
                                    <td>
                                        <img src={digimon.img} width="80" />
                                    </td>
                                    <td>{digimon.level}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
                }

            </div>

        </>
    )
}

export default Home