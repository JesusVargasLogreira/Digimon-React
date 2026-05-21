import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

import './style.css';

export default function Usuario() {

    const navigate = useNavigate();

    const [usuarioActual, setUsuarioActual] = useState<User | null>(null);

    useEffect(() => {

        const unsubscribe =
            onAuthStateChanged(auth, (user) => {

                setUsuarioActual(user);

            });

        return () => unsubscribe();

    }, []);

    const cerrarSesion = async () => {

        try {

            await signOut(auth);

            alert('Sesión cerrada');

        } catch (error: any) {

            alert(
                'Error al cerrar sesión'
            );

        }
    };

    return (

        <div className="container">

            <h1 className="titulo">Usuario</h1>

            {usuarioActual ? (

                <>
                    <p className="texto">

                        Sesión iniciada:
                        {' '}
                        {usuarioActual.email}

                    </p>

                    <button
                        onClick={cerrarSesion}
                        className="boton cerrar"
                    >
                        Cerrar sesión
                    </button>

                </>

            ) : (

                <>
                    <button
                        onClick={() =>
                            navigate('/login')
                        }
                        className="boton"
                    >
                        Iniciar sesión
                    </button>

                    <button
                        onClick={() =>
                            navigate('/registro')
                        }
                        className="boton"
                    >
                        Crear cuenta nueva
                    </button>

                </>

            )}

        </div>

    );
}