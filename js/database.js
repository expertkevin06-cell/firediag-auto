// ================================================================
// BASE DE DONNÉES EXPERTS INCENDIE - DIAG INCENDIE BY KEVIN v4.0
// Références : NFPA 921, ENFSI, DGSCGC, NIST, ASTM E2929, BSPP
// ================================================================

const PHOTOS = {
    // ÉLECTRIQUE
    arc_beads: { url: "https://images.unsplash.com/photo-1581092918484-8313ea8c2c7a", caption: "Perles de fusion sphériques (arc beads) sur conducteurs cuivre - court-circuit", credit: "Forensic Lab" },
    arc_primary_secondary: { url: "https://images.unsplash.com/photo-1621905251189-08b45d6a3c8b", caption: "Perles primaires (cause) vs secondaires (conséquence) - métallographie", credit: "ASTM E2929" },
    arc_sparks: { url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261", caption: "Arc électrique : vaporisation du métal et projections", credit: "Electrical Forensics" },
    wire_fire: { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64", caption: "Conducteurs en feu : isolation carbonisée", credit: "Fire Investigation" },
    melted_plugs: { url: "https://images.unsplash.com/photo-1613214049841-028981a2eb76", caption: "Fiches et câbles fondus par surcharge prolongée", credit: "NFPA" },
    strip_fire: { url: "https://images.unsplash.com/photo-1509042246918-a47f2089e2c4", caption: "Multiprise en feu : surcharge et échauffement", credit: "Fire Service" },
    terminal_glow: { url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789", caption: "Mauvais contact : borne chauffant à incandescence", credit: "EC&M" },
    outlet_burnt: { url: "https://images.unsplash.com/photo-1555664424-778a1e5b1b48", caption: "Prise brûlée : échauffement de contact", credit: "Forensics" },
    panel_burnt: { url: "https://images.unsplash.com/photo-1565608087341-404b25492fee", caption: "Tableau électrique calciné", credit: "Electrical Expert" },
    harness_burnt: { url: "https://images.unsplash.com/photo-1599256872237-5dcc0fbe6278", caption: "Faisceau électrique véhicule brûlé - lecture des traces", credit: "Auto Forensics" },

    // MÉTAUX
    steel_samples: { url: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1", caption: "Échantillons d'acier : cassures et déformations après chauffe", credit: "Metallurgy Lab" },
    heat_colors: { url: "https://images.unsplash.com/photo-1567789884554-0b844b597180", caption: "Couleurs de chauffe permanentes sur acier (lecture température max)", credit: "Fire Investigation" },
    aluminum_melt: { url: "https://images.unsplash.com/photo-1567789884554-0b844b597180", caption: "Aluminium fondu à 660°C - signe d'un feu > 660°C", credit: "Metallurgy" },

    // BÂTIMENT
    v_pattern: { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c", caption: "V-pattern : désigne le point d'origine (flèche vers le bas = origine)", credit: "NFPA 921" },
    alligatoring: { url: "https://images.unsplash.com/photo-1567789884554-0b844b597180", caption: "Alligatoring : écailles sur bois. Grosses écailles brillantes = chauffe rapide", credit: "Fire Patterns" },
    crazed_glass: { url: "https://images.unsplash.com/photo-1573497019940-1c28c88b7f5d", caption: "Crazed glass : microfissures du verre trempé (chauffe rapide)", credit: "Glass Forensics" },
    corridor_fire: { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c", caption: "Propagation dans un local : lecture des lignes de suie", credit: "Fire Service" },
    facade_ite: { url: "https://images.unsplash.com/photo-1572883454114-1cf0031ede2a", caption: "Façade ITE en feu : propagation verticale rapide (bardage combustible)", credit: "BSPP" },
    spalling_concrete: { url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12", caption: "Spalling béton : éclatement sous l'effet de la chaleur et de la vapeur", credit: "Structural Forensics" },
    flashover: { url: "https://images.unsplash.com/photo-1586936893354-362528a6da75", caption: "Flashover : embrasement généralisé (600-800°C)", credit: "Fire Dynamics" },
    backdraft: { url: "https://images.unsplash.com/photo-1586936893354-362528a6da75", caption: "Backdraft : explosion de fumées (apport d'air brutal)", credit: "NIST" },
    rollover: { url: "https://images.unsplash.com/photo-1586936893354-362528a6da75", caption: "Rollover : langues de feu au plafond (gaz chauds)", credit: "Fire Dynamics" },

    // VÉHICULE THERMIQUE
    oil_puddle: { url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3", caption: "Écoulement d'huile moteur : carburant potentiel", credit: "Auto Forensics" },
    exhaust_hot: { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70", caption: "Échappement 400-800°C, catalyseur 500-900°C, turbo 600-1000°C", credit: "Auto Tech" },
    engine_burnt: { url: "https://images.unsplash.com/photo-1504222490345-c07557794111", caption: "Compartiment moteur détruit : aluminium fondu, acier bleui", credit: "Fire Service" },
    catalyst_glow: { url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7", caption: "Catalyseur incandescent (500-900°C) : source d'inflammation", credit: "Auto Forensics" },
    car_fire_road: { url: "https://images.unsplash.com/photo-1605515298946-d0573716f0f6", caption: "Incendie véhicule thermique en cours", credit: "Fire Service" },
    smoker_car: { url: "https://images.unsplash.com/photo-1511965938023-41c2bc08f8f9", caption: "Mégots : cause fréquente dans habitacle (vide-poche, siège)", credit: "Auto Forensics" },

    // VÉHICULE ÉLECTRIQUE
    battery_runaway: { url: "https://images.unsplash.com/photo-1620677369636-39ab1b4c53f3", caption: "Emballement thermique Li-ion : jet de feu et fumées blanches toxiques", credit: "NIST / NHTSA" },
    battery_burnt: { url: "https://images.unsplash.com/photo-1620677369636-39ab1b4c53f3", caption: "Pack batterie Li-ion après thermal runaway", credit: "EV Forensics" },
    ev_charging_fire: { url: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75", caption: "Incendie VE en charge : défaut batterie ou BMS", credit: "Fire Service" },
    ev_wrecks: { url: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75", caption: "Véhicules électriques brûlés : structure blanchie, pack consumé", credit: "EV Forensics" },
    ev_reignition: { url: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75", caption: "Ré-ignition VE : peut survenir plusieurs jours après extinction", credit: "NHTSA" },
    liion_cell: { url: "https://images.unsplash.com/photo-1620677369636-39ab1b4c53f3", caption: "Cellule Li-ion : NMC, LFP, NCA selon chimie", credit: "Battery Tech" },

    // CHIMIQUE
    chemical_sparks: { url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69", caption: "Réaction chimique exothermique", credit: "Chem Forensics" },
    chemical_flame: { url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69", caption: "Combustion chimique spontanée", credit: "Chem Lab" },
    fire_triangle: { url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69", caption: "Tétraèdre du feu : combustible + comburant + énergie + réaction en chaîne", credit: "Fire Science" },
    smoke_toxicity: { url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69", caption: "Fumées toxiques : CO, HCN, HF (Li-ion), HCl (PVC)", credit: "Fire Science" },

    // INVESTIGATION
    investigation_kit: { url: "https://images.unsplash.com/photo-1589994406227-c966806a7d9a", caption: "Kit d'investigation : caméra, ruban, échantillonnage", credit: "Fire Investigator" }
};

const FIRE_DATABASE = {

    // ============ MÉTHODOLOGIE D'INVESTIGATION (NFPA 921) ============
    methodology: {
        title: "Méthodologie scientifique NFPA 921",
        steps: [
            { n: 1, name: "Reconnaissance du site", desc: "Approche extérieure/intérieure, sécurisation, identification des risques résiduels" },
            { n: 2, name: "Reconnaissance préliminaire", desc: "Tour complet, identification de la zone d'origine (macro-lecture des patterns)" },
            { n: 3, name: "Documentation", desc: "Photos, vidéos, croquis, témoignages. Toujours avant prélèvement" },
            { n: 4, name: "Analyse des patterns", desc: "V-patterns, U-patterns, alligatoring, spalling, crazed glass, char depth" },
            { n: 5, name: "Détermination zone d'origine", desc: "Convergence des traces vers le point d'origine" },
            { n: 6, name: "Identification point d'origine", desc: "Point précis où le feu a débuté" },
            { n: 7, name: "Analyse des causes", desc: "Élimination des hypothèses, identification de la cause première" },
            { n: 8, name: "Conclusion scientifique", desc: "Rapport avec degré de certitude (certain, probable, indéterminé)" }
        ],
        patterns: [
            { name: "V-pattern", desc: "Traces en V sur mur vertical : pointe vers le bas = point d'origine. Feu à développement ascendant", photo: "v_pattern" },
            { name: "Inverted V", desc: "V inversé : feu descendant (origine au plafond, ex: plafonnier)", photo: "v_pattern" },
            { name: "U-pattern", desc: "Arrondi en U : feu plus lent ou obstruction", photo: "v_pattern" },
            { name: "Alligatoring", desc: "Écailles sur bois. Grosses écailles brillantes = chauffe rapide. Petites écailles mates = feu lent", photo: "alligatoring" },
            { name: "Calcination depth", desc: "Profondeur de carbonisation du bois (mm/min selon essence). Mesure comparative pour déterminer origine", photo: "alligatoring" },
            { name: "Crazed glass", desc: "Microfissures sur verre trempé : chauffe rapide (pas signe d'intensité, mais de vitesse)", photo: "crazed_glass" },
            { name: "Spalling béton", desc: "Éclatement du béton sous effet chaleur + vapeur. Zone la plus spallée = plus chaude", photo: "spalling_concrete" },
            { name: "Clean burn", desc: "Zone sans suie (métal propre) = température très élevée (>800°C)", photo: "v_pattern" },
            { name: "Saddle marks", desc: "Marques en selle sur poutres : feu au-dessus de la poutre", photo: "alligatoring" }
        ]
    },

    // ============ CHIMIE DU FEU ============
    fireChemistry: {
        tetrahedron: [
            { element: "Combustible", desc: "Solide, liquide ou gazeux (PCI/PCS). Pouvoir calorifique en MJ/kg" },
            { element: "Comburant", desc: "Oxygène de l'air (21%), peroxydes, comburants chimiques" },
            { element: "Énergie d'activation", desc: "Étincelle, flamme, corps chaud, réaction exothermique, frottement" },
            { element: "Réaction en chaîne", desc: "Radicaux libres H°, OH°, O° qui entretiennent la combustion" }
        ],
        phenomena: [
            { name: "Flashover", desc: "Embrasement généralisé d'un local (600-800°C). Temps : 2-10 min selon local", photo: "flashover" },
            { name: "Backdraft", desc: "Explosion de fumées accumulées (sous-ventilé) lors d'apport d'air. Signes : vitres enfumées pulsantes, fumée dense sortant par interstices", photo: "backdraft" },
            { name: "Rollover", desc: "Langues de feu au plafond (gaz imbrûlés qui s'enflamment). Précurseur du flashover", photo: "rollover" },
            { name: "Fire Gas Explosion", desc: "Explosion de gaz de pyrolyse hors de la zone de feu" },
            { name: "Pyrolyse", desc: "Décomposition thermique des matériaux SANS flamme, libère des gaz combustibles" },
            { name: "Auto-inflammation", desc: "Température à laquelle un matériau s'enflamme seul (ex: huile moteur 300-350°C, diesel 210°C, essence 280°C)" }
        ],
        toxicGases: [
            { gas: "CO (monoxyde carbone)", source: "Combustion incomplète", danger: "Mortel dès 0,1%, premier tueur en incendie" },
            { gas: "HCN (acide cyanhydrique)", source: "Laine, soie, polyuréthane, acrylique", danger: "Bloque cytochrome oxydase" },
            { gas: "HF (acide fluorhydrique)", source: "Batteries Li-ion (électrolyte LiPF6)", danger: "Corrosif, pénètre la peau, mortel" },
            { gas: "HCl (acide chlorhydrique)", source: "PVC, plastiques chlorés", danger: "Corrosif respiratoire" },
            { gas: "NOx", source: "Combustion haute température", danger: "Œdème pulmonaire" },
            { gas: "CO2", source: "Combustion complète", danger: "Asphyxiant à forte concentration" }
        ]
    },

    // ============ MÉTAUX (enrichi) ============
    metals: [
        { name: "Étain", meltingPointC: 232, meltingPointF: 450, appearance: "Fusion très précoce, blanc argenté (soudures électroniques)" },
        { name: "Plomb", meltingPointC: 327, meltingPointF: 621, appearance: "Fusion basse température, coulures gris mat (gaines anciennes)" },
        { name: "Zinc", meltingPointC: 420, meltingPointF: 787, appearance: "Fusion précoce, gris brillant (galvanisation, toitures)" },
        { name: "Magnésium", meltingPointC: 650, meltingPointF: 1202, appearance: "Combustion vive (flamme blanche aveuglante), jantes, pièces aéronautiques" },
        { name: "Aluminium", meltingPointC: 660, meltingPointF: 1220, appearance: "Fusion brillante argentée, déformation facile. Jantes, culasses, câbles, façades alucobond" },
        { name: "Laiton (Cu-Zn)", meltingPointC: 930, meltingPointF: 1706, appearance: "Fusion dorée (connecteurs, bornes, robinetterie)" },
        { name: "Argent", meltingPointC: 962, meltingPointF: 1763, appearance: "Contacts électriques haute qualité" },
        { name: "Or", meltingPointC: 1064, meltingPointF: 1947, appearance: "Contacts électroniques (non oxydable)" },
        { name: "Cuivre", meltingPointC: 1084, meltingPointF: 1983, appearance: "Perles rougeâtres à noires, vert-de-gris si oxydé. Fils, câbles, barres" },
        { name: "Acier doux", meltingPointC: 1425, meltingPointF: 2600, appearance: "Bleuissement, déformation, cassant si refroidi vite" },
        { name: "Acier inox 304", meltingPointC: 1450, meltingPointF: 2642, appearance: "Très résistant, cuisines, cheminées" },
        { name: "Nickel", meltingPointC: 1455, meltingPointF: 2651, appearance: "Très résistant, résistances chauffantes" },
        { name: "Fer", meltingPointC: 1538, meltingPointF: 2800, appearance: "Armatures, structures" },
        { name: "Titane", meltingPointC: 1668, meltingPointF: 3034, appearance: "Aéronautique, brûle dans l'azote" },
        { name: "Platine", meltingPointC: 1768, meltingPointF: 3214, appearance: "Catalyseurs véhicules" }
    ],

    // ============ ANALYSE DES FILS (ASTM E2929) ============
    wireAnalysis: {
        primaryBeads: {
            title: "Perles PRIMAIRES (cause)",
            temperature: "> 1084°C (fusion Cu)",
            characteristics: [
                "Forme parfaitement sphérique",
                "Surface lisse, brillante",
                "Cavité interne (porosité) à la métallographie",
                "Frontière nette avec le conducteur",
                "Structure dendritique à la coupe"
            ],
            identification: "Perle primaire = cause du feu. S'est formée AVANT le feu, par défaut électrique (court-circuit, arc).",
            photos: ["arc_primary_secondary", "arc_beads"]
        },
        secondaryBeads: {
            title: "Perles SECONDAIRES (conséquence)",
            temperature: "1084°C + chaleur ambiante feu",
            characteristics: [
                "Forme irrégulière, allongée",
                "Surface oxydée, mate, rugueuse",
                "Présence d'oxyde cuivreux (Cu2O)",
                "Souvent multiples sur le même conducteur",
                "Pas de cavité interne nette"
            ],
            identification: "Perle secondaire = conséquence. S'est formée PENDANT le feu. Ne pas la confondre avec la cause.",
            photos: ["arc_primary_secondary", "wire_fire"]
        },
        shortCircuit: {
            title: "Court-circuit franc",
            temperature: "> 2000°C localement",
            characteristics: ["Perles sphériques brillantes", "Projections sur plusieurs cm", "Cavités internes", "Marques d'arc nettes"],
            identification: "Court-circuit franc : contact direct phase-neutre ou phase-phase. Beads primaires sphériques.",
            photos: ["arc_beads", "arc_sparks", "wire_fire"]
        },
        seriesArc: {
            title: "Arc en série (mauvais contact)",
            temperature: "3000-5000°C à l'arc",
            characteristics: ["Arc moins énergétique", "Fil fin cassé à l'origine", "Beads plus petites", "Isolation fondue localement"],
            identification: "Arc série : rupture partielle d'un conducteur. Plus sournois car protection non déclenchée (courant normal).",
            photos: ["terminal_glow", "arc_sparks"]
        },
        thermalMelting: {
            title: "Fusion thermique",
            temperature: "Selon métal",
            characteristics: ["Fusion progressive, étirée", "Bords arrondis", "Aspect mat oxydé", "Pas de cavités internes"],
            identification: "Métal fondu par le feu ambiant, PAS par un arc. Cuivre rarement fondu thermiquement (1084°C).",
            photos: ["engine_burnt", "wire_fire"]
        },
        overload: {
            title: "Surcharge électrique",
            temperature: "200-400°C progressif",
            characteristics: ["Isolation uniformément carbonisée", "Cuivre recuit SOUPLE (plier à la main)", "Décoloration sur toute la longueur"],
            identification: "Cuivre recuit + isolation carbonisée uniforme = surcharge. Test : le conducteur plie sans casser.",
            photos: ["melted_plugs", "strip_fire"]
        },
        arcing: {
            title: "Arc électrique",
            temperature: "3000-5000°C",
            characteristics: ["Vaporisation du métal", "Cratères", "Projections importantes", "Dépôts de carbone"],
            identification: "Cratère + projections + carbone = arc. Rechercher origine : mauvais serrage, vibration, humidité.",
            photos: ["terminal_glow", "panel_burnt", "arc_sparks"]
        },
        jouleHeating: {
            title: "Échauffement Joule (R×I²)",
            temperature: "Variable (peut atteindre 800°C)",
            characteristics: ["Résistance de contact > 1Ω", "Oxydation progressive", "Départ sur 1 point précis", "Isolation fondue en cône"],
            identification: "Loi de Joule : P = R × I². Un mauvais contact de 1Ω sous 16A dissipe 256W localement.",
            photos: ["terminal_glow", "outlet_burnt"]
        }
    },

    // ============ IDENTIFICATION MÉTAUX ============
    metalIdentification: {
        heatColors: {
            title: "Couleurs de chauffe sur acier",
            temps: [
                { temp: "200°C", color: "Jaune paille", hex: "#f4e4bc", description: "Début oxydation" },
                { temp: "260°C", color: "Jaune doré", hex: "#d4a017", description: "Revenu ressorts" },
                { temp: "300°C", color: "Brun", hex: "#8b4513", description: "Oxydation modérée" },
                { temp: "350°C", color: "Pourpre", hex: "#8b008b", description: "Revenu outils" },
                { temp: "400°C", color: "Violet", hex: "#8b00ff", description: "Oxydation importante" },
                { temp: "500°C", color: "Bleu clair", hex: "#4169e1", description: "Revenu général" },
                { temp: "600°C", color: "Bleu foncé", hex: "#00008b", description: "Perte résistance début" },
                { temp: "700°C", color: "Rouge cerise sombre", hex: "#8b0000", description: "Perte 50% résistance" },
                { temp: "800°C", color: "Rouge cerise clair", hex: "#cd5c5c", description: "Déformation" },
                { temp: "900°C", color: "Orange", hex: "#ff8c00", description: "Forgeage" },
                { temp: "1000°C", color: "Jaune clair", hex: "#ffd700", description: "Forgeage" },
                { temp: "1200°C", color: "Blanc", hex: "#ffffff", description: "Soudure" }
            ],
            identification: "Ces couleurs sont permanentes après refroidissement. Permettent de lire la température maximale atteinte sur une structure acier.",
            photos: ["heat_colors", "steel_samples"]
        },
        deterioration: {
            title: "Détérioration des métaux",
            types: [
                { type: "Oxydation", appearance: "Rouille (Fe2O3), calamine (FeO), vert-de-gris (Cu2CO3(OH)2)", cause: "Air chaud + humidité", temperature: "> 200°C" },
                { type: "Fusion", appearance: "Coulures, perles, déformation", cause: "Point de fusion dépassé", temperature: "Variable" },
                { type: "Recuit", appearance: "Métal mou, ductile, très souple", cause: "Chauffe prolongée > 400°C", temperature: "400-700°C acier" },
                { type: "Trempe", appearance: "Métal cassant, cristallin", cause: "Chauffe + refroidissement rapide (eau extinction)", temperature: "> 700°C" },
                { type: "Corrosion chimique", appearance: "Dépôts colorés, piqûres", cause: "Produits chimiques, acides", temperature: "Variable" },
                { type: "Fatigue thermique", appearance: "Fissures, craquelures", cause: "Cycles chauffe/refroidissement", temperature: "Variable" }
            ],
            photos: ["steel_samples", "engine_burnt"]
        }
    },

    // ============ VÉHICULES THERMIQUES (détaillé) ============
    vehicleThermal: {
        engineCompartment: [
            {
                id: "vt_oil_exhaust",
                title: "Huile moteur sur échappement / catalyseur",
                frequency: "Cause n°1 des feux moteur",
                tempSource: "Échappement 400-800°C, catalyseur 500-900°C, turbo 600-1000°C",
                autoIgnition: "Huile moteur 300-350°C",
                causes: ["Fuite joint couvre-culasse", "Durite huile fissurée", "Reniflard qui fuit", "Joint spi vilebrequin"],
                identification: "Résidus d'huile carbonisée (vernis brun) sur échappement, point de départ sous fuite",
                photos: ["oil_puddle", "exhaust_hot", "engine_burnt"]
            },
            {
                id: "vt_catalyst",
                title: "Catalyseur / échappement + matériau combustible",
                frequency: "Fréquent (véhicule garé dans herbes)",
                tempSource: "Catalyseur 500-900°C",
                autoIgnition: "Herbe sèche 300°C, paille 250°C, carton 350°C",
                causes: ["Véhicule garé sur herbe sèche", "Fumigène dans pot", "Sous-couple mal remonté"],
                identification: "Point de départ sous le véhicule, niveau catalyseur, traces de matériau végétal carbonisé",
                photos: ["catalyst_glow", "car_fire_road"]
            },
            {
                id: "vt_electrical",
                title: "Faisceau électrique moteur",
                frequency: "Fréquent sur véhicules anciens",
                tempSource: "Court-circuit, arc",
                causes: ["Gaine craquelée", "Frottement contre carrosserie", "Rongeurs", "Réparation non conforme"],
                identification: "Perles primaires sur faisceau, gaine fondue, traces d'arc sur carrosserie",
                photos: ["harness_burnt", "arc_beads"]
            },
            {
                id: "vt_fuel",
                title: "Fuite carburant",
                frequency: "Rare mais violent",
                tempSource: "Étincelle ou surface chaude",
                autoIgnition: "Essence 280°C, diesel 210°C, éthanol 363°C",
                causes: ["Durite essence poreuse", "Injecteur qui fuit", "Pompe à essence", "Réservoir percé (choc)"],
                identification: "Flash instantané, traces d'écoulement, résidu d'hydrocarbures",
                photos: ["car_fire_road", "oil_puddle"]
            },
            {
                id: "vt_brakes",
                title: "Freins surchauffés",
                frequency: "Descente longue + freinage",
                tempSource: "Disques/plaquettes 600-900°C",
                causes: ["Descente montagne sans frein moteur", "Étrier grippé", "Frein à main serré"],
                identification: "Point de départ au niveau roue, plaquettes vitrifiées, pneu fondu côté frein",
                photos: ["car_fire_road"]
            }
        ],
        cabin: [
            {
                id: "vt_cabin_smoker",
                title: "Mégots / cigarettes",
                frequency: "Cause n°1 des feux d'habitacle",
                causes: ["Mégot dans vide-poche", "Mégot entre siège et dossier", "Cendrier renversé"],
                identification: "V-pattern partant d'un siège ou vide-poche, mégot carbonisé partiellement",
                photos: ["smoker_car"]
            },
            {
                id: "vt_cabin_charger",
                title: "Chargeur USB / allume-cigare",
                frequency: "En augmentation",
                causes: ["Chargeur bas de gamme", "Court-circuit dans la prise 12V", "Surchauffe"],
                identification: "Point de départ au niveau console, prise 12V fondue",
                photos: ["melted_plugs"]
            },
            {
                id: "vt_cabin_seat",
                title: "Siège chauffant",
                frequency: "Rare",
                causes: ["Défaut résistance chauffante", "Objet coincé sous siège", "Liquide renversé"],
                identification: "V-pattern partant du siège, résistance fondue",
                photos: ["smoker_car"]
            },
            {
                id: "vt_cabin_batterie",
                title: "Batterie 12V (coffre)",
                frequency: "Véhicules récents (batterie dans coffre)",
                causes: ["Court-circuit bornes", "Oxydation, mauvais serrage", "Dégagement H2 + étincelle"],
                identification: "Point de départ coffre, bornes fondues, traces d'électrolyte",
                photos: ["terminal_glow"]
            }
        ]
    },

    // ============ VÉHICULES ÉLECTRIQUES (expert) ============
    vehicleElectric: {
        chemistries: [
            { name: "NMC (Nickel-Manganèse-Cobalt)", desc: "Haute densité, risque thermal runaway élevé. Renault, Tesla, VW", tempRunaway: "~210°C" },
            { name: "NCA (Nickel-Cobalt-Aluminium)", desc: "Très haute densité, Tesla principalement", tempRunaway: "~165°C" },
            { name: "LFP (Lithium-Fer-Phosphate)", desc: "Plus sûre, densité moindre. Tesla Model 3, BYD", tempRunaway: "~270°C" },
            { name: "LiPo (Lithium-Polymer)", desc: "Vélos électriques, trottinettes, très sensible aux chocs", tempRunaway: "~150°C" }
        ],
        thermalRunaway: {
            title: "Thermal Runaway (emballement thermique)",
            phases: [
                { phase: "Phase 1 - Déclenchement (80-120°C)", desc: "Décomposition du SEI (Solid Electrolyte Interphase). Anode réagit avec électrolyte. Réaction exothermique commence." },
                { phase: "Phase 2 - Séparateur (130-180°C)", desc: "Fusion du séparateur PE/PP. Court-circuit interne. Emballement accéléré." },
                { phase: "Phase 3 - Cathode (180-500°C)", desc: "Décomposition de la cathode libère O2. Réaction avec électrolyte inflammable. Jet de feu." },
                { phase: "Phase 4 - Propagation cellule à cellule", desc: "Cellule voisine chauffée par conduction/rayonnement (>200°C). Effet domino." }
            ],
            indicators: [
                "Sifflement aigu (dégazage)",
                "Fumée blanche dense (électrolyte vaporisé)",
                "Odeur chimique âcre (solvants organiques)",
                "Projection de particules incandescentes",
                "Jet de feu directionnel"
            ],
            gases: ["HF (acide fluorhydrique) - TRÈS TOXIQUE", "CO", "CO2", "H2", "Hydrocarbures", "PF6 (dérivés)"],
            extinction: [
                "Volume d'eau considérable : 40 000 à 150 000 L (vs 2000 L véhicule thermique)",
                "Refroidissement prolongé (plusieurs heures)",
                "Surveillance 24-72h (ré-ignition possible)",
                "EPI complets + ARI obligatoires",
                "Immersion dans container d'eau possible"
            ],
            reignition: "Risque de ré-ignition jusqu'à 3 semaines après extinction. Cellules endommagées peuvent se réchauffer par réactions internes."
        },
        causes: [
            { id: "ve_charging", title: "Défaut de charge", desc: "Surcharge, BMS défaillant, chargeur non adapté", photo: "ev_charging_fire" },
            { id: "ve_crash", title: "Choc avec dommage du pack", desc: "Déformation cellule → court-circuit interne", photo: "ev_wrecks" },
            { id: "ve_manufacturing", title: "Défaut de fabrication", desc: "Impuretés métalliques dans cellule, micro-dendrites lithium", photo: "liion_cell" },
            { id: "ve_thermal", title: "Surchauffe environnement", desc: "Stationnement sur surface chaude, climatiseur HS", photo: "ev_charging_fire" },
            { id: "ve_propagation", title: "Propagation depuis autre source", desc: "Feu d'origine thermique qui atteint le pack", photo: "ev_wrecks" }
        ],
        identification: {
            wires: "Câbles HT orange sectionnés ou fondus (400-800V DC)",
            battery: "Pack éventré, cellules gonflées, aluminium fondu (660°C)",
            surroundings: "Odeur HF caractéristique, dépôts blancs, structure blanchie"
        }
    },

    // ============ VÉHICULES HYBRIDES ============
    vehicleHybrid: {
        title: "Véhicules hybrides (double risque)",
        risks: [
            "Risques thermiques classiques (huile, échappement, carburant)",
            "Risques électriques HT (200-400V DC)",
            "Batterie Li-ion (petite capacité 1-10 kWh)",
            "Câblage orange + câblage 12V classique"
        ],
        identification: "Identifier le type : mild-hybrid (48V, risque faible), full-hybrid (200-300V), plug-in hybrid (400V + grosse batterie).",
        safety: "Déconnecter la batterie 12V ET la batterie HT (interrupteur dédié). Attendre 10 min (condensateurs)."
    },

    // ============ BÂTIMENTS (enrichi) ============
    buildings: {
        causes: [
            {
                id: "bd_electrical",
                title: "Origine électrique",
                frequency: "30% des incendies domestiques",
                causes: ["Multiprises en cascade", "Appareils vétustes", "Fils écrasés sous tapis", "Tableau ancien (fusibles plomb)", "Connexions lâches"],
                identification: "Tableau, prise ou appareil comme point d'origine, perles primaires",
                photos: ["panel_burnt", "melted_plugs", "strip_fire"]
            },
            {
                id: "bd_cooking",
                title: "Cuisine (cause n°1)",
                frequency: "25% des incendies domestiques",
                causes: ["Huile surchauffée (auto-inflammation 350°C)", "Torchon sur plaque", "Hotte encrassée", "Appareil laissé sans surveillance"],
                identification: "Point de départ cuisinière/hotte, huile carbonisée, V-pattern mur cuisine",
                photos: ["v_pattern"]
            },
            {
                id: "bd_heating",
                title: "Chauffage",
                frequency: "15% des incendies",
                causes: ["Chauffage d'appoint contre rideau", "Conduit non ramoné (feu de cheminée)", "Radiant halogène", "Poêle à bois mal installé"],
                identification: "Source de chaleur identifiable, distance non respectée",
                photos: ["v_pattern"]
            },
            {
                id: "bd_smoker",
                title: "Fumeurs",
                frequency: "Cause n°1 des décès",
                causes: ["Cigarette au lit (somnifère, alcool)", "Mégot dans canapé", "Cendrier renversé"],
                identification: "Point de départ mobilier rembourré, mégot partiel",
                photos: ["smoker_car"]
            },
            {
                id: "bd_facade_ite",
                title: "Façades ITE / bardages",
                frequency: "Incendies à propagation rapide",
                causes: ["Isolant PSE combustible", "Bardage alucobond (PE)", "Parements bois non traités"],
                identification: "Propagation verticale très rapide (>10 m/min), façade entièrement calcinée",
                photos: ["facade_ite"]
            },
            {
                id: "bd_technical_shaft",
                title: "Gaines techniques",
                frequency: "Immeubles collectifs",
                causes: ["Câblage électrique vertical", "Colonnes sèches/humides", "Défaut traversée de paroi"],
                identification: "Propagation verticale sur plusieurs étages par gaine",
                photos: ["corridor_fire"]
            },
            {
                id: "bd_arson",
                title: "Incendie criminel",
                frequency: "15-20% des incendies",
                causes: ["Accélérants (essence, white-spirit, alcool)", "Multiples points de départ", "Matériel d'allumage (mèche, minuteur)"],
                identification: "Multiples points d'origine, traces d'accélérant (GC-MS), absence de cause accidentelle",
                photos: ["v_pattern"]
            }
        ],
        propagation: {
            conduction: "Transfert par contact direct (métal = bon conducteur). Ex: poutre acier traversant une paroi.",
            convection: "Transfert par mouvement de gaz chauds. Cause principale de propagation verticale dans un bâtiment.",
            radiation: "Transfert par rayonnement infrarouge. Provoque l'auto-inflammation de matériaux à distance.",
            projection: "Brandons, particules incandescentes projetées par le vent (feux de végétation, façades)."
        }
    },

    // ============ CHIMIQUE ============
    chemical: {
        selfIgnition: [
            { material: "Chiffons huile de lin", autoTemp: "30-60°C", mechanism: "Oxydation exothermique lente + accumulation chaleur", prevention: "Séchage à plat, poubelle métal" },
            { material: "Charbon pulvérulent", autoTemp: "80-150°C", mechanism: "Oxydation + adsorption O2", prevention: "Stockage ventilé" },
            { material: "Foin humide (>25%)", autoTemp: "50-70°C", mechanism: "Fermentation microbienne", prevention: "Séchage avant stockage" },
            { material: "Peroxides (éther)", autoTemp: "Variable", mechanism: "Décomposition exothermique", prevention: "Datation, élimination régulière" },
            { material: "Nitrates, chlorates", autoTemp: "Variable", mechanism: "Oxydant puissant", prevention: "Séparation des combustibles" }
        ],
        incompatibilities: [
            "Eau + métaux alcalins (Na, K) → H2 + flamme",
            "Acide + base forte → réaction violente",
            "Oxydant + réducteur → combustion spontanée",
            "Cyanure + acide → HCN gazeux mortel",
            "Javel + acide → Cl2 gazeux mortel"
        ]
    },

    // ============ CAUSES (regroupement pour compatibilité) ============
    fireCauses: [
        {
            id: "sc001", category: "electrical", title: "Court-circuit franc", type: "Court-circuit",
            description: "Contact direct entre conducteurs de polarités différentes créant un arc à > 2000°C. Génère des perles primaires sphériques.",
            causes: ["Isolation détériorée", "Humidité", "Rongeurs", "Vieillissement", "Mauvais branchement"],
            identification: { wires: "Perles sphériques brillantes à bords nets, cavités internes", metal: "Projections de cuivre fondu sur plusieurs cm", surroundings: "Point de départ localisé, marques d'arc" },
            temperature: "> 2000°C au point d'arc",
            photos: ["arc_beads", "arc_sparks", "wire_fire"]
        },
        {
            id: "sc002", category: "electrical", title: "Surcharge électrique", type: "Surcharge",
            description: "Échauffement progressif par courant supérieur au calibre du conducteur (loi de Joule P=RI²).",
            causes: ["Trop d'appareils", "Section inadaptée", "Protection défaillante"],
            identification: { wires: "Isolation uniformément carbonisée, cuivre recuit SOUPLE", metal: "Oxydation progressive", surroundings: "Échauffement sur toute la longueur" },
            temperature: "200-400°C progressif",
            photos: ["melted_plugs", "strip_fire"]
        },
        {
            id: "ov001", category: "electrical", title: "Surchauffe par mauvais contact", type: "Surchauffe",
            description: "Résistance de contact excessive (loi de Holm) : borne desserrée ou oxydée qui chauffe.",
            causes: ["Connexion desserrée", "Oxydation", "Vibrations"],
            identification: { wires: "Isolation fondue localement", metal: "Borne fondue, couleur de chauffe", surroundings: "Départ localisé à la connexion" },
            temperature: "300-800°C localement",
            photos: ["terminal_glow", "outlet_burnt", "panel_burnt"]
        },
        {
            id: "arc_series", category: "electrical", title: "Arc en série (fil cassé)", type: "Arc série",
            description: "Arc sur un conducteur partiellement rompu. Le courant normal ne déclenche PAS les protections.",
            causes: ["Vibrations", "Pliage répété", "Corrosion", "Rongeurs"],
            identification: { wires: "Fil fin avec petite bead, souvent dans une gaine", metal: "Traces d'arc à l'intérieur d'une gaine", surroundings: "Défaut difficile à détecter" },
            temperature: "3000-5000°C à l'arc",
            photos: ["arc_sparks", "harness_burnt"]
        },
        {
            id: "th001", category: "building", title: "Départ thermique sur corps chaud", type: "Thermique",
            description: "Inflammation par contact avec surface chaude (radiant, halogène, conduit, plaque).",
            causes: ["Ampoule proche tissu", "Conduit non isolé", "Chauffage contre mur"],
            identification: { wires: "Câblage intact", metal: "Couleur de chauffe localisée", surroundings: "V-pattern au point de contact" },
            temperature: "150-600°C selon source",
            photos: ["v_pattern", "corridor_fire"]
        },
        {
            id: "th002", category: "vehicle-thermal", title: "Huile sur organe chaud", type: "Thermique véhicule",
            description: "Écoulement d'huile ou carburant s'auto-inflammant sur échappement, turbo ou catalyseur.",
            causes: ["Fuite joint", "Durite fissurée", "Reniflard"],
            identification: { wires: "Faisceau intact côté habitacle", metal: "Échappement bleui, résidus d'huile carbonisée", surroundings: "Sous véhicule, niveau fuite" },
            temperature: "Échappement 400-800°C, huile s'enflamme à 300-350°C",
            photos: ["oil_puddle", "exhaust_hot", "engine_burnt", "catalyst_glow"]
        },
        {
            id: "ch001", category: "equipment", title: "Réaction chimique exothermique", type: "Chimique",
            description: "Emballement par réaction de produits incompatibles ou auto-combustion (chiffons huile de lin).",
            causes: ["Produits incompatibles", "Chiffons imbibés", "Stockage inadéquat"],
            identification: { wires: "Intact", metal: "Corrosion chimique, dépôts colorés", surroundings: "Résidus chimiques, odeurs caractéristiques" },
            temperature: "Variable",
            photos: ["chemical_sparks", "chemical_flame", "fire_triangle"]
        },
        {
            id: "bat001", category: "vehicle-electric", title: "Emballement thermique Li-ion", type: "Batterie",
            description: "Thermal runaway : réaction en chaîne des cellules. Jet de feu + fumées HF toxiques. Risque ré-ignition.",
            causes: ["Surcharge", "Court-circuit interne", "Choc", "Défaut fabrication", "Surchauffe"],
            identification: { wires: "Câbles HT orange fondus", metal: "Pack éventré, aluminium fondu", surroundings: "Odeur HF, dépôts blancs, fumées denses" },
            temperature: "800-1400°C",
            photos: ["battery_runaway", "battery_burnt", "ev_charging_fire", "ev_reignition"]
        },
        {
            id: "vt001", category: "vehicle-thermal", title: "Incendie moteur thermique", type: "Véhicule thermique",
            description: "Départ compartiment moteur : carburant, huile ou défaut électrique.",
            causes: ["Fuite carburant", "Huile sur échappement", "Faisceau usé", "Surchauffe"],
            identification: { wires: "Faisceau fondu avec perles si électrique", metal: "Culasse Al fondue, acier bleui", surroundings: "Point d'origine sous capot" },
            temperature: "400-900°C",
            photos: ["car_fire_road", "engine_burnt", "harness_burnt"]
        },
        {
            id: "ve001", category: "vehicle-electric", title: "Incendie véhicule électrique", type: "Véhicule électrique",
            description: "Incendie batterie HT (400-800V) ou thermique propagé au pack.",
            causes: ["Défaut batterie", "Court-circuit HT", "Charge", "Choc"],
            identification: { wires: "Câbles HT fondus", metal: "Pack ouvert, Al fondu", surroundings: "Départ sous plancher" },
            temperature: "> 800°C, ré-ignition possible 3 semaines",
            photos: ["ev_charging_fire", "ev_wrecks", "ev_reignition", "battery_runaway"]
        },
        {
            id: "vh001", category: "vehicle-electric", title: "Incendie véhicule hybride", type: "Hybride",
            description: "Double risque : thermique + électrique HT (200-400V).",
            causes: ["Défaut batterie HT", "Câblage HT", "Fuite carburant classique"],
            identification: { wires: "Câblage orange HT", metal: "Pack HT sous banquette/coffre", surroundings: "Identifier type hybride (mild, full, plug-in)" },
            temperature: "Variable",
            photos: ["ev_wrecks", "engine_burnt"]
        },
        {
            id: "bd001", category: "building", title: "Façade ITE / bardage", type: "Façade",
            description: "Propagation verticale rapide sur façade isolée par l'extérieur ou bardage combustible.",
            causes: ["Isolant PSE combustible", "Alucobond (âme PE)", "Bois non traité"],
            identification: { wires: "N/A", metal: "Alucobond fondu, structure acier déformée", surroundings: "Propagation verticale très rapide" },
            temperature: "600-1000°C",
            photos: ["facade_ite"]
        },
        {
            id: "bd002", category: "building", title: "Cuisine (huile, hotte)", type: "Cuisine",
            description: "Cause n°1 des feux domestiques. Auto-inflammation huile 350°C.",
            causes: ["Huile surchauffée", "Torchon sur plaque", "Hotte encrassée"],
            identification: { wires: "N/A", metal: "Brûleurs déformés", surroundings: "V-pattern mur cuisine, hotte calcinée" },
            temperature: "350-600°C",
            photos: ["v_pattern"]
        }
    ],

    // ============ GUIDE DIAGNOSTIC ============
    diagnosticGuide: {
        steps: [
            { step: 1, title: "Sécurisation", action: "Couper énergies, ventiler, EPI (ARI si fumées), risque structurel" },
            { step: 2, title: "Reconnaissance", action: "Tour complet extérieur/intérieur, identification zone d'origine" },
            { step: 3, title: "Documentation", action: "Photos systématiques, croquis, témoignages AVANT manipulation" },
            { step: 4, title: "Lecture patterns", action: "V-pattern, alligatoring, calcination depth, crazed glass, spalling" },
            { step: 5, title: "Point d'origine", action: "Convergence des traces, point le plus atteint" },
            { step: 6, title: "Analyse métaux", action: "Couleurs de chauffe, fusion, déformation (cf. tableau)" },
            { step: 7, title: "Analyse électrique", action: "Beads primaires/secondaires, isolation, recuit" },
            { step: 8, title: "Prélèvements", action: "Échantillons pour labo (métallographie, GC-MS accélérants)" },
            { step: 9, title: "Hypothèses", action: "Élimination des hypothèses non concordantes" },
            { step: 10, title: "Conclusion", action: "Rapport : certitude certaine, probable ou indéterminée" }
        ],
        wireChecklist: [
            "Perles de fusion présentes ?",
            "Primaires (cause) ou secondaires (conséquence) ?",
            "Forme : sphérique (arc) ou allongée (thermique) ?",
            "Surface : brillante (arc) ou mate (thermique) ?",
            "Cavités internes à la coupe ?",
            "Isolation : carbonisée uniforme (surcharge) ou localisée (arc) ?",
            "Conducteur : souple (recuit/surcharge) ou cassant ?",
            "Projections de métal ?",
            "Oxydation / vert-de-gris ?",
            "Fil cassé (arc série) ?"
        ],
        metalChecklist: [
            "Couleurs de chauffe visibles (cf. tableau) ?",
            "Déformation ? direction ?",
            "Fusion partielle/totale (quel métal, cf. point fusion) ?",
            "Oxydation / calamine / vert-de-gris ?",
            "Cassures / fragilisation ?",
            "Spalling béton ?",
            "Aluminium fondu (feu > 660°C) ?",
            "Traces d'accélérant (odeur, résidus) ?"
        ],
        vehicleChecklist: [
            "Type de véhicule (thermique/électrique/hybride) ?",
            "Compartiment moteur : échappement/catalyseur/turbo ?",
            "Fuites huile/carburant ?",
            "Faisceau électrique : perles primaires ?",
            "Habitacle : mégots, chargeurs, batterie 12V ?",
            "Coffre : batterie, éclairage, câblage hayon ?",
            "Si VE : pack HT endommagé ? Odeur HF ? Fumée blanche ?",
            "Risque ré-ignition (VE) ?"
        ]
    }
};
