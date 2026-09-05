// Application principale FireDiag Auto v2.0
class FireDiagApp {
    constructor() {
        this.init();
    }

    async init() {
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
        this.initGeminiKeyManager();
        this.initImageDownloader();
        console.log('FireDiag Auto v2.0 initialisé');
    }

    initNavigation() {
        document.querySelectorAll('.menu-items a[data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.getAttribute('data-section');
                this.navigateToSection(section);
            });
        });

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
        window.addEventListener('offline', () => {
            const banner = document.createElement('div');
            banner.id = 'offlineBanner';
            banner.className = 'offline-banner show';
            banner.textContent = '⚠️ Mode hors ligne - Les données seront synchronisées au retour de la connexion';
            document.body.appendChild(banner);
        });
        window.addEventListener('online', () => {
            const banner = document.getElementById('offlineBanner');
            if (banner) banner.remove();
        });
    }

    initDatabase() {
        this.initializeDefaultFiches();
    }

    async initializeDefaultFiches() {
        const defaultFiches = [
            { id: 'court-circuit', category: 'electrique', title: 'Court-Circuit Électrique', updatedAt: Date.now() },
            { id: 'surchauffe', category: 'electrique', title: 'Surchauffe Électrique', updatedAt: Date.now() },
            { id: 'surcharge', category: 'electrique', title: 'Surcharge Électrique', updatedAt: Date.now() },
            { id: 'echappement', category: 'mecanique', title: 'Fuites sur Échappement', updatedAt: Date.now() },
            { id: 'fap', category: 'mecanique', title: 'Filtre à Particules', updatedAt: Date.now() },
            { id: 'batterie-bt', category: 'batteries', title: 'Batteries Basse Tension', updatedAt: Date.now() },
            { id: 'batterie-ht', category: 'batteries', title: 'Batteries Haute Tension', updatedAt: Date.now() },
            { id: 'consommation', category: 'batteries', title: 'Consommation de Courant', updatedAt: Date.now() },
            { id: 'cables', category: 'cables', title: 'Câbles et Câblages', updatedAt: Date.now() },
            { id: 'cosses', category: 'cables', title: 'Cosses et Connecteurs', updatedAt: Date.now() },
            { id: 'feu-criminel', category: 'criminels', title: 'Feux Criminels', updatedAt: Date.now() }
        ];

        for (const fiche of defaultFiches) {
            await dbManager.saveFiche(fiche);
        }
    }

    navigateToSection(sectionId) {
        if (!authManager.canAccess(sectionId)) {
            alert('Accès non autorisé');
            return;
        }

        document.getElementById('sideMenu').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');

        document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
        document.querySelectorAll('.menu-items a').forEach(link => link.classList.remove('active'));

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            const activeLink = document.querySelector(`.menu-items a[data-section="${sectionId}"]`);
            if (activeLink) activeLink.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    async loadInitialData() {
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
        await this.loadDownloadedImages();
    }

    async loadDownloadedImages() {
        try {
            const images = await dbManager.getAllDownloadedImages();
            images.forEach(img => {
                const imgElement = document.getElementById(`img-${img.ficheId}`);
                if (imgElement && img.data) {
                    imgElement.src = img.data;
                    console.log(`✅ Image chargée pour ${img.ficheId}`);
                }
            });
        } catch (error) {
            console.error('Erreur chargement images:', error);
        }
    }

    initGeminiKeyManager() {
        const currentKeyInput = document.getElementById('currentGeminiKey');
        const newKeyInput = document.getElementById('newGeminiKey');
        const saveBtn = document.getElementById('saveGeminiKey');
        const resetBtn = document.getElementById('resetGeminiKey');
        const statusDiv = document.getElementById('geminiKeyStatus');

        if (!currentKeyInput || !saveBtn) return;

        const currentKey = localStorage.getItem('geminiApiKey') || APP_CONFIG.DEFAULT_GEMINI_KEY;
        currentKeyInput.value = currentKey;

        saveBtn.addEventListener('click', () => {
            const newKey = newKeyInput.value.trim();
            if (!newKey) {
                this.showGeminiStatus('⚠️ Veuillez entrer une clé', 'warning');
                return;
            }

            if (!newKey.startsWith('AIza')) {
                this.showGeminiStatus('❌ Clé invalide (doit commencer par AIza)', 'error');
                return;
            }

            window.updateGeminiKey(newKey);
            currentKeyInput.value = newKey;
            newKeyInput.value = '';
            this.showGeminiStatus('✅ Clé Gemini mise à jour avec succès !', 'success');
            
            setTimeout(() => {
                if (confirm('La clé a été sauvegardée. Recharger la page ?')) {
                    window.location.reload();
                }
            }, 1000);
        });

        resetBtn.addEventListener('click', () => {
            if (confirm('Réinitialiser la clé Gemini par défaut ?')) {
                window.resetGeminiKey();
                currentKeyInput.value = APP_CONFIG.DEFAULT_GEMINI_KEY;
                this.showGeminiStatus('✅ Clé réinitialisée', 'success');
                setTimeout(() => window.location.reload(), 1000);
            }
        });
    }

    showGeminiStatus(message, type) {
        const statusDiv = document.getElementById('geminiKeyStatus');
        statusDiv.textContent = message;
        statusDiv.style.display = 'block';
        statusDiv.style.background = type === 'success' ? '#c8e6c9' : 
                                     type === 'error' ? '#ffcdd2' : '#fff9c4';
        statusDiv.style.color = type === 'success' ? '#2e7d32' : 
                               type === 'error' ? '#c62828' : '#f57f17';
    }

    initImageDownloader() {
        const downloadBtn = document.getElementById('downloadImagesBtn');
        const progressDiv = document.getElementById('downloadProgress');
        const progressBar = document.getElementById('downloadProgressBar');
        const statusText = document.getElementById('downloadStatus');
        const resultDiv = document.getElementById('downloadResult');

        if (!downloadBtn) return;

        downloadBtn.addEventListener('click', async () => {
            progressDiv.style.display = 'block';
            resultDiv.innerHTML = '';
            downloadBtn.disabled = true;

            try {
                const results = await dbManager.downloadAllImages();
                
                for (let i = 0; i <= results.total; i++) {
                    setTimeout(() => {
                        const percent = (i / results.total) * 100;
                        progressBar.style.width = percent + '%';
                        statusText.textContent = `Téléchargement... ${i}/${results.total}`;
                    }, i * 200);
                }

                setTimeout(() => {
                    let html = '<div style="margin-top:15px; padding:12px; background:#e3f2fd; border-radius:8px;">';
                    html += `<strong>✅ Téléchargement terminé !</strong><br>`;
                    html += `Succès : ${results.success.length}/${results.total}<br>`;
                    if (results.errors.length > 0) {
                        html += `<span style="color:#d32f2f;">Erreurs : ${results.errors.length}</span>`;
                    }
                    html += '</div>';
                    resultDiv.innerHTML = html;
                    downloadBtn.disabled = false;
                }, results.total * 200 + 500);

            } catch (error) {
                resultDiv.innerHTML = `<div style="margin-top:10px; padding:10px; background:#ffcdd2; border-radius:6px; color:#c62828;">
                    ❌ Erreur : ${error.message}
                </div>`;
                downloadBtn.disabled = false;
            }
        });
    }

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
            console.error('⚠️ Auto-vérification échouée:', checks);
        }
        return { allPassed, checks };
    }
}

window.app = new FireDiagApp();

window.addEventListener('load', () => {
    setTimeout(() => {
        app.runSelfCheck();
    }, 2000);
});
