
const firebaseConfig = {
  apiKey: "AIzaSyAkebsuk...",
  authDomain: "firediag-auto.firebaseapp.com",
  projectId: "firediag-auto",
  storageBucket: "firediag-auto.appspot.com",
  messagingSenderId: "939193182729",
  appId: "1:939193182729:web:..."
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const GEMINI_API_KEY = "VOTRE_CLE_GEMINI";
