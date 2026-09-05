
const firebaseConfig = {
  apiKey: "AIzaSyAkebsuKnu-etYBobBmhMMUtiJtjNYo8u4",
  authDomain: "firediag-auto.firebaseapp.com",
  projectId: "firediag-auto",
  storageBucket: "firediag-auto.firebasestorage.app",
  messagingSenderId: "939193182729",
  appId: "1:939193182729:web:5495a30e3cb586f63f26d8"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const GEMINI_API_KEY = "AQ.Ab8RN6LB86gKsbwqUPLZCCHljthOnGznawNznbp4KlJ9-a30MA";
