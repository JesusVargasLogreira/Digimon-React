import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { auth } from '../firebase/firebaseConfig';

import './style.css';

export default function Login() {

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    const navigate = useNavigate();

    const iniciarSesion = async () => {

        try {
            await signInWithEmailAndPassword(
                auth,
                correo,
                contrasena
            );

            alert('Sesión iniciada');

            navigate('/usuario');

        } catch (error: any) {

            alert('Error al iniciar sesión: ' + error.message);

        }
    };

    return (

        <div className="container">

            <h1 className="titulo"> Iniciar sesión</h1>

            <input
                type="email"
                placeholder="Correo"
                value={correo}
                onChange={(e) =>
                    setCorreo(e.target.value)
                }
                className="input"
            />

            <input
                type="password"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) =>
                    setContrasena(
                        e.target.value
                    )
                }
                className="input"
            />

            <button
                onClick={iniciarSesion}
                className="boton"
            >
                Iniciar sesión
            </button>

            <button
                onClick={() => navigate('/registro')}
                className="boton"
            >
                Crear cuenta nueva
            </button>

        </div>

    );
}