// Génération et export PDF
class PDFManager {
    constructor() {
        this.init();
    }

    init() {
        // Écouter les boutons d'export
        document.querySelectorAll('.btn-export-pdf').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const ficheId = e.target.getAttribute('data-fiche');
                this.exportFicheToPDF(ficheId);
            });
        });
    }

    async exportFicheToPDF(ficheId) {
        try {
            const { jsPDF } = window.jspdf;
            const fiche = document.getElementById(`fiche-${ficheId}`);
            
            if (!fiche) {
                throw new Error('Fiche non trouvée');
            }

            // Créer le PDF
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            // Titre
            const title = fiche.querySelector('h3').textContent;
            pdf.setFontSize(20);
            pdf.setTextColor(211, 47, 47); // Rouge primaire
            pdf.text(title, 105, 20, { align: 'center' });

            // Date
            pdf.setFontSize(10);
            pdf.setTextColor(0, 0, 0);
            const date = new Date().toLocaleDateString('fr-FR');
            pdf.text(`Généré le ${date}`, 105, 30, { align: 'center' });

            // Ligne de séparation
            pdf.setDrawColor(211, 47, 47);
            pdf.setLineWidth(0.5);
            pdf.line(20, 35, 190, 35);

            // Contenu
            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0);
            
            let yPos = 45;
            const lineHeight = 7;
            const maxWidth = 170;

            // Extraire le contenu texte
            const sections = fiche.querySelectorAll('.fiche-info h4, .fiche-info ul, .fiche-info p');
            
            sections.forEach(section => {
                // Vérifier si on doit changer de page
                if (yPos > 270) {
                    pdf.addPage();
                    yPos = 20;
                }

                if (section.tagName === 'H4') {
                    pdf.setFontSize(14);
                    pdf.setTextColor(211, 47, 47);
                    pdf.text(section.textContent, 20, yPos);
                    yPos += lineHeight + 2;
                    pdf.setFontSize(12);
                    pdf.setTextColor(0, 0, 0);
                } else if (section.tagName === 'UL') {
                    const items = section.querySelectorAll('li');
                    items.forEach(item => {
                        if (yPos > 270) {
                            pdf.addPage();
                            yPos = 20;
                        }
                        const text = `• ${item.textContent}`;
                        const lines = pdf.splitTextToSize(text, maxWidth);
                        pdf.text(lines, 25, yPos);
                        yPos += (lines.length * lineHeight) + 2;
                    });
                    yPos += 5;
                } else if (section.tagName === 'P') {
                    const lines = pdf.splitTextToSize(section.textContent, maxWidth);
                    pdf.text(lines, 20, yPos);
                    yPos += (lines.length * lineHeight) + 5;
                }
            });

            // Image si disponible
            const imgElement = fiche.querySelector('.fiche-image img');
            if (imgElement && imgElement.src && !imgElement.src.includes('placeholder')) {
                try {
                    const imgData = await this.getImageData(imgElement.src);
                    if (imgData) {
                        pdf.addPage();
                        pdf.text('Image illustrative', 105, 20, { align: 'center' });
                        pdf.addImage(imgData, 'JPEG', 20, 30, 170, 0);
                    }
                } catch (error) {
                    console.log('Image non ajoutée:', error);
                }
            }

            // Footer
            const pageCount = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                pdf.setPage(i);
                pdf.setFontSize(8);
                pdf.setTextColor(128, 128, 128);
                pdf.text(`FireDiag Auto - Page ${i} sur ${pageCount}`, 105, 290, { align: 'center' });
            }

            // Sauvegarder
            const filename = `FireDiag_${ficheId}_${Date.now()}.pdf`;
            pdf.save(filename);

            // Tracker l'export
            this.trackExport(ficheId);

        } catch (error) {
            console.error('Erreur export PDF:', error);
            alert('Erreur lors de la génération du PDF. Veuillez réessayer.');
        }
    }

    async getImageData(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/jpeg'));
            };
            img.onerror = reject;
            img.src = src;
        });
    }

    async trackExport(ficheId) {
        const exportData = {
            ficheId: ficheId,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            userId: auth.currentUser?.uid || 'anonymous'
        };

        try {
            await db.collection('exports').add(exportData);
        } catch (error) {
            console.log('Export tracké localement');
        }
    }

    // Export multiple
    async exportMultipleFiches(ficheIds) {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();

        for (let i = 0; i < ficheIds.length; i++) {
            if (i > 0) {
                pdf.addPage();
            }
            // Ajouter chaque fiche (simplifié)
            await this.exportFicheToPDF(ficheIds[i]);
        }

        pdf.save(`FireDiag_Complet_${Date.now()}.pdf`);
    }
}

// Instance globale
window.pdfManager = new PDFManager();
