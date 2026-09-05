// Gestion de la base de données locale (IndexedDB) et Firestore
class DatabaseManager {
    constructor() {
        this.dbName = APP_CONFIG.OFFLINE_STORAGE;
        this.dbVersion = 1;
        this.indexedDB = null;
        this.initIndexedDB();
    }

    initIndexedDB() {
        const request = indexedDB.open(this.dbName, this.dbVersion);

        request.onerror = (event) => {
            console.error('Erreur IndexedDB:', event.target.error);
        };

        request.onsuccess = (event) => {
            this.indexedDB = event.target.result;
            console.log('IndexedDB initialisée');
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Store pour les fiches
            if (!db.objectStoreNames.contains('fiches')) {
                const ficheStore = db.createObjectStore('fiches', { keyPath: 'id' });
                ficheStore.createIndex('category', 'category', { unique: false });
                ficheStore.createIndex('updatedAt', 'updatedAt', { unique: false });
            }

            // Store pour les photos
            if (!db.objectStoreNames.contains('photos')) {
                const photoStore = db.createObjectStore('photos', { keyPath: 'id' });
                photoStore.createIndex('ficheId', 'ficheId', { unique: false });
            }

            // Store pour les tokens
            if (!db.objectStoreNames.contains('tokens')) {
                const tokenStore = db.createObjectStore('tokens', { keyPath: 'token' });
                tokenStore.createIndex('createdAt', 'createdAt', { unique: false });
            }

            // Store pour les statistiques
            if (!db.objectStoreNames.contains('stats')) {
                db.createObjectStore('stats', { keyPath: 'id' });
            }
        };
    }

    // Sauvegarder une fiche
    async saveFiche(fiche) {
        return new Promise((resolve, reject) => {
            const transaction = this.indexedDB.transaction(['fiches'], 'readwrite');
            const store = transaction.objectStore('fiches');
            const request = store.put(fiche);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Récupérer une fiche
    async getFiche(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.indexedDB.transaction(['fiches'], 'readonly');
            const store = transaction.objectStore('fiches');
            const request = store.get(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Récupérer toutes les fiches
    async getAllFiches() {
        return new Promise((resolve, reject) => {
            const transaction = this.indexedDB.transaction(['fiches'], 'readonly');
            const store = transaction.objectStore('fiches');
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Sauvegarder une photo
    async savePhoto(photo) {
        return new Promise((resolve, reject) => {
            const transaction = this.indexedDB.transaction(['photos'], 'readwrite');
            const store = transaction.objectStore('photos');
            const request = store.put(photo);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Récupérer les photos d'une fiche
    async getPhotosByFicheId(ficheId) {
        return new Promise((resolve, reject) => {
            const transaction = this.indexedDB.transaction(['photos'], 'readonly');
            const store = transaction.objectStore('photos');
            const index = store.index('ficheId');
            const request = index.getAll(ficheId);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Synchroniser avec Firestore (online)
    async syncWithFirestore() {
        if (!navigator.onLine) {
            console.log('Hors ligne - synchronisation différée');
            return;
        }

        try {
            const fiches = await this.getAllFiches();
            const batch = db.batch();

            fiches.forEach((fiche) => {
                const docRef = db.collection('fiches').doc(fiche.id);
                batch.set(docRef, fiche, { merge: true });
            });

            await batch.commit();
            console.log('Synchronisation réussie');
        } catch (error) {
            console.error('Erreur de synchronisation:', error);
        }
    }

    // Vérifier la connectivité
    checkConnectivity() {
        const statusIndicator = document.getElementById('connectionStatus');
        
        if (navigator.onLine) {
            statusIndicator.classList.remove('offline');
            statusIndicator.classList.add('online');
            this.syncWithFirestore();
        } else {
            statusIndicator.classList.remove('online');
            statusIndicator.classList.add('offline');
        }
    }

    initConnectivityListener() {
        window.addEventListener('online', () => this.checkConnectivity());
        window.addEventListener('offline', () => this.checkConnectivity());
        this.checkConnectivity();
    }
}

// Instance globale
window.dbManager = new DatabaseManager();
