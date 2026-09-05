// Système d'authentification
const ADMIN_PASSWORD = "Kevin83600";
let currentUser = null;
let userType = 'guest'; // 'admin' ou 'guest'

// Gestion du formulaire de connexion
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = document.getElementById('password').value;
  
  try {
    if (password === ADMIN_PASSWORD) {
      // Connexion Admin
      userType = 'admin';
      currentUser = {
        uid: 'admin_' + Date.now(),
        email: 'admin@diagfire.local',
        isAdmin: true
      };
      
      // Sauvegarder la session
      localStorage.setItem('userType', 'admin');
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      localStorage.setItem('sessionToken', generateUniqueToken());
      
      showApp();
      logActivity('Connexion administrateur réussie');
    } else {
      // Tentative de connexion Firebase pour les utilisateurs tiers
      await auth.signInWithEmailAndPassword('user@example.com', password);
      userType = 'guest';
      showApp();
    }
  } catch (error) {
    showError('Mot de passe incorrect ou compte non autorisé');
    console.error('Erreur de connexion:', error);
  }
});

// Accès invité
document.getElementById('guestAccess').addEventListener('click', async () => {
  try {
    // Connexion anonyme Firebase pour les invités
    const result = await auth.signInAnonymously();
    userType = 'guest';
    currentUser = {
      uid: result.user.uid,
      email: 'guest@diagfire.local',
      isAdmin: false
    };
    
    localStorage.setItem('userType', 'guest');
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    showApp();
    logActivity('Connexion invité');
  } catch (error) {
    showError('Accès invité non disponible. Contactez l\'administrateur.');
    console.error('Erreur accès invité:', error);
  }
});

// Déconnexion
document.getElementById('logoutBtn').addEventListener('click', async () => {
  try {
    await auth.signOut();
    currentUser = null;
    userType = 'guest';
    localStorage.removeItem('userType');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('sessionToken');
    
    document.getElementById('appScreen').classList.remove('active');
    document.getElementById('loginScreen').classList.add('active');
    document.getElementById('password').value = '';
    
    logActivity('Déconnexion');
  } catch (error) {
    console.error('Erreur déconnexion:', error);
  }
});

// Afficher l'application
function showApp() {
  document.getElementById('loginScreen').classList.remove('active');
  document.getElementById('appScreen').classList.add('active');
  
  // Configurer l'interface selon le type d'utilisateur
  if (userType === 'admin') {
    document.getElementById('userType').textContent = 'Admin';
    document.getElementById('adminNavBtn').style.display = 'flex';
  } else {
    document.getElementById('userType').textContent = 'Invité';
    document.getElementById('adminNavBtn').style.display = 'none';
  }
  
  // Initialiser l'application
  initApp();
}

// Générer un token unique
function generateUniqueToken() {
  return 'token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Vérifier la session au chargement
window.addEventListener('load', () => {
  const savedUserType = localStorage.getItem('userType');
  const savedUser = localStorage.getItem('currentUser');
  
  if (savedUserType && savedUser) {
    userType = savedUserType;
    currentUser = JSON.parse(savedUser);
    showApp();
  }
});

// Afficher les erreurs
function showError(message) {
  const errorDiv = document.getElementById('loginError');
  errorDiv.textContent = message;
  errorDiv.classList.add('active');
  
  setTimeout(() => {
    errorDiv.classList.remove('active');
  }, 5000);
}

// Journal d'activité
function logActivity(action) {
  const log = {
    timestamp: new Date().toISOString(),
    user: currentUser?.email || 'inconnu',
    action: action,
    userType: userType
  };
  
  // Sauvegarder localement
  let activityLog = JSON.parse(localStorage.getItem('activityLog') || '[]');
  activityLog.push(log);
  localStorage.setItem('activityLog', JSON.stringify(activityLog));
  
  // Sauvegarder dans Firebase si admin et connecté
  if (userType === 'admin' && db) {
    db.collection('activityLogs').add(log).catch(err => console.error(err));
  }
}

// Vérifier les permissions
function checkPermission(requiredType = 'guest') {
  if (userType === 'admin') return true;
  if (requiredType === 'guest' && userType === 'guest') return true;
  return false;
}

// Exporter les fonctions
window.auth = {
  checkPermission,
  logActivity,
  currentUser,
  userType
};
