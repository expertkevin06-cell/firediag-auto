// Gestion des tokens à usage unique pour les photos
class TokenManager {
    constructor() {
        this.init();
    }

    init() {
        // Écouter les uploads d'images
        document.querySelectorAll('.image-upload').forEach(input => {
            input.addEventListener('change', (e) => {
                this.handleImageUpload(e);
            });
        });

        // Génération de token (admin seulement)
        const generateBtn = document.getElementById('generateToken');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                this.generateToken();
            });
        }
    }

    async handleImageUpload(event) {
        const file = event.target.files[0];
        const field = event.target.getAttribute('data-field');

        if (!file) return;

        // Vérifier le type de fichier
        if (!file.type.startsWith('image/')) {
            alert('Veuillez sélectionner une image valide');
            return;
        }

        // Vérifier la taille (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('L\'image ne doit pas dépasser 5MB');
            return;
        }

        try {
            // Générer un token unique
            const token = await this.createToken(field);
            
            // Lire le fichier
            const imageData = await this.readFileAsDataURL(file);
            
            // Sauvegarder la photo avec le token
            const photo = {
                id: `${field}_${Date.now()}`,
                token: token,
                ficheId: field,
                data: imageData,
                filename: file.name,
                uploadedAt: new Date().toISOString(),
                used: false
            };

            await dbManager.savePhoto(photo);
            
            // Mettre à jour l'affichage
            this.displayImage(field, imageData);
            
            // Invalider le token après usage
            await this.invalidateToken(token);

            alert('Image importée avec succès !');
        } catch (error) {
            console.error('Erreur upload:', error);
            alert('Erreur lors de l\'import de l\'image');
        }
    }

    async createToken(ficheId) {
        const token = this.generateUniqueToken();
        const tokenData = {
            token: token,
            ficheId: ficheId,
            createdAt: Date.now(),
            expiresAt: Date.now() + APP_CONFIG.MAX_TOKEN_AGE,
            used: false
        };

        // Sauvegarder dans IndexedDB
        await dbManager.indexedDB.transaction(['tokens'], 'readwrite')
            .objectStore('tokens')
            .add(tokenData);

        // Sauvegarder dans Firestore si online
        if (navigator.onLine) {
            await db.collection('tokens').doc(token).set(tokenData);
        }

        return token;
    }

    generateUniqueToken() {
        return `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    async invalidateToken(token) {
        const transaction = dbManager.indexedDB.transaction(['tokens'], 'readwrite');
        const store = transaction.objectStore('tokens');
        const request = store.get(token);

        request.onsuccess = async () => {
            const tokenData = request.result;
            if (tokenData) {
                tokenData.used = true;
                await store.put(tokenData);
            }
        };

        // Firestore
        if (navigator.onLine) {
            await db.collection('tokens').doc(token).update({ used: true });
        }
    }

    async validateToken(token) {
        // Vérifier dans IndexedDB
        const transaction = dbManager.indexedDB.transaction(['tokens'], 'readonly');
        const store = transaction.objectStore('tokens');
        const request = store.get(token);

        return new Promise((resolve) => {
            request.onsuccess = () => {
                const tokenData = request.result;
                if (!tokenData) {
                    resolve({ valid: false, reason: 'Token inexistant' });
                    return;
                }

                if (tokenData.used) {
                    resolve({ valid: false, reason: 'Token déjà utilisé' });
                    return;
                }

                if (Date.now() > tokenData.expiresAt) {
                    resolve({ valid: false, reason: 'Token expiré' });
                    return;
                }

                resolve({ valid: true, ficheId: tokenData.ficheId });
            };

            request.onerror = () => {
                resolve({ valid: false, reason: 'Erreur de validation' });
            };
        });
    }

    readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    displayImage(field, imageData) {
        const imgElement = document.getElementById(`img-${field}`);
        if (imgElement) {
            imgElement.src = imageData;
            imgElement.style.display = 'block';
        }
    }

    async generateToken() {
        // Admin seulement
        if (!authManager.isAdmin()) {
            alert('Accès réservé aux administrateurs');
            return;
        }

        const token = this.generateUniqueToken();
        const tokenData = {
            token: token,
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + APP_CONFIG.MAX_TOKEN_AGE).toISOString(),
            used: false
        };

        // Afficher le token
        const tokenDisplay = document.getElementById('tokenDisplay');
        if (tokenDisplay) {
            tokenDisplay.innerHTML = `
                <strong>Token généré :</strong><br>
                <code>${token}</code><br><br>
                <strong>Valide jusqu'à :</strong> ${tokenData.expiresAt}<br>
                <em>Ce token est à usage unique</em>
            `;
        }

        // Sauvegarder
        await db.collection('tokens').doc(token).set(tokenData);
    }

    // Nettoyer les tokens expirés
    async cleanupExpiredTokens() {
        const now = Date.now();
        const transaction = dbManager.indexedDB.transaction(['tokens'], 'readwrite');
        const store = transaction.objectStore('tokens');
        const request = store.getAll();

        request.onsuccess = async () => {
            const tokens = request.result;
            for (const token of tokens) {
                if (now > token.expiresAt) {
                    await store.delete(token.token);
                }
            }
        };
    }
}

// Instance globale
window.tokenManager = new TokenManager();
