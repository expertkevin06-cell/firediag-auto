// Application principale
class FireDiagApp {
    constructor() {
        this.init();
    }

    async init() {
        // Attendre que le DOM soit chargé
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.initNavigation();
        this.initMenu();
        this.initConnectivity();
        this.initDatabase();
        this.loadInitialData();
        
        console.log('FireDiag Auto initialisé');
    }

    initNavigation() {
        // Navigation par menu
        document.querySelectorAll('.menu-items a[data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.getAttribute('data-section');
                this.navigateToSection(section);
            });
        });

        // Navigation par cartes
        document.querySelectorAll('.feature-card[data-section]').forEach(card => {
            card.addEventListener('click', (e) => {
                const section = e.currentTarget.getAttribute('data-section');
                this.navigateToSection(section);
            });
        });
    }

    initMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const closeMenu = document.getElementById('closeMenu');
        const sideMenu = document.getElementById('sideMenu');
        const overlay = document.getElementById('overlay');

        menuToggle.addEventListener('click', () => {
            sideMenu.classList.add('active');
            overlay.classList.add('active');
        });

        const closeMenuFunc = () => {
            sideMenu.classList.remove('active');
            overlay.classList.remove('active');
        };

        closeMenu.addEventListener('click', closeMenuFunc);
        overlay.addEventListener('click', closeMenuFunc);
    }

    initConnectivity() {
        dbManager.initConnectivityListener();
        
        // Afficher bannière offline
        window.addEventListener('offline', () => {
            const banner = document.createElement('div');
            banner.id = 'offlineBanner';
            banner.className = 'offline-banner show';
            banner.textContent = '⚠️ Mode hors ligne activé - Les données seront synchronisées lors du retour de la connexion';
            document.body.appendChild(banner);
        });

        window.addEventListener('online', () => {
            const banner = document.getElementById('offlineBanner');
            if (banner) {
                banner.remove();
            }
        });
    }

    initDatabase() {
        // Initialiser les fiches par défaut si vide
        this.initializeDefaultFiches();
    }

    async initializeDefaultFiches() {
        const defaultFiches = [
            {
                id: 'court-circuit',
                category: 'electrique',
                title: 'Court-Circuit Électrique',
                updatedAt: Date.now()
            },
            {
                id: 'surchauffe',
                category: 'electrique',
                title: 'Surchauffe Électrique',
                updatedAt: Date.now()
            },
            {
                id: 'surcharge',
                category: 'electrique',
                title: 'Surcharge Électrique',
                updatedAt: Date.now()
            },
            {
                id: 'echappement',
                category: 'mecanique',
                title: 'Fuites sur Échappement',
                updatedAt: Date.now()
            },
            {
                id: 'fap',
                category: 'mecanique',
                title: 'Filtre à Particules',
                updatedAt: Date.now()
            },
            {
                id: 'batterie-bt',
                category: 'batteries',
                title: 'Batteries Basse Tension',
                updatedAt: Date.now()
            },
            {
                id: 'batterie-ht',
                category: 'batteries',
                title: 'Batteries Haute Tension',
                updatedAt: Date.now()
            },
            {
                id: 'consommation',
                category: 'batteries',
                title: 'Consommation de Courant',
                updatedAt: Date.now()
            },
            {
                id: 'cables',
                category: 'cables',
                title: 'Câbles et Câblages',
                updatedAt: Date.now()
            },
            {
                id: 'cosses',
                category: 'cables',
                title: 'Cosses et Connecteurs',
                updatedAt: Date.now()
            },
            {
                id: 'feu-criminel',
                category: 'criminels',
                title: 'Feux Criminels',
                updatedAt: Date.now()
            }
        ];

        for (const fiche of defaultFiches) {
            await dbManager.saveFiche(fiche);
        }
    }

    navigateToSection(sectionId) {
        // Vérifier les permissions
        if (!authManager.canAccess(sectionId)) {
            alert('Accès non autorisé');
            return;
        }

        // Fermer le menu mobile
        document.getElementById('sideMenu').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');

        // Mettre à jour les sections actives
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        document.querySelectorAll('.menu-items a').forEach(link => {
            link.classList.remove('active');
        });

        // Activer la section demandée
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Mettre à jour le menu
            const activeLink = document.querySelector(`.menu-items a[data-section="${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }

            // Scroll en haut
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    async loadInitialData() {
        // Charger les données depuis Firestore si online
        if (navigator.onLine && authManager.currentUser) {
            try {
                const fichesSnapshot = await db.collection('fiches').get();
                fichesSnapshot.forEach(doc => {
                    dbManager.saveFiche({ id: doc.id, ...doc.data() });
                });
            } catch (error) {
                console.error('Erreur chargement données:', error);
            }
        }
    }

    // Auto-vérification
    runSelfCheck() {
        const checks = {
            firebase: typeof firebase !== 'undefined',
            auth: typeof auth !== 'undefined',
            database: dbManager.indexedDB !== null,
            navigation: document.querySelectorAll('.section').length > 0,
            storage: 'indexedDB' in window
        };

        const allPassed = Object.values(checks).every(check => check === true);
        
        if (allPassed) {
            console.log('✅ Auto-vérification réussie - Tous les systèmes sont opérationnels');
        } else {
            console.error(' Auto-vérification échouée:', checks);
        }

        return { allPassed, checks };
    }
}

// Initialiser l'application
window.app = new FireDiagApp();

// Exécuter l'auto-vérification après chargement
window.addEventListener('load', () => {
    setTimeout(() => {
        app.runSelfCheck();
    }, 2000);
});
