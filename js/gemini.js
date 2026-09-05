// Intégration Gemini AI
class GeminiAI {
    constructor() {
        this.apiUrl = GEMINI_API_URL;
        this.init();
    }

    init() {
        document.getElementById('searchGemini').addEventListener('click', () => {
            this.search();
        });

        // Recherche avec Enter (Ctrl+Enter)
        document.getElementById('geminiQuery').addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.search();
            }
        });
    }

    async search() {
        const query = document.getElementById('geminiQuery').value.trim();
        const loadingDiv = document.getElementById('geminiLoading');
        const resultsDiv = document.getElementById('geminiResults');

        if (!query) {
            alert('Veuillez entrer une question');
            return;
        }

        // Afficher le loading
        loadingDiv.style.display = 'block';
        resultsDiv.innerHTML = '';

        try {
            const context = `Tu es un expert en diagnostic de départs d'incendie sur véhicules automobiles (thermiques et électriques), scooters et vélos électriques.
            Ta spécialité est l'analyse des causes d'incendie : électriques (court-circuit, surchauffe, surcharge), mécaniques (fuites sur échappement, FAP), batteries haute tension, 
            câblages, et identification des feux criminels.
            
            Réponds de manière technique, précise et structurée. Donne des conseils pratiques de diagnostic et de prévention.
            
            Question de l'utilisateur : ${query}`;

            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: context
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 2048
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`Erreur API: ${response.status}`);
            }

            const data = await response.json();
            const resultText = data.candidates[0].content.parts[0].text;

            // Formater le résultat
            resultsDiv.innerHTML = this.formatResult(resultText);
            
            // Sauvegarder dans l'historique
            this.saveToHistory(query, resultText);

        } catch (error) {
            console.error('Erreur Gemini:', error);
            resultsDiv.innerHTML = `
                <div class="error-message show">
                    <strong>Erreur lors de la recherche :</strong><br>
                    ${error.message}<br><br>
                    Vérifiez votre connexion internet et votre clé API Gemini.
                </div>
            `;
        } finally {
            loadingDiv.style.display = 'none';
        }
    }

    formatResult(text) {
        // Convertir le Markdown en HTML basique
        let html = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>')
            .replace(/^- /gm, '<li>')
            .replace(/<\/li>/gm, '</li>');

        // Envelopper dans des balises appropriées
        html = `<div class="ai-response"><p>${html}</p></div>`;
        
        return html;
    }

    async saveToHistory(query, response) {
        const historyItem = {
            id: Date.now().toString(),
            query: query,
            response: response,
            timestamp: new Date().toISOString()
        };

        try {
            await db.collection('aiHistory').add(historyItem);
        } catch (error) {
            // Sauvegarde locale si offline
            console.log('Sauvegarde locale de l\'historique');
        }
    }

    // Recherche contextuelle basée sur la section actuelle
    async contextualSearch(section) {
        const contexts = {
            'incendie-electrique': 'Quelles sont les méthodes de diagnostic pour identifier un court-circuit électrique sur un véhicule ?',
            'incendie-mecanique': 'Comment prévenir les départs d\'incendie liés aux fuites de fluides sur échappement ?',
            'batteries': 'Quels sont les risques d\'incendie spécifiques aux batteries lithium-ion haute tension ?',
            'cables-cosses': 'Comment vérifier l\'état des câblages et prévenir les échauffements ?',
            'feux-criminels': 'Quels sont les indices permettant d\'identifier un feu criminel sur véhicule ?'
        };

        const query = contexts[section];
        if (query) {
            document.getElementById('geminiQuery').value = query;
            document.getElementById('recherche-ia').click();
        }
    }
}

// Instance globale
window.geminiAI = new GeminiAI();
