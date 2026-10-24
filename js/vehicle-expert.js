// ================================================================
// MODULE INGÉNIEUR EXPERT VÉHICULES - DIAG INCENDIE BY KEVIN v5.0
// Chargé APRÈS database.js, AVANT app.js
// ================================================================

// --- Photos expert supplémentaires ---
Object.assign(PHOTOS, {
    harness_chafe: { url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3", caption: "Faisceau 12V : gaine percée par frottement contre tôle → court-circuit à la masse", credit: "Auto Forensics" },
    alternator_burnt: { url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3", caption: "Alternateur : borne B+ (100-250A) fondue = échauffement de contact majeur", credit: "Electrical Expert" },
    fuse_box: { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64", caption: "Boîte à fusibles : cartographie des fusibles grillés = circuits énergisés pendant le feu", credit: "Fire Investigation" },
    dpf_regen: { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70", caption: "DPF/FAP en régénération : 600-1200°C à l'échappement, risque herbes sèches", credit: "Diesel Tech" },
    gdi_pump: { url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3", caption: "Pompe HP injection directe essence 150-350 bar : fuite = brouillard inflammable", credit: "Fuel Systems" },
    coolant_leak: { url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3", caption: "Fuite glycol sur échappement : vapeur blanche + auto-inflammation ~400°C", credit: "Auto Forensics" },
    seat_foam: { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70", caption: "Mousse PU de siège : combustible majeur, croissance rapide, CO + HCN", credit: "Fire Dynamics" },
    garage_fire: { url: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1", caption: "Parking confiné : nappe de fumée 600°C, propagation véhicule adjacent <1 m", credit: "BSPP" },
    pack_teardown: { url: "https://images.unsplash.com/photo-1620677369636-39ab1b4c53f3", caption: "Pack HT ouvert : évents de cellules, busbars fondus, suie INTERNE = origine interne", credit: "EV Forensics" },
    ccs_connector: { url: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75", caption: "Connecteur CCS : broches fondues/arc = défaut de charge (contact, humidité, serrage)", credit: "Charging Expert" },
    rodent_damage: { url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3", caption: "Section de faisceau par rongeurs (fouines) : cause fréquente en Europe", credit: "Auto Forensics" },
    tire_burn: { url: "https://images.unsplash.com/photo-1504222490345-c07557794111", caption: "Pneus : combustion tardive et prolongée (caoutchouc + armature), sustain du feu", credit: "Fire Service" }
});

// ================================================================
// DONNÉES INGÉNIEUR
// ================================================================
const VEHICLE_EXPERT = {

    zones: [
        { zone: "Compartiment moteur", components: "Moteur, turbo, collecteur, catalyseur, FAP, faisceau, alternateur, démarreur, durites, réservoir LDR, clim", risks: "Huile/carburant sur point chaud, faisceau frotté, alternateur B+, régénération FAP" },
        { zone: "Habitacle", components: "Mousses PU sièges, tableau ABS/PC, faisceaux, 12V accessoires, allume-cigare, USB, sièges chauffants, airbags (pyrotechnie)", risks: "Mégots, chargeurs, défaut résistance chauffante, épingle/pyrolyse mousse" },
        { zone: "Coffre / arrière", components: "Batterie 12V (véhicules récents), réservoir carburant, pack HT (VE), faisceau hayon, éclairage", risks: "Bornes 12V, court-circuit hayon (flexion), pack HT" },
        { zone: "Soubassement", components: "Ligne échappement, catalyseur, FAP, réservoir, pack HT (VE), freins, câbles", risks: "Catalyseur sur herbes sèches, fuite réservoir, impact pack HT" },
        { zone: "Roues / freins", components: "Disques, plaquettes, étriers, pneus", risks: "Freins 600-900°C après descente, étrier grippé, pneu surchauffe" },
        { zone: "Toit / extérieur", components: "Peinture, joints, plastiques extérieurs PP", risks: "Propagation depuis extérieur, acte volontaire, brandons" }
    ],

    origins: {
        electrical12: {
            title: "⚡ Électrique 12V (classique)",
            voltage: "12-14,4 V DC — courants : démarreur 200-600 A, alternateur 90-250 A, méga-fusible 300-500 A",
            modes: [
                "Frottement gaine contre tôle → isolation usée → court-circuit franc à la masse (B+ toujours énergisé !)",
                "Cosse batterie oxydée/desserrée → résistance de contact → chauffe Joule P=R×I²",
                "Boîte à fusibles : infiltration eau → corrosion → arc",
                "Accessoires aftermarket (alarme, traceur, audio, LED, Webasto) : épissures non OEM = cause n°1 électrique",
                "Rongeurs (fouines) : section de gaine + nid = inflammable",
                "Fatigue vibratoire → conducteur partiellement rompu → arc série (protections NON déclenchées)",
                "Alternateur : borne B+ mal serrée → fusion locale 100-250 A"
            ],
            evidence: [
                "Cartographie d'arc (arc mapping) : remonter vers la source énergie",
                "Perles primaires sphériques brillantes avec cavité interne (ASTM E2929)",
                "Fusibles grillés = circuit était énergisé PENDANT le feu (info chronologique)",
                "Œillet de passage de cloison fondu = point de franchissement",
                "Épissures/soudures/scotch non OEM = présomption aftermarket"
            ]
        },
        electrical48: {
            title: "⚡ Électrique 48V (micro-hybride MHEV)",
            voltage: "48 V DC — batterie Li-ion 0,5-1,5 kWh — alterno-démarreur courroie 10-15 kW — DC/DC 48→12",
            modes: [
                "Connecteurs 48V (200-300 A) : échauffement de contact",
                "Fuite LDR dans batterie 48V refroidie par eau → court-circuit",
                "Choc / écrasement du petit pack Li-ion",
                "Câblage 48V (gaine souvent bleue) frotté"
            ],
            evidence: [
                "Tension <60 V DC = pas de risque électrocution mais risque feu réel",
                "Traces d'arc sur busbars 48V, boîtier DC/DC fondu",
                "Résidus glycol dans pack 48V = fuite refroidissement"
            ]
        },
        electricalHV: {
            title: "⚡ Haute tension 400-800 V (VE / hybride)",
            voltage: "350-450 V (plateformes 400V) ou 700-925 V (800V : Ioniq/EV6, Taycan, Lucid) — câblage ORANGE + interlock HVIL",
            components: "Pack (cellules/modules/busbars Al-Cu), BMS, contacteurs, pyrofuse/pyroswitch, MSD, évents, plaque refroidissement ; onduleur, chargeur embarqué OBC, DC/DC HV→12V, PTC, compresseur e-clim, prise CCS/Type2",
            modes: [
                "Défaut d'isolement → courant de fuite → chauffe locale progressive",
                "Court-circuit externe pack (choc, perçage, corrosion)",
                "Surcharge / défaut BMS en charge",
                "Court-circuit INTERNE : particule métallique manufacturière, dendrite lithium (charge rapide à froid), dommage séparateur",
                "Connecteur de charge : broches contaminées/humides/mal serrées → arc",
                "Relais de charge soudés (OBC ou borne) → surcharge"
            ],
            evidence: [
                "AVANT manipulation : mesure d'isolement + tension résiduelle (énergie piégée !)",
                "Suie INTERNE au pack + évents orientés + busbars fondus dedans = origine INTERNE",
                "Pack brûlé de l'extérieur vers l'intérieur, cellules opposées intactes = origine EXTERNE",
                "Logs BMS : chute tension cellule / montée T° AVANT feu = cause interne",
                "Pyrofuse déclenché = choc détecté (corrélé airbags/EDR)",
                "CT-scan / X-ray du pack AVANT ouverture (non destructif)"
            ]
        },
        fuel: {
            title: "⛽ Carburant",
            pressures: "Injection indirecte 3-4 bar • Essence directe GDI 150-350 bar • Diesel common rail 1600-2500 bar → fuite HP = BROUILLARD inflammable instantané",
            data: [
                { fluid: "Essence SP95/E10", flash: "-43°C", auto: "~280°C", lel: "1,4 % vol", note: "Vapeurs 3× plus lourdes que l'air, s'accumulent au sol" },
                { fluid: "Diesel B7", flash: "≥ 55°C", auto: "~210°C", lel: "0,6 % vol", note: "S'enflamme facilement sur point chaud" },
                { fluid: "Éthanol E85", flash: "~13°C", auto: "~363°C", lel: "3,3 % vol", note: "Corrosif pour durites anciennes, flamme peu visible" },
                { fluid: "GPL", flash: "-104°C", auto: "~470°C", lel: "1,8 % vol", note: "Plus lourd que l'air, soupape de sûreté" },
                { fluid: "H2 (FCEV)", flash: "Gaz", auto: "~560°C", lel: "4 % vol", note: "Flamme invisible, détection difficile" }
            ],
            modes: [
                "Durite poreuse/fissurée, collier desserré, connecteur rapide fissuré",
                "Joint torique injecteur / rampe HP",
                "Réservoir percé (choc, corrosion), pompe immergée",
                "Fuite HP GDI/CR = aérosol → inflammation quasi immédiate sur point chaud"
            ],
            evidence: [
                "Trace d'écoulement au sol AVANT combustion (flaque brûlée en son centre)",
                "Résidus hydrocarbures GC-MS ≠ accélérant",
                "Point de départ = intersection fuite × point chaud"
            ]
        },
        lines: {
            title: "️ Canalisations & fluides (auto-inflammation)",
            fluids: [
                { fluid: "Huile moteur", auto: "300-350°C", leak: "Joint cache-culbuteurs, turbo, filtre, bouchon vidange", trace: "Vernis brun carbonisé sur échappement" },
                { fluid: "Boîte auto ATF", auto: "300-400°C", leak: "Durite refroidisseur, joint carter", trace: "Résidu rouge-brun" },
                { fluid: "Direction assistée (minéral)", auto: "250-300°C", leak: "Durite HP pompe", trace: "Noir brillant sur crémaillère/échappement" },
                { fluid: "Frein DOT4 (glycol)", auto: "380-400°C", leak: "Durite souple vieillie", trace: "Résidu hygroscopique, peinture décapée" },
                { fluid: "LDR glycol 50%", auto: "398-410°C", leak: "Radiateur, pompe, durite", trace: "Vapeur BLANCHE sucrée sur échappement puis flamme" },
                { fluid: "Huile PAG/POE clim", auto: "350-400°C", leak: "Condenseur, raccord", trace: "Avec R1234yf : flamme + HF" },
                { fluid: "R1234yf (clim)", auto: "~405°C (A2L légèrement inflammable)", leak: "Condenseur percé", trace: "Combustion → HF toxique" },
                { fluid: "AdBlue/DEF", auto: "NON inflammable", leak: "Injecteur/chauffage DEF", trace: "Décomposition >180°C → ammoniac, cristaux blancs" }
            ]
        },
        battery12: {
            title: "🔋 Batterie 12V plomb",
            modes: [
                "Cosse + / − oxydée ou desserrée → chauffe Joule",
                "Court-circuit cosse contre masse (outil, tresse)",
                "Dégagement H2 en charge + étincelle → EXPLOSION du boîtier",
                "Batterie sous coffre/habitacle : fuite acide sur tapis"
            ],
            evidence: "Boîtier éclaté/fondu, bornes projetées, traces acide (sulfate blanc), câbles B+ sectionnés avec perles"
        },
        battery48: {
            title: "🔋 Batterie 48V Li-ion (MHEV)",
            modes: "Voir electrical48 : choc, fuite LDR, surcharge DC/DC, court-circuit busbars",
            evidence: "Boîtier Li-ion éventré, cellules gonflées, odeur électrolyte, dépôt blanc LiPF6"
        },
        hotSurfaces: {
            title: "🌡️ Points chauds (températures réelles)",
            surfaces: [
                { part: "Collecteur échappement", normal: "400-600°C", charge: "800-1000°C" },
                { part: "Turbocompresseur", normal: "600-800°C", charge: "900-1000°C" },
                { part: "Catalyseur", normal: "400-700°C", charge: "900-1200°C (ratés d'allumage)" },
                { part: "FAP en régénération", normal: "600-650°C", charge: "jusqu'à 1200°C" },
                { part: "Ligne échappement aval", normal: "300-500°C", charge: "600°C" },
                { part: "Disques de frein", normal: "150-300°C", charge: "600-900°C (descente)" },
                { part: "Bloc moteur / culasse", normal: "90-120°C", charge: "140°C — NON inflammant pour huiles" },
                { part: "Sonde lambda (chauffage)", normal: "600-800°C local", charge: "-" }
            ],
            rule: "Règle ingénieur : un fluide ne s'enflamme que si T° surface > T° auto-inflammation DU FILM liquide (le film isolant réduit le transfert : délai de quelques secondes à minutes)."
        }
    },

    plastics: [
        { p: "PP polypropylène", use: "Pare-chocs, garnitures, batterie", fire: "Fond 160-170°C, brûle en gouttant, flamme bleue/jaune, odeur paraffine", role: "Propagateur par gouttes enflammées" },
        { p: "PE (HDPE/LDPE)", use: "Réservoirs, durites, gaines", fire: "Fond 110-130°C, goutte, odeur bougie", role: "Réservoir = combustible majeur tardif" },
        { p: "PU mousse polyuréthane", use: "Sièges, appuie-tête, isolation", fire: "Croissance RAPIDE, CO + HCN, char", role: "Combustible n°1 habitacle, flashover local" },
        { p: "PVC", use: "Isolation câbles, durites", fire: "Ramollit 80°C, auto-extinguible, HCl + fumées denses", role: "Toxique, freine mais fumées opaques" },
        { p: "ABS", use: "Planche de bord, grilles", fire: "Fond ~105°C, suie, odeur styrène", role: "Combustible habitacle" },
        { p: "PA6/PA66 nylon", use: "Connecteurs, durites, admission", fire: "Fond 220-260°C, flamme bleue, odeur corne", role: "Résiste, fond tardivement" },
        { p: "POM", use: "Engrenages, clips", fire: "Fond 165-175°C, formaldéhyde", role: "Mineur" },
        { p: "PC polycarbonate", use: "Optiques, vitrages feux", fire: "Tg 150°C, suie", role: "Fond, propage peu" },
        { p: "EPDM caoutchouc", use: "Joints, durites", fire: "Charbonise, lent", role: "Faible" },
        { p: "PET", use: "Textiles, moquettes", fire: "Fond 250°C, goutte", role: "Moyen" }
    ],
    fireLoad: {
        mass: "100-150 kg de polymères par véhicule moderne (~15-20 % de la masse)",
        energy: "Charge calorifique totale 2-4 GJ (équivalent petit local)",
        hrr: "Puissance pic 3-8 MW (essais), jusqu'à 10 MW véhicules récents ; VE : pic similaire + phase jet-fire localisée",
        tires: "Pneus : combustion tardive et longue (caoutchouc + armature), soutient le feu en phase décroissante"
    },

    development: {
        stages: [
            { s: "1. Initiation", d: "Inflammation locale (arc, fuite, mégot). Fumée blanche/grise = pyrolyse sans flamme" },
            { s: "2. Croissance", d: "Combustibles proches : gaines, durites, mousses. 2-6 min pour percer capot/hayon" },
            { s: "3. Embrasement du volume", d: "Habitacle : 8-15 min ; flashover local si ouvrants fermés puis ouverture" },
            { s: "4. Plein développement", d: "Carrosserie complète, 700-1000°C gaz ; aluminium fondu (660°C), vitres éclatées" },
            { s: "5. Décroissance", d: "Pneus + polymères résiduels ; longue durée, reignition possible (VE)" }
        ],
        ventilation: [
            "Véhicule FERMÉ : combustion limitée en O2 → fumée dense, suie interne, pyrolyse ; ouverture soudaine = reprise violente (effet backdraft local)",
            "Fenêtre/porte OUVERTE au-dessus du foyer : effet cheminée → croissance ×2-3, propagation verticale accélérée",
            "Vent latéral : pousse le foyer vers l'ouvrant sous le vent → lecture directionnelle des traces",
            "Garage confiné : nappe fumée 500-700°C au plafond, jet de paroi, propagation véhicule adjacent si espacement <1 m (parkings modernes)",
            "Extérieur ventilé : combustion complète, traces moins enfumées, cartographie de fusion plus lisible"
        ],
        spreadPaths: [
            "Moteur → habitacle : œillets de cloison fondus, prise d'air HVAC, passage pédales",
            "Passage de roue → habitacle : garniture d'aile PP fondue, moquette",
            "Soubassement → plancher : chaleur conduite + moquette/pyrolyse",
            "Coffre → habitacle : dossier banquette, passe-câbles hayon",
            "VE : pack → habitacle par évents orientés vers le sol/plancher (jet-fire sous caisse)"
        ],
        direction: [
            "Gradient de profondeur de brûlure (peinture, plastiques)",
            "Direction des coulures de polymères fondus",
            "V-patterns sur panneaux de carrosserie",
            "Quel vitrage a éclaté en premier (choc thermique : trempé latéral avant feu, feuilleté pare-brise fond en périphérie)",
            "Cartographie de fusion : Zn 420°C → Al 660°C → Cu 1084°C = bornes de T° max par zone",
            "Densité de suie décroissante en s'éloignant de l'origine"
        ]
    },

    evExpert: {
        sequence: [
            { t: "90-120°C", e: "Décomposition SEI (anode) → exothermique lente, dégazage début" },
            { t: "120-180°C", e: "Réaction anode-graphite ↔ électrolyte ; montée en pression interne" },
            { t: "130-170°C", e: "Fusion/retrait séparateur PE (130-160) / PP (160-170) → court-circuit interne massif" },
            { t: "180-250°C", e: "Décomposition cathode NMC/NCA → libération O2 (auto-comburant !)" },
            { t: "270-310°C", e: "LFP : décomposition tardive, SANS O2 = chimie plus sûre" },
            { t: ">200°C", e: "Ébullition/combustion électrolyte (carbonates) + jet-fire 800-1400°C" }
        ],
        gases: "H2 20-40 % • CO 10-30 % • CO2 • CH4, C2H4 • vapeurs carbonates (EC/DMC/EMC) • HF (LiPF6) • POF3 → mélange INFLAMMABLE + TOXIQUE dans le pack → déflagration par évents",
        triggers: [
            "Mécanique : écrasement, perforation, flexion pack (choc, dos d'âne, incendie externe)",
            "Électrique externe : court-circuit bornes, surcharge, défaut isolement",
            "Électrique interne : particule métallique, dendrite Li (charge rapide <0°C), défaut séparateur",
            "Thermique externe : feu voisin, point chaud, climat extrême + refroidissement HS"
        ],
        causeVsConsequence: [
            "ORIGINE INTERNE : évents ouverts de l'intérieur, suie DANS le pack, busbars/perles internes, modules éclatés vers l'extérieur, logs BMS anormaux AVANT feu, pyrofuse non lié à un choc",
            "ORIGINE EXTERNE : calcination extérieure→intérieure, cellules côté opposé intactes, aucun log anormal pré-feu, traces d'arc EXTERNES au pack, point de départ hors pack (habitacle/moteur/roue)",
            "Données à saisir : logs BMS (V/T min-max, isolement, contacteurs), EDR, télématique cloud, session de borne de charge (I, T°, motif d'arrêt), historique recharge"
        ],
        charging: [
            "AC Type2 7-22 kW : broches contaminées/humides → arc local 1000°C+ dans connecteur",
            "DC CCS 50-350 kW : relais/contacteurs soudés, câble sectionné, refroidissement connecteur HS",
            "Preuves : broches fondues directionnelles, perles dans connecteur, soudure relais OBC/borne, logs session"
        ],
        reignition: "Énergie piégée dans modules isolés : surveillance thermique 24-72 h minimum, cas documentés jusqu'à 3 semaines ; stockage extérieur, écart 5 m, bac de rétention",
        extinction: [
            "Objectif = REFROIDIR le pack (eau en grand volume 30 000-100 000 L), pas éteindre la chimie",
            "Ne JAMAIS percer/ouvrir le pack sur site",
            "ARI obligatoire (HF), périmètre, jets diffusés sur pack",
            "Immersion container/benne inondée si disponible",
            "Caméra thermique continue jusqu'à T° stable <60°C"
        ]
    },

    thermalExpert: {
        dpf: "Régénération FAP : post-injection → 600-1200°C à l'échappement. Stationnement sur herbes/paille juste après = ignition. Preuve : log ECU (regen en cours), suie/ash FAP, point de départ sous caisse arrière.",
        rodent: "Fouines/martres : section de gaines + nid inflammable dans compartiment. Preuve : marques de dents 2 arcs, matériaux de nid, parcours câbles sectionnés.",
        recalls: "Vérifier rappels constructeur feu (pompe carburant, chauffage, faisceau, batterie) + historique entretien + sinistres antérieurs + modifications assurance.",
        aftermarket: "Épissures non OEM = première cause électrique : traceurs GPS, alarmes, audio, LED, sièges chauffants, préchauffage. Preuve : soudure/scotch/connecteur rapide ajouté, fusible volant."
    },

    meltMap: [
        { m: "Zinc (galvanisation)", t: "420°C", meaning: "Feu modéré local" },
        { m: "Aluminium (capot, roues, boucliers, pack)", t: "660°C", meaning: "Feu sévère, gaz >700°C" },
        { m: "Cuivre (faisceau, radiateur)", t: "1084°C", meaning: "Feu majeur OU arc électrique local" },
        { m: "Acier déformation", t: "700-900°C", meaning: "Perte résistance, structure affaissée" },
        { m: "Verre trempé latéral", t: "éclate ~250-300°C (gradient)", meaning: "Chronologie : quel ouvrant en premier" },
        { m: "Chrome/décor", t: "décoloration 400-600°C", meaning: "Lecture fine des gradients" }
    ],

    protocol: [
        "1. Scène : position, espacement, traces au sol (flaque brûlée au centre = fuite ; contour irrégulier versé = accélérant), séquence pneus",
        "2. Identification : VIN, km, clé/contact, levier, câble de charge branché ?",
        "3. Historique : entretien, rappels, modifications, sinistres, télématique (consentement)",
        "4. Données : EDR, logs BMS, trames OBD gelées, session borne de charge, cloud constructeur",
        "5. Externe : cartographie suie/fusion/vitrages, ouvrants, capot (béquille fondue ?)",
        "6. Compartiments : gradient de brûlure par zone, zone d'origine convergente",
        "7. Électrique : arc mapping, remontée B+, cartographie fusibles, épissures aftermarket",
        "8. Fluides : traçage fuite (UV), prélèvements GC-MS (fluide véhicule vs accélérant)",
        "9. VE : isolement + tension résiduelle AVANT contact, CT/X-ray pack, évents, suie interne",
        "10. Labo : métallographie perles (primaire/secondaire ASTM E2929), FTIR polymères, GC-MS",
        "11. Hypothèses : élimination systématique, puis conclusion avec niveau de certitude (certain / probable / indéterminé)"
    ]
};

// ================================================================
// Injection des cas experts dans la recherche/filtres existants
// ================================================================
(function injectExpertCases() {
    const cases = [
        { id: "vx_bplus", category: "electrical", title: "Court-circuit câble B+ batterie/alternateur", type: "Électrique 12V", description: "Câble toujours énergisé, 100-250 A : fusion massive et projection.", causes: ["Cosse desserrée", "Gaine frottée", "Oxydation"], identification: { wires: "Perles primaires grosses, borne B+ fondue", metal: "Projection cuivre, alternateur marqué", surroundings: "Origine batterie/alternateur" }, temperature: ">1084°C local", photos: ["alternator_burnt", "arc_beads"] },
        { id: "vx_aftermarket", category: "electrical", title: "Épissure accessoire aftermarket", type: "Électrique 12V", description: "Alarme, traceur, audio, LED : raccord non OEM = cause n°1.", causes: ["Épissure mal sertie", "Fusible volant absent", "Passage de câble frotté"], identification: { wires: "Arc à l'épissure, gaine fondue locale", metal: "Connecteur rapide fondu", surroundings: "Départ au point d'installation" }, temperature: "300-800°C", photos: ["harness_chafe", "fuse_box"] },
        { id: "vx_rodent", category: "electrical", title: "Section de faisceau par rongeurs", type: "Électrique 12V", description: "Fouines : gaine sectionnée + nid inflammable.", causes: ["Nid dans compartiment", "Câbles sectionnés"], identification: { wires: "Marques de dents, conducteurs nus", metal: "Arc sur tôle", surroundings: "Matériau de nid carbonisé" }, temperature: "Arc >2000°C", photos: ["rodent_damage", "arc_sparks"] },
        { id: "vx_dpf", category: "vehicle-thermal", title: "Régénération FAP sur végétation sèche", type: "Point chaud", description: "600-1200°C à l'échappement pendant/après régénération.", causes: ["Stationnement herbes/paille", "Regen en cours"], identification: { wires: "Intacts", metal: "FAP/échappement bleui, suie brûlée", surroundings: "Départ sous caisse arrière" }, temperature: "600-1200°C", photos: ["dpf_regen", "catalyst_glow"] },
        { id: "vx_gdi", category: "vehicle-thermal", title: "Fuite HP essence (GDI 150-350 bar)", type: "Carburant", description: "Brouillard inflammable instantané sur point chaud.", causes: ["Injecteur HP", "Rampe, raccord HP"], identification: { wires: "Intacts", metal: "Traces carburant brûlé", surroundings: "Flash immédiat, départ rampe HP" }, temperature: "Auto-inflammation ~280°C", photos: ["gdi_pump", "car_fire_road"] },
        { id: "vx_coolant", category: "vehicle-thermal", title: "Fuite glycol sur échappement", type: "Fluide", description: "Vapeur blanche puis inflammation ~400°C.", causes: ["Durite LDR", "Pompe, radiateur"], identification: { wires: "Intacts", metal: "Dépôts blancs/verts sur échappement", surroundings: "Odeur sucrée, vapeur avant flamme" }, temperature: "398-410°C", photos: ["coolant_leak", "exhaust_hot"] },
        { id: "vx_48v", category: "vehicle-electric", title: "Défaut système 48V MHEV", type: "48V Li-ion", description: "Micro-hybride : pack Li-ion 0,5-1,5 kWh, DC/DC, BSG.", causes: ["Fuite LDR pack 48V", "Connecteur 200-300 A", "Choc"], identification: { wires: "Câblage bleu 48V fondu", metal: "Boîtier DC/DC fondu", surroundings: "Glycol dans pack" }, temperature: "Runaway Li-ion", photos: ["battery_runaway", "harness_chafe"] },
        { id: "vx_hv_int", category: "vehicle-electric", title: "Runaway HT origine INTERNE", type: "Batterie HT", description: "Défaut cellule : dendrite, particule, séparateur → emballement.", causes: ["Défaut manufacturier", "Charge rapide à froid", "Surcharge BMS"], identification: { wires: "Busbars fondus INTERNES", metal: "Suie DANS pack, évents orientés", surroundings: "Logs BMS anormaux AVANT feu" }, temperature: "800-1400°C", photos: ["pack_teardown", "battery_runaway"] },
        { id: "vx_hv_ext", category: "vehicle-electric", title: "Pack HT atteint par feu EXTERNE", type: "Batterie HT", description: "Feu habitacle/roue/voisin propagé au pack : conséquence, pas cause.", causes: ["Feu externe", "Choc avec feu"], identification: { wires: "Arcs EXTERNES au pack", metal: "Calcination extérieur→intérieur", surroundings: "Aucun log BMS pré-feu" }, temperature: "Variable puis runaway", photos: ["ev_wrecks", "pack_teardown"] },
        { id: "vx_ccs", category: "vehicle-electric", title: "Défaut connecteur de charge CCS/Type2", type: "Charge", description: "Broches contaminées/humides/mal serrées → arc en charge.", causes: ["Humidité", "Broches usées", "Relais soudés"], identification: { wires: "Perles dans connecteur", metal: "Broches fondues directionnelles", surroundings: "Départ à la prise, câble/borne" }, temperature: "Arc >1000°C", photos: ["ccs_connector", "ev_charging_fire"] },
        { id: "vx_brakes", category: "vehicle-thermal", title: "Freins surchauffés (descente, étrier grippé)", type: "Point chaud", description: "Disques 600-900°C → inflammation pneu/plaquettes.", causes: ["Descente sans frein moteur", "Étrier grippé", "Frein à main serré"], identification: { wires: "Intacts", metal: "Disque bleui, plaquettes vitrifiées", surroundings: "Départ roue, pneu fondu côté frein" }, temperature: "600-900°C", photos: ["tire_burn", "car_fire_road"] },
        { id: "vx_seat", category: "building", title: "Mousse PU siège (habitacle)", type: "Habitacle", description: "Combustible majeur : croissance rapide, CO + HCN.", causes: ["Mégot", "Siège chauffant", "Pyrolyse"], identification: { wires: "Résistance chauffante fondue si électrique", metal: "Structure siège bleue", surroundings: "V-pattern siège, suie interne habitacle" }, temperature: "600-900°C", photos: ["seat_foam", "smoker_car"] }
    ];
    cases.forEach(c => FIRE_DATABASE.fireCauses.push(c));
})();

// ================================================================
// Rendu des sections expert (autonome, sans toucher app.js)
// ================================================================
function vePhoto(key) {
    const p = PHOTOS[key];
    return p ? `<img src="${p.url}" alt="${p.caption}" loading="lazy" class="photo-thumb" onclick="openLightbox('${key}')" onerror="this.classList.add('photo-error')">` : '';
}

function renderVehicleExpert() {
    const V = VEHICLE_EXPERT;

    const g = (id) => document.getElementById(id);
    if (!g('vz-grid')) return;

    g('vz-grid').innerHTML = V.zones.map(z => `
        <div class="ve-zone"><h4>📍 ${z.zone}</h4><p><strong>Composants :</strong> ${z.components}</p><p><strong>Risques :</strong> ${z.risks}</p></div>`).join('');

    g('vo-grid').innerHTML = Object.values(V.origins).map(o => `
        <details class="ve-origin">
            <summary>${o.title}</summary>
            ${o.voltage ? `<p class="ve-volt">🔌 ${o.voltage}</p>` : ''}
            ${o.pressures ? `<p class="ve-volt">⛽ ${o.pressures}</p>` : ''}
            ${o.components ? `<p><strong>Composants :</strong> ${o.components}</p>` : ''}
            ${o.modes ? `<h5>Mécanismes de défaillance</h5><ul>${o.modes.map(m => `<li>${m}</li>`).join('')}</ul>` : ''}
            ${o.evidence ? `<h5>Preuves à rechercher</h5><ul>${o.evidence.map(m => `<li>${m}</li>`).join('')}</ul>` : ''}
            ${o.data ? `<div class="table-container"><table class="metal-table"><thead><tr><th>Fluide</th><th>Point éclair</th><th>Auto-infl.</th><th>LIE</th><th>Note</th></tr></thead><tbody>${o.data.map(d => `<tr><td><strong>${d.fluid}</strong></td><td>${d.flash}</td><td>${d.auto}</td><td>${d.lel}</td><td>${d.note}</td></tr>`).join('')}</tbody></table></div>` : ''}
            ${o.fluids ? `<div class="table-container"><table class="metal-table"><thead><tr><th>Fluide</th><th>Auto-infl.</th><th>Fuites types</th><th>Trace</th></tr></thead><tbody>${o.fluids.map(d => `<tr><td><strong>${d.fluid}</strong></td><td>${d.auto}</td><td>${d.leak}</td><td>${d.trace}</td></tr>`).join('')}</tbody></table></div>` : ''}
            ${o.surfaces ? `<div class="table-container"><table class="metal-table"><thead><tr><th>Organe</th><th>Normal</th><th>En charge</th></tr></thead><tbody>${o.surfaces.map(d => `<tr><td><strong>${d.part}</strong></td><td>${d.normal}</td><td>${d.charge}</td></tr>`).join('')}</tbody></table></div><p class="identification">${o.rule}</p>` : ''}
            ${o.evidence && typeof o.evidence === 'string' ? `<p class="identification">${o.evidence}</p>` : ''}
        </details>`).join('');

    g('vp-table').innerHTML = V.plastics.map(p => `
        <tr><td><strong>${p.p}</strong></td><td>${p.use}</td><td>${p.fire}</td><td>${p.role}</td></tr>`).join('');
    g('vf-load').innerHTML = `
        <p><strong>Masse polymères :</strong> ${V.fireLoad.mass}</p>
        <p><strong>Charge calorifique :</strong> ${V.fireLoad.energy}</p>
        <p><strong>Puissance (HRR) :</strong> ${V.fireLoad.hrr}</p>
        <p><strong>Pneus :</strong> ${V.fireLoad.tires}</p>`;

    g('vd-stages').innerHTML = V.development.stages.map(s => `<div class="runaway-phase"><h4>${s.s}</h4><p>${s.d}</p></div>`).join('');
    g('vd-vent').innerHTML = `<ul>${V.development.ventilation.map(v => `<li>${v}</li>`).join('')}</ul>`;
    g('vd-spread').innerHTML = `<ul>${V.development.spreadPaths.map(v => `<li>${v}</li>`).join('')}</ul>`;
    g('vd-dir').innerHTML = `<ul>${V.development.direction.map(v => `<li>${v}</li>`).join('')}</ul>`;

    g('ev-seq').innerHTML = V.evExpert.sequence.map(s => `<div class="runaway-phase"><h4>${s.t}</h4><p>${s.e}</p></div>`).join('');
    g('ev-gas').innerHTML = `<p class="identification">${V.evExpert.gases}</p>`;
    g('ev-trig').innerHTML = `<ul>${V.evExpert.triggers.map(v => `<li>${v}</li>`).join('')}</ul>`;
    g('ev-cc').innerHTML = `<ul>${V.evExpert.causeVsConsequence.map(v => `<li>${v}</li>`).join('')}</ul>`;
    g('ev-chg').innerHTML = `<ul>${V.evExpert.charging.map(v => `<li>${v}</li>`).join('')}</ul>`;
    g('ev-reig').innerHTML = `<p class="identification">${V.evExpert.reignition}</p>`;
    g('ev-ext').innerHTML = `<ul>${V.evExpert.extinction.map(v => `<li>${v}</li>`).join('')}</ul>`;

    g('th-expert').innerHTML = `
        <div class="id-card"><h4>🔥 FAP / régénération</h4><p>${V.thermalExpert.dpf}</p></div>
        <div class="id-card"><h4>🐭 Rongeurs</h4><p>${V.thermalExpert.rodent}</p></div>
        <div class="id-card"><h4>📋 Rappels & historique</h4><p>${V.thermalExpert.recalls}</p></div>
        <div class="id-card"><h4>🔧 Aftermarket</h4><p>${V.thermalExpert.aftermarket}</p></div>`;

    g('vm-table').innerHTML = V.meltMap.map(m => `<tr><td><strong>${m.m}</strong></td><td>${m.t}</td><td>${m.meaning}</td></tr>`).join('');

    g('vproto').innerHTML = V.protocol.map(p => `<div class="method-step"><div class="step-num">${p.split('.')[0]}</div><div class="step-content"><p>${p.substring(p.indexOf('.') + 1)}</p></div></div>`).join('');

    console.log('✅ Module expert véhicules v5.0 rendu');
}

document.addEventListener('DOMContentLoaded', renderVehicleExpert);
