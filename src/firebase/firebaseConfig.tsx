import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyAba4LbPW8dzha7J5kni3wWzDtxtZ2eorI",
    authDomain: "digimon-react-corte-pasado.firebaseapp.com",
    projectId: "digimon-react-corte-pasado",
    storageBucket: "digimon-react-corte-pasado.firebasestorage.app",
    messagingSenderId: "339512613911",
    appId: "1:339512613911:web:c7b76da13e9ae452c11052"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };