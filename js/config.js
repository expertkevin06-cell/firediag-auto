// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAkebsuKnu-etYBob8mhMUMt1JtjNYo8u4",
    authDomain: "firediag-auto.firebaseapp.com",
    projectId: "firediag-auto",
    storageBucket: "firediag-auto.appspot.com",
    messagingSenderId: "939193182729",
    appId: "1:939193182729:web:5495a30e3cb86f63f26d8"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Clé Gemini - Peut être modifiée par l'admin
// Priorité : localStorage > valeur par défaut
let GEMINI_API_KEY = localStorage.getItem('geminiApiKey') || "AIzaSyAkebsuKnu-etYBob8mhMUMt1JtjNYo8u4";

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

// Configuration de l'application
const APP_CONFIG = {
    ADMIN_PASSWORD: "Kevin83600",
    APP_NAME: "FireDiag Auto",
    VERSION: "2.0.0",
    MAX_TOKEN_AGE: 3600000, // 1 heure en millisecondes
    OFFLINE_STORAGE: "firediag_db_v2",
    DEFAULT_GEMINI_KEY: "AIzaSyAkebsuKnu-etYBob8mhMUMt1JtjNYo8u4"
};

// Types d'utilisateurs
const USER_TYPES = {
    ADMIN: 'admin',
    TIER: 'tier'
};

// Sections disponibles
const SECTIONS = {
    ACCUEIL: 'accueil',
    INCENDIE_ELECTRIQUE: 'incendie-electrique',
    INCENDIE_MECANIQUE: 'incendie-mecanique',
    BATTERIES: 'batteries',
    CABLES_COSSES: 'cables-cosses',
    FEUX_CRIMINELS: 'feux-criminels',
    RECHERCHE_IA: 'recherche-ia',
    ADMIN: 'admin'
};

// URLs des images à télécharger
const IMAGES_TO_DOWNLOAD = [
    { id: 'court-circuit', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800' },
    { id: 'surchauffe', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800' },
    { id: 'surcharge', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800' },
    { id: 'echappement', url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800' },
    { id: 'fap', url: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=800' },
    { id: 'batterie-bt', url: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800' },
    { id: 'batterie-ht', url: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800' },
    { id: 'consommation', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800' },
    { id: 'cables', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800' },
    { id: 'cosses', url: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800' },
    { id: 'feu-criminel', url: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?w=800' }
];

// Export pour utilisation globale
window.APP_CONFIG = APP_CONFIG;
window.USER_TYPES = USER_TYPES;
window.SECTIONS = SECTIONS;
window.IMAGES_TO_DOWNLOAD = IMAGES_TO_DOWNLOAD;

// Fonction pour mettre à jour la clé Gemini
window.updateGeminiKey = function(newKey) {
    GEMINI_API_KEY = newKey;
    localStorage.setItem('geminiApiKey', newKey);
    console.log('Clé Gemini mise à jour');
};

// Fonction pour réinitialiser la clé Gemini
window.resetGeminiKey = function() {
    localStorage.removeItem('geminiApiKey');
    GEMINI_API_KEY = APP_CONFIG.DEFAULT_GEMINI_KEY;
    console.log('Clé Gemini réinitialisée');
};
