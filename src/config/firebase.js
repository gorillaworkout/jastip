// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeBsCqJopKgY5R2SchY_usMb9boYRKusc",
  authDomain: "jastip-gw.firebaseapp.com",
  projectId: "jastip-gw",
  storageBucket: "jastip-gw.appspot.com",
  messagingSenderId: "192714744884",
  appId: "1:192714744884:web:af630fd7252c3931ad9661"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}

export default app