// Gestion de l'authentification - Version locale simplifiée
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.userType = null;
        this.init();
    }

    init() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        const userTypeSelect = document.getElementById('userType');
        if (userTypeSelect) {
            userTypeSelect.addEventListener('change', (e) => {
                this.toggleLoginForm(e.target.value);
            });
        }

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
            });
        }

        // Vérifier si déjà connecté
        this.checkExistingSession();
    }

    toggleLoginForm(userType) {
        const passwordGroup = document.getElementById('passwordGroup');
        const emailGroup = document.getElementById('emailGroup');
        const passwordInput = document.getElementById('password');

        if (!passwordGroup || !emailGroup) return;

        if (userType === 'admin') {
            passwordGroup.style.display = 'block';
            emailGroup.style.display = 'none';
            passwordInput.placeholder = "Mot de passe administrateur";
        } else if (userType === 'tier') {
            passwordGroup.style.display = 'block';
            emailGroup.style.display = 'block';
            passwordInput.placeholder = "Votre mot de passe";
        } else {
            passwordGroup.style.display = 'none';
            emailGroup.style.display = 'none';
        }
    }

    handleLogin() {
        const userType = document.getElementById('userType').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const errorDiv = document.getElementById('loginError');

        if (!userType) {
            this.showError('Veuillez sélectionner un type d\'accès');
            return;
        }

        if (userType === 'admin') {
            // Connexion Admin - Mot de passe : Kevin83600
            if (password === 'Kevin83600') {
                this.currentUser = {
                    id: 'admin',
                    type: 'admin',
                    email: 'admin@firediag.local'
                };
                this.userType = 'admin';
                this.showAppScreen();
                this.saveSession();
                console.log('✅ Connexion Admin réussie');
            } else {
                this.showError('Mot de passe administrateur incorrect');
            }
        } else if (userType === 'tier') {
            // Connexion Tiers - Simulation simple
            if (email && password) {
                this.currentUser = {
                    id: email,
                    type: 'tier',
                    email: email
                };
                this.userType = 'tier';
                this.showAppScreen();
                this.saveSession();
                console.log('✅ Connexion Tiers réussie');
            } else {
                this.showError('Email et mot de passe requis');
            }
        }
    }

    checkExistingSession() {
        const savedSession = sessionStorage.getItem('firediag_session');
        if (savedSession) {
            try {
                const session = JSON.parse(savedSession);
                if (session.userType && session.loginTime) {
                    // Session valide si moins de 24h
                    const age = Date.now() - session.loginTime;
                    if (age < 24 * 60 * 60 * 1000) {
                        this.currentUser = session.user;
                        this.userType = session.userType;
                        this.showAppScreen();
                    } else {
                        sessionStorage.removeItem('firediag_session');
                    }
                }
            } catch (e) {
                console.error('Erreur session:', e);
            }
        }
    }

    showAppScreen() {
        const loginScreen = document.getElementById('loginScreen');
        const appScreen = document.getElementById('appScreen');
        const adminMenu = document.getElementById('adminMenu');

        if (loginScreen) loginScreen.classList.remove('active');
        if (appScreen) appScreen.classList.add('active');
        
        if (adminMenu) {
            adminMenu.style.display = this.userType === 'admin' ? 'block' : 'none';
        }

        console.log('🔐 Utilisateur connecté:', this.userType);
    }

    saveSession() {
        const session = {
            user: this.currentUser,
            userType: this.userType,
            loginTime: Date.now()
        };
        sessionStorage.setItem('firediag_session', JSON.stringify(session));
    }

    logout() {
        this.currentUser = null;
        this.userType = null;
        sessionStorage.removeItem('firediag_session');
        
        const loginScreen = document.getElementById('loginScreen');
        const appScreen = document.getElementById('appScreen');
        
        if (loginScreen) loginScreen.classList.add('active');
        if (appScreen) appScreen.classList.remove('active');
        
        // Reset form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) loginForm.reset();
        
        console.log('🔓 Déconnecté');
    }

    showError(message) {
        const errorDiv = document.getElementById('loginError');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.classList.add('show');
            setTimeout(() => {
                errorDiv.classList.remove('show');
            }, 5000);
        } else {
            alert(message);
        }
    }

    isAdmin() {
        return this.userType === 'admin';
    }

    isTier() {
        return this.userType === 'tier';
    }

    canAccess(section) {
        if (this.isAdmin()) return true;
        if (section === 'admin') return false;
        return true;
    }
}

// Instance globale
window.authManager = new AuthManager();
