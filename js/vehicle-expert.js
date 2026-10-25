// ================================================================
// MODULE INGÉNIEUR EXPERT VÉHICULES - TECH INCENDIE v6.0
// ================================================================
Object.assign(PHOTOS, {
    harness_chafe: { url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3", caption: "Faisceau 12V : gaine percée par frottement → court-circuit à la masse", credit: "Auto Forensics" },
    alternator_burnt: { url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3", caption: "Alternateur : borne B+ (100-250 A) fondue = échauffement de contact", credit: "Electrical Expert" },
    fuse_box: { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64", caption: "Boîte à fusibles : fusibles grillés = circuits énergisés pendant le feu", credit: "Fire Investigation" },
    dpf_regen: { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70", caption: "FAP en régénération : 600-1200°C à l'échappement", credit: "Diesel Tech" },
    gdi_pump: { url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3", caption: "Pompe HP GDI 150-350 bar : fuite = brouillard inflammable", credit: "Fuel Systems" },
    coolant_leak: { url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3", caption: "Fuite glycol sur échappement : vapeur blanche puis flamme ~400°C", credit: "Auto Forensics" },
    seat_foam: { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70", caption: "Mousse PU de siège : combustible majeur, CO + HCN", credit: "Fire Dynamics" },
    garage_fire: { url: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1", caption: "Parking confiné : nappe 600°C, propagation véhicule adjacent", credit: "BSPP" },
    pack_teardown: { url: "https://images.unsplash.com/photo-1620677369636-39ab1b4c53f3", caption: "Pack HT ouvert : suie INTERNE + évents = origine interne", credit: "EV Forensics" },
    ccs_connector: { url: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75", caption: "Connecteur CCS : broches fondues = défaut de charge", credit: "Charging Expert" },
    rodent_damage: { url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3", caption: "Faisceau sectionné par rongeurs + nid inflammable", credit: "Auto Forensics" },
    tire_burn: { url: "https://images.unsplash.com/photo-1504222490345-c07557794111", caption: "Pneus : combustion tardive prolongée (phase décroissance)", credit: "Fire Service" }
});

const VEHICLE_EXPERT = {
    zones: [
        { zone: "Compartiment moteur", components: "Moteur, turbo, collecteur, catalyseur, FAP, faisceau, alternateur, durites, LDR, clim", risks: "Huile/carburant sur point chaud, faisceau frotté, B+, régénération FAP" },
        { zone: "Habitacle", components: "Mousses PU, ABS/PC, faisceaux, 12V, USB, sièges chauffants, airbags", risks: "Mégots, chargeurs, résistance chauffante, pyrolyse mousse" },
        { zone: "Coffre / arrière", components: "Batterie 12V, réservoir, pack HT (VE), faisceau hayon", risks: "Bornes 12V, court-circuit hayon, pack HT" },
        { zone: "Soubassement", components: "Échappement, cata, FAP, réservoir, pack HT, freins", risks: "Cata sur herbes sèches, fuite réservoir, impact pack" },
        { zone: "Roues / freins", components: "Disques, plaquettes, étriers, pneus", risks: "600-900°C après descente, étrier grippé" },
        { zone: "Extérieur", components: "Peinture, joints, PP", risks: "Propagation externe, acte volontaire, brandons" }
    ],
    origins: {
        electrical12: { title: " Électrique 12V", voltage: "12-14,4 V DC — démarreur 200-600 A, alternateur 90-250 A, méga-fusible 300-500 A",
            modes: ["Frottement gaine contre tôle → court-circuit franc (B+ toujours énergisé)", "Cosse oxydée/desserrée → chauffe Joule P=R×I²", "Boîte à fusibles : eau → corrosion → arc", "Aftermarket (alarme, traceur, audio, LED) : épissures = cause n°1", "Rongeurs : gaine sectionnée + nid", "Fatigue vibratoire → arc série (protections NON déclenchées)", "Alternateur : borne B+ mal serrée → fusion 100-250 A"],
            evidence: ["Arc mapping : remonter vers la source", "Perles primaires sphériques brillantes + cavité interne (ASTM E2929)", "Fusibles grillés = circuit énergisé PENDANT le feu", "Œillet de cloison fondu = franchissement", "Épissures non OEM = présomption aftermarket"] },
        electrical48: { title: "⚡ Électrique 48V (MHEV)", voltage: "48 V DC — Li-ion 0,5-1,5 kWh — BSG 10-15 kW — DC/DC 48→12",
            modes: ["Connecteurs 48V (200-300 A) : chauffe de contact", "Fuite LDR dans pack 48V refroidi par eau", "Choc / écrasement pack", "Câblage 48V (gaine bleue) frotté"],
            evidence: ["<60 V DC : pas d'électrocution mais feu réel", "Arcs sur busbars 48V, DC/DC fondu", "Glycol dans pack = fuite refroidissement"] },
        electricalHV: { title: "⚡ Haute tension 400-800 V", voltage: "350-450 V ou 700-925 V (800V) — câblage ORANGE + HVIL",
            components: "Pack (cellules/modules/busbars), BMS, contacteurs, pyrofuse, MSD, évents, plaque froide ; onduleur, OBC, DC/DC, PTC, e-clim, prise CCS/Type2",
            modes: ["Défaut d'isolement → fuite → chauffe progressive", "Court-circuit externe (choc, perçage)", "Surcharge / défaut BMS", "Court-circuit interne : particule, dendrite Li (charge rapide <0°C), séparateur", "Connecteur charge : broches contaminées/humides", "Relais de charge soudés"],
            evidence: ["AVANT contact : isolement + tension résiduelle (énergie piégée)", "Suie INTERNE + évents orientés + busbars fondus dedans = INTERNE", "Calcination extérieur→intérieur, cellules opposées intactes = EXTERNE", "Logs BMS anormaux AVANT feu = cause interne", "Pyrofuse déclenché = choc (corréler EDR/airbags)", "CT-scan / X-ray AVANT ouverture"] },
        fuel: { title: "⛽ Carburant", pressures: "Indirecte 3-4 bar • GDI 150-350 bar • Diesel CR 1600-2500 bar → fuite HP = brouillard inflammable",
            data: [
                { fluid: "Essence SP95/E10", flash: "-43°C", auto: "~280°C", lel: "1,4 %", note: "Vapeurs 3× air, au sol" },
                { fluid: "Diesel B7", flash: "≥55°C", auto: "~210°C", lel: "0,6 %", note: "S'enflamme sur point chaud" },
                { fluid: "E85", flash: "~13°C", auto: "~363°C", lel: "3,3 %", note: "Flamme peu visible" },
                { fluid: "GPL", flash: "-104°C", auto: "~470°C", lel: "1,8 %", note: "Lourd, soupape sûreté" },
                { fluid: "H2 (FCEV)", flash: "Gaz", auto: "~560°C", lel: "4 %", note: "Flamme invisible" }],
            modes: ["Durite poreuse, collier, connecteur rapide fissuré", "Joint injecteur / rampe HP", "Réservoir percé, pompe", "Fuite HP = aérosol → inflammation immédiate"],
            evidence: ["Flaque brûlée en son centre", "GC-MS : hydrocarbure véhicule ≠ accélérant", "Origine = intersection fuite × point chaud"] },
        lines: { title: "🛢️ Canalisations & fluides",
            fluids: [
                { fluid: "Huile moteur", auto: "300-350°C", leak: "Cache-culbuteurs, turbo, filtre", trace: "Vernis brun sur échappement" },
                { fluid: "ATF boîte", auto: "300-400°C", leak: "Durite refroidisseur", trace: "Résidu rouge-brun" },
                { fluid: "Direction assistée", auto: "250-300°C", leak: "Durite HP pompe", trace: "Noir brillant" },
                { fluid: "Frein DOT4", auto: "380-400°C", leak: "Durite souple", trace: "Peinture décapée" },
                { fluid: "LDR glycol", auto: "398-410°C", leak: "Radiateur, pompe", trace: "Vapeur blanche sucrée" },
                { fluid: "PAG/POE clim", auto: "350-400°C", leak: "Condenseur", trace: "Avec R1234yf : HF" },
                { fluid: "R1234yf", auto: "~405°C (A2L)", leak: "Condenseur percé", trace: "Flamme + HF" },
                { fluid: "AdBlue", auto: "Non inflammable", leak: "Injecteur DEF", trace: "Cristaux blancs, NH3" }] },
        battery12: { title: "🔋 Batterie 12V plomb",
            modes: ["Cosse oxydée/desserrée → Joule", "Court-circuit cosse/masse", "H2 en charge + étincelle → EXPLOSION", "Fuite acide (batterie en coffre)"],
            evidence: "Boîtier éclaté/fondu, bornes projetées, sulfate blanc, perles sur B+" },
        battery48: { title: "🔋 Batterie 48V Li-ion",
            modes: "Choc, fuite LDR, surcharge DC/DC, court-circuit busbars",
            evidence: "Boîtier éventré, cellules gonflées, dépôt blanc LiPF6" },
        hotSurfaces: { title: "🌡️ Points chauds réels",
            surfaces: [
                { part: "Collecteur échappement", normal: "400-600°C", charge: "800-1000°C" },
                { part: "Turbo", normal: "600-800°C", charge: "900-1000°C" },
                { part: "Catalyseur", normal: "400-700°C", charge: "900-1200°C" },
                { part: "FAP régénération", normal: "600-650°C", charge: "1200°C" },
                { part: "Ligne aval", normal: "300-500°C", charge: "600°C" },
                { part: "Disques frein", normal: "150-300°C", charge: "600-900°C" },
                { part: "Bloc moteur", normal: "90-120°C", charge: "140°C (non inflammant)" },
                { part: "Sonde lambda", normal: "600-800°C local", charge: "-" }],
            rule: "Règle ingénieur : inflammation seulement si T° surface > T° auto-inflammation du FILM liquide (délai secondes à minutes)." }
    },
    plastics: [
        { p: "PP", use: "Pare-chocs, garnitures", fire: "Fond 160-170°C, gouttes enflammées", role: "Propagateur" },
        { p: "PE", use: "Réservoirs, durites", fire: "Fond 110-130°C, goutte", role: "Réservoir = combustible tardif" },
        { p: "PU mousse", use: "Sièges", fire: "Croissance rapide, CO + HCN", role: "Combustible n°1 habitacle" },
        { p: "PVC", use: "Isolation câbles", fire: "Auto-extinguible, HCl, fumées", role: "Toxique" },
        { p: "ABS", use: "Planche de bord", fire: "Fond 105°C, suie, styrène", role: "Combustible habitacle" },
        { p: "PA nylon", use: "Connecteurs, admission", fire: "Fond 220-260°C", role: "Résiste" },
        { p: "POM", use: "Engrenages", fire: "Formaldéhyde", role: "Mineur" },
        { p: "PC", use: "Optiques", fire: "Tg 150°C, suie", role: "Faible" },
        { p: "EPDM", use: "Joints", fire: "Charbonise lent", role: "Faible" },
        { p: "PET", use: "Textiles", fire: "Fond 250°C, goutte", role: "Moyen" }],
    fireLoad: { mass: "100-150 kg polymères/véhicule", energy: "Charge calorifique 2-4 GJ", hrr: "Pic 3-8 MW (jusqu'à 10 MW récents) ; VE : pic similaire + jet-fire", tires: "Pneus : combustion tardive longue" },
    development: {
        stages: [
            { s: "1. Initiation", d: "Arc, fuite, mégot — fumée blanche = pyrolyse" },
            { s: "2. Croissance", d: "Gaines, durites, mousses — 2-6 min pour percer capot" },
            { s: "3. Embrasement volume", d: "Habitacle 8-15 min, flashover local" },
            { s: "4. Plein développement", d: "700-1000°C gaz, Al fondu, vitres éclatées" },
            { s: "5. Décroissance", d: "Pneus + polymères, reignition possible (VE)" }],
        ventilation: ["FERMÉ : O2 limité → fumée dense, suie interne ; ouverture = reprise violente", "Fenêtre ouverte au-dessus : effet cheminée ×2-3", "Vent latéral : foyer poussé sous le vent → lecture directionnelle", "Garage : nappe 500-700°C, propagation adjacent <1 m", "Extérieur ventilé : combustion complète, cartographie lisible"],
        spreadPaths: ["Moteur→habitacle : œillets, HVAC, pédales", "Passage roue→habitacle : garniture PP, moquette", "Soubassement→plancher : moquette/pyrolyse", "Coffre→habitacle : banquette, passe-câbles", "VE : pack→habitacle par évents (jet-fire sous caisse)"],
        direction: ["Gradient profondeur brûlure", "Coulures polymères", "V-patterns carrosserie", "Vitrage éclaté en premier", "Cartographie fusion Zn 420 → Al 660 → Cu 1084", "Densité suie décroissante"]
    },
    evExpert: {
        sequence: [
            { t: "90-120°C", e: "Décomposition SEI → exothermique lente, dégazage" },
            { t: "120-180°C", e: "Anode ↔ électrolyte, montée pression" },
            { t: "130-170°C", e: "Fusion séparateur PE/PP → court-circuit interne massif" },
            { t: "180-250°C", e: "Cathode NMC/NCA → O2 (auto-comburant)" },
            { t: "270-310°C", e: "LFP tardif, SANS O2 = plus sûr" },
            { t: ">200°C", e: "Électrolyte brûle + jet-fire 800-1400°C" }],
        gases: "H2 20-40 % • CO 10-30 % • CO2 • CH4/C2H4 • carbonates • HF (LiPF6) • POF3 → inflammable + toxique → déflagration par évents",
        triggers: ["Mécanique : écrasement, perforation, flexion", "Électrique externe : court-circuit, surcharge, isolement", "Électrique interne : particule, dendrite Li, séparateur", "Thermique externe : feu voisin, point chaud"],
        causeVsConsequence: ["INTERNE : évents de l'intérieur, suie DANS pack, busbars fondus internes, logs BMS AVANT feu", "EXTERNE : calcination ext→int, cellules opposées intactes, aucun log pré-feu, arcs externes", "Données : logs BMS, EDR, télématique, session borne (I, T°, motif arrêt)"],
        charging: ["AC Type2 : broches contaminées/humides → arc 1000°C+", "DC CCS : relais soudés, câble sectionné, refroidissement HS", "Preuves : broches fondues directionnelles, perles connecteur, logs session"],
        reignition: "Énergie piégée : surveillance 24-72 h min, cas jusqu'à 3 semaines ; stockage extérieur, écart 5 m",
        extinction: ["REFROIDIR le pack : 30 000-100 000 L eau", "Ne jamais percer/ouvrir sur site", "ARI obligatoire (HF)", "Immersion container si disponible", "Caméra thermique jusqu'à <60°C stable"]
    },
    thermalExpert: {
        dpf: "Régénération FAP 600-1200°C : stationnement herbes/pailles après = ignition. Preuve : log ECU regen, suie FAP, départ sous caisse arrière.",
        rodent: "Fouines : gaines sectionnées + nid. Preuve : marques de dents, matériau de nid.",
        recalls: "Vérifier rappels constructeur feu + entretien + sinistres + modifications.",
        aftermarket: "Épissures non OEM = 1ère cause électrique : traceurs, alarmes, audio, LED, sièges chauffants."
    },
    meltMap: [
        { m: "Zinc (galva)", t: "420°C", meaning: "Feu modéré local" },
        { m: "Aluminium", t: "660°C", meaning: "Feu sévère, gaz >700°C" },
        { m: "Cuivre", t: "1084°C", meaning: "Feu majeur OU arc local" },
        { m: "Acier déformation", t: "700-900°C", meaning: "Perte résistance" },
        { m: "Verre trempé", t: "éclate 250-300°C", meaning: "Chronologie ouvrants" },
        { m: "Chrome/décor", t: "400-600°C", meaning: "Gradients fins" }],
    protocol: [
        "1. Scène : position, espacement, flaque brûlée au centre (fuite) vs contour versé (accélérant)",
        "2. Identification : VIN, km, contact, câble de charge ?",
        "3. Historique : entretien, rappels, mods, sinistres, télématique",
        "4. Données : EDR, logs BMS, OBD gelé, session borne, cloud",
        "5. Externe : suie/fusion/vitrages, ouvrants, béquille capot fondue ?",
        "6. Compartiments : gradients, zone convergente",
        "7. Électrique : arc mapping, B+, fusibles, épissures",
        "8. Fluides : traçage UV, GC-MS",
        "9. VE : isolement + tension résiduelle, CT/X-ray, évents, suie interne",
        "10. Labo : métallographie ASTM E2929, FTIR, GC-MS",
        "11. Hypothèses : élimination, conclusion (certain/probable/indéterminé)"]
};

// Photos liées à chaque bloc expert
const ORIGIN_PHOTOS = {
    electrical12: ['harness_chafe', 'alternator_burnt', 'fuse_box', 'rodent_damage'],
    electrical48: ['battery_runaway', 'harness_chafe'],
    electricalHV: ['pack_teardown', 'ccs_connector', 'battery_burnt'],
    fuel: ['gdi_pump', 'car_fire_road', 'oil_puddle'],
    lines: ['coolant_leak', 'exhaust_hot', 'oil_puddle'],
    battery12: ['alternator_burnt', 'fuse_box'],
    battery48: ['battery_runaway'],
    hotSurfaces: ['exhaust_hot', 'catalyst_glow', 'dpf_regen', 'tire_burn']
};
const DEV_PHOTOS = ['garage_fire', 'seat_foam', 'tire_burn', 'v_pattern'];
const EV_PHOTOS = ['battery_runaway', 'pack_teardown', 'ev_reignition', 'ccs_connector'];
const PROTO_PHOTOS = ['investigation_kit', 'pack_teardown', 'fuse_box'];

// Injection des cas experts dans recherche/filtres
(function () {
    const cases = [
        { id: "vx_bplus", category: "electrical", title: "Court-circuit câble B+", type: "12V", description: "Câble toujours énergisé 100-250 A : fusion massive.", causes: ["Cosse desserrée", "Gaine frottée"], identification: { wires: "Perles primaires, borne B+ fondue", metal: "Projection cuivre", surroundings: "Origine batterie/alternateur" }, temperature: ">1084°C", photos: ["alternator_burnt", "arc_beads"] },
        { id: "vx_aftermarket", category: "electrical", title: "Épissure accessoire aftermarket", type: "12V", description: "Alarme, traceur, audio : raccord non OEM = cause n°1.", causes: ["Épissure mal sertie", "Fusible volant absent"], identification: { wires: "Arc à l'épissure", metal: "Connecteur rapide fondu", surroundings: "Départ au point d'installation" }, temperature: "300-800°C", photos: ["harness_chafe", "fuse_box"] },
        { id: "vx_rodent", category: "electrical", title: "Section faisceau par rongeurs", type: "12V", description: "Fouines : gaine sectionnée + nid inflammable.", causes: ["Nid compartiment", "Câbles sectionnés"], identification: { wires: "Marques de dents", metal: "Arc sur tôle", surroundings: "Nid carbonisé" }, temperature: "Arc >2000°C", photos: ["rodent_damage", "arc_sparks"] },
        { id: "vx_dpf", category: "vehicle-thermal", title: "Régénération FAP sur végétation", type: "Point chaud", description: "600-1200°C échappement pendant/après regen.", causes: ["Stationnement herbes", "Regen en cours"], identification: { wires: "Intacts", metal: "FAP bleui", surroundings: "Départ sous caisse arrière" }, temperature: "600-1200°C", photos: ["dpf_regen", "catalyst_glow"] },
        { id: "vx_gdi", category: "vehicle-thermal", title: "Fuite HP essence GDI", type: "Carburant", description: "150-350 bar : brouillard inflammable instantané.", causes: ["Injecteur HP", "Rampe"], identification: { wires: "Intacts", metal: "Carburant brûlé", surroundings: "Flash immédiat" }, temperature: "~280°C", photos: ["gdi_pump", "car_fire_road"] },
        { id: "vx_coolant", category: "vehicle-thermal", title: "Fuite glycol sur échappement", type: "Fluide", description: "Vapeur blanche puis flamme ~400°C.", causes: ["Durite LDR", "Pompe"], identification: { wires: "Intacts", metal: "Dépôts verts/blancs", surroundings: "Odeur sucrée" }, temperature: "398-410°C", photos: ["coolant_leak", "exhaust_hot"] },
        { id: "vx_48v", category: "vehicle-electric", title: "Défaut système 48V MHEV", type: "48V", description: "Pack Li-ion 0,5-1,5 kWh, DC/DC, BSG.", causes: ["Fuite LDR pack", "Connecteur 300 A"], identification: { wires: "Câblage bleu fondu", metal: "DC/DC fondu", surroundings: "Glycol dans pack" }, temperature: "Runaway Li-ion", photos: ["battery_runaway", "harness_chafe"] },
        { id: "vx_hv_int", category: "vehicle-electric", title: "Runaway HT origine INTERNE", type: "Batterie HT", description: "Dendrite, particule, séparateur → emballement.", causes: ["Défaut manufacturier", "Charge rapide à froid"], identification: { wires: "Busbars fondus internes", metal: "Suie DANS pack", surroundings: "Logs BMS AVANT feu" }, temperature: "800-1400°C", photos: ["pack_teardown", "battery_runaway"] },
        { id: "vx_hv_ext", category: "vehicle-electric", title: "Pack HT atteint par feu EXTERNE", type: "Batterie HT", description: "Conséquence, pas cause.", causes: ["Feu externe", "Choc"], identification: { wires: "Arcs externes", metal: "Calcination ext→int", surroundings: "Aucun log pré-feu" }, temperature: "Variable", photos: ["ev_wrecks", "pack_teardown"] },
        { id: "vx_ccs", category: "vehicle-electric", title: "Défaut connecteur CCS/Type2", type: "Charge", description: "Broches contaminées/humides → arc en charge.", causes: ["Humidité", "Relais soudés"], identification: { wires: "Perles connecteur", metal: "Broches fondues", surroundings: "Départ à la prise" }, temperature: ">1000°C", photos: ["ccs_connector", "ev_charging_fire"] },
        { id: "vx_brakes", category: "vehicle-thermal", title: "Freins surchauffés", type: "Point chaud", description: "Disques 600-900°C → pneu/plaquettes.", causes: ["Descente sans frein moteur", "Étrier grippé"], identification: { wires: "Intacts", metal: "Disque bleui", surroundings: "Départ roue" }, temperature: "600-900°C", photos: ["tire_burn", "car_fire_road"] },
        { id: "vx_seat", category: "building", title: "Mousse PU siège", type: "Habitacle", description: "Combustible majeur : CO + HCN.", causes: ["Mégot", "Siège chauffant"], identification: { wires: "Résistance fondue", metal: "Structure bleue", surroundings: "V-pattern siège" }, temperature: "600-900°C", photos: ["seat_foam", "smoker_car"] }
    ];
    cases.forEach(c => FIRE_DATABASE.fireCauses.push(c));
})();

function vePhoto(key) {
    const p = PHOTOS[key];
    return p ? `<img src="${p.url}" alt="${p.caption}" loading="lazy" class="photo-thumb" onclick="openLightbox('${key}')" onerror="this.classList.add('photo-error')">` : '';
}
function veRow(keys) { return `<div class="photo-row">${(keys || []).map(vePhoto).join('')}</div>`; }

function renderVehicleExpert() {
    const V = VEHICLE_EXPERT, g = (id) => document.getElementById(id);
    if (!g('vz-grid')) return;

    g('vz-grid').innerHTML = V.zones.map(z => `<div class="ve-zone"><h4>📍 ${z.zone}</h4><p><strong>Composants :</strong> ${z.components}</p><p><strong>Risques :</strong> ${z.risks}</p></div>`).join('');

    g('vo-grid').innerHTML = Object.entries(V.origins).map(([k, o]) => `
        <details class="ve-origin"><summary>${o.title}</summary>
        ${o.voltage ? `<p class="ve-volt">🔌 ${o.voltage}</p>` : ''}${o.pressures ? `<p class="ve-volt">⛽ ${o.pressures}</p>` : ''}
        ${o.components ? `<p><strong>Composants :</strong> ${o.components}</p>` : ''}
        ${o.modes ? `<h5>Mécanismes de défaillance</h5><ul>${o.modes.map(m => `<li>${m}</li>`).join('')}</ul>` : ''}
        ${o.evidence && Array.isArray(o.evidence) ? `<h5>Preuves</h5><ul>${o.evidence.map(m => `<li>${m}</li>`).join('')}</ul>` : ''}
        ${o.evidence && typeof o.evidence === 'string' ? `<p class="identification">${o.evidence}</p>` : ''}
        ${o.data ? `<div class="table-container"><table class="metal-table"><thead><tr><th>Fluide</th><th>Éclair</th><th>Auto-infl.</th><th>LIE</th><th>Note</th></tr></thead><tbody>${o.data.map(d => `<tr><td><strong>${d.fluid}</strong></td><td>${d.flash}</td><td>${d.auto}</td><td>${d.lel}</td><td>${d.note}</td></tr>`).join('')}</tbody></table></div>` : ''}
        ${o.fluids ? `<div class="table-container"><table class="metal-table"><thead><tr><th>Fluide</th><th>Auto-infl.</th><th>Fuites</th><th>Trace</th></tr></thead><tbody>${o.fluids.map(d => `<tr><td><strong>${d.fluid}</strong></td><td>${d.auto}</td><td>${d.leak}</td><td>${d.trace}</td></tr>`).join('')}</tbody></table></div>` : ''}
        ${o.surfaces ? `<div class="table-container"><table class="metal-table"><thead><tr><th>Organe</th><th>Normal</th><th>Charge</th></tr></thead><tbody>${o.surfaces.map(d => `<tr><td><strong>${d.part}</strong></td><td>${d.normal}</td><td>${d.charge}</td></tr>`).join('')}</tbody></table></div><p class="identification">${o.rule}</p>` : ''}
        ${veRow(ORIGIN_PHOTOS[k])}
        </details>`).join('');

    g('vp-table').innerHTML = V.plastics.map(p => `<tr><td><strong>${p.p}</strong></td><td>${p.use}</td><td>${p.fire}</td><td>${p.role}</td></tr>`).join('');
    g('vf-load').innerHTML = `<p><strong>Masse :</strong> ${V.fireLoad.mass}</p><p><strong>Énergie :</strong> ${V.fireLoad.energy}</p><p><strong>HRR :</strong> ${V.fireLoad.hrr}</p><p><strong>Pneus :</strong> ${V.fireLoad.tires}</p>`;

    g('vd-stages').innerHTML = V.development.stages.map(s => `<div class="runaway-phase"><h4>${s.s}</h4><p>${s.d}</p></div>`).join('');
    g('vd-vent').innerHTML = `<ul>${V.development.ventilation.map(v => `<li>${v}</li>`).join('')}</ul>` + veRow(DEV_PHOTOS);
    g('vd-spread').innerHTML = `<ul>${V.development.spreadPaths.map(v => `<li>${v}</li>`).join('')}</ul>`;
    g('vd-dir').innerHTML = `<ul>${V.development.direction.map(v => `<li>${v}</li>`).join('')}</ul>`;

    g('ev-seq').innerHTML = V.evExpert.sequence.map(s => `<div class="runaway-phase"><h4>${s.t}</h4><p>${s.e}</p></div>`).join('') + veRow(EV_PHOTOS);
    g('ev-gas').innerHTML = `<p class="identification">${V.evExpert.gases}</p>`;
    g('ev-trig').innerHTML = `<ul>${V.evExpert.triggers.map(v => `<li>${v}</li>`).join('')}</ul>`;
    g('ev-cc').innerHTML = `<ul>${V.evExpert.causeVsConsequence.map(v => `<li>${v}</li>`).join('')}</ul>`;
    g('ev-chg').innerHTML = `<ul>${V.evExpert.charging.map(v => `<li>${v}</li>`).join('')}</ul>`;
    g('ev-reig').innerHTML = `<p class="identification">${V.evExpert.reignition}</p>`;
    g('ev-ext').innerHTML = `<ul>${V.evExpert.extinction.map(v => `<li>${v}</li>`).join('')}</ul>`;

    g('th-expert').innerHTML = `
        <div class="id-card"><h4>🔥 FAP / régénération</h4><p>${V.thermalExpert.dpf}</p>${veRow(['dpf_regen', 'catalyst_glow'])}</div>
        <div class="id-card"><h4>🐭 Rongeurs</h4><p>${V.thermalExpert.rodent}</p>${veRow(['rodent_damage'])}</div>
        <div class="id-card"><h4>📋 Rappels</h4><p>${V.thermalExpert.recalls}</p></div>
        <div class="id-card"><h4>🔧 Aftermarket</h4><p>${V.thermalExpert.aftermarket}</p>${veRow(['harness_chafe', 'fuse_box'])}</div>`;

    g('vm-table').innerHTML = V.meltMap.map(m => `<tr><td><strong>${m.m}</strong></td><td>${m.t}</td><td>${m.meaning}</td></tr>`).join('');
    g('vproto').innerHTML = V.protocol.map(p => `<div class="method-step"><div class="step-num">${p.split('.')[0]}</div><div class="step-content"><p>${p.substring(p.indexOf('.') + 1)}</p></div></div>`).join('') + veRow(PROTO_PHOTOS);
    console.log('✅ Module expert véhicules v6.0 rendu');
}
document.addEventListener('DOMContentLoaded', renderVehicleExpert);
