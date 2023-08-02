import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcBtJdwiD1vzii-NrUzSn6r6SHz7jQRsQ",
  authDomain: "todo-app-3d57e.firebaseapp.com",
  projectId: "todo-app-3d57e",
  storageBucket: "todo-app-3d57e.appspot.com",
  messagingSenderId: "93227968807",
  appId: "1:93227968807:web:e30bc6490ab527a9636102",
  measurementId: "G-S157MB723X",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
