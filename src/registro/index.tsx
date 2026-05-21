import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';

import './style.css';

export default function Registro() {

    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [fecha, setFecha] = useState('');
    const [telefono, setTelefono] = useState('');

    const navigate = useNavigate();

    const registrarse = async () => {

        try {
            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    correo,
                    contrasena
                );

            const user = userCredential.user;

            await setDoc(
                doc(db, 'usuarios', user.uid),
                {
                    uid: user.uid,
                    nombre,
                    correo,
                    fecha,
                    telefono,
                    ganados: 0,
                    perdidos: 0,
                }
            );

            alert('Usuario registrado correctamente');

            navigate('/usuario');

        } catch (error: any) {

            alert('Error al registrarse: ' + error.message);

        }
    };

    return (

        <div className="container">

            <h1 className="titulo">Registrarse</h1>

            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) =>
                    setNombre(e.target.value)
                }
                className="input"
            />

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

            <input
                type="date"
                value={fecha}
                onChange={(e) =>
                    setFecha(e.target.value)
                }
                className="input"
            />

            <input
                type="tel"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) =>
                    setTelefono(
                        e.target.value
                    )
                }
                className="input"
            />

            <button
                onClick={registrarse}
                className="boton"
            >
                Registrarse
            </button>

            <button
                onClick={() => navigate('/login')}
                className="boton"
            >
                Ya tengo una cuenta
            </button>

        </div>

    );
}