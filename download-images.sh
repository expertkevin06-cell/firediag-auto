#!/bin/bash

echo "🔥 Téléchargement des photos pour FireDiag Auto..."

# Créer le dossier images s'il n'existe pas
mkdir -p images

# Télécharger les photos depuis Unsplash (libres de droits)
echo "📥 Téléchargement des images..."

curl -L "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop" -o "images/court-circuit.jpg"
echo "✅ court-circuit.jpg"

curl -L "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&auto=format&fit=crop" -o "images/surchauffe.jpg"
echo "✅ surchauffe.jpg"

curl -L "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop" -o "images/surcharge.jpg"
echo "✅ surcharge.jpg"

curl -L "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop" -o "images/echappement.jpg"
echo "✅ echappement.jpg"

curl -L "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=800&auto=format&fit=crop" -o "images/fap.jpg"
echo "✅ fap.jpg"

curl -L "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&auto=format&fit=crop" -o "images/batterie-bt.jpg"
echo "✅ batterie-bt.jpg"

curl -L "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop" -o "images/batterie-ht.jpg"
echo "✅ batterie-ht.jpg"

curl -L "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop" -o "images/consommation.jpg"
echo "✅ consommation.jpg"

curl -L "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop" -o "images/cables.jpg"
echo "✅ cables.jpg"

curl -L "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&auto=format&fit=crop" -o "images/cosses.jpg"
echo "✅ cosses.jpg"

curl -L "https://images.unsplash.com/photo-1599839619722-39751411ea63?w=800&auto=format&fit=crop" -o "images/feu-criminel.jpg"
echo "✅ feu-criminel.jpg"

echo ""
echo " Toutes les images ont été téléchargées !"
echo "📁 Elles sont dans le dossier images/"
echo ""
echo "Maintenant, committez les changements sur GitHub :"
echo "git add images/"
echo "git commit -m 'Ajout des photos des fiches techniques'"
echo "git push"
