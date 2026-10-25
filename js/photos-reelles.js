// ================================================================
// PHOTOS RÉELLES VÉRIFIÉES - TECH INCENDIE v7
// Chargé APRÈS database.js et vehicle-expert.js, AVANT app.js
// ================================================================
(function () {
    const B = "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/";
    const R = {
        arc_beads: [B + "2012034df-1d0c-4729-8d1b-f4c229283bb02098.png", "Microscope (MEB) : conducteurs cuivre fondus avec perles d'arc - preuve forensique de court-circuit", "ScienceDirect / Forensic"],
        arc_primary_secondary: [B + "4012034df-1d0c-4729-8d1b-f4c229283bb08661.png", "MEB x800 : microstructure d'une perle de fusion (porosités internes = arc primaire)", "Semantic Scholar"],
        arc_sparks: [B + "2012034df-1d0c-4729-8d1b-f4c229283bb01498.png", "Arc électrique haute énergie : boule de feu et vaporisation de métal (test labo)", "Sandia National Laboratories"],
        wire_fire: [B + "0012034df-1d0c-4729-8d1b-f4c229283bb04604.png", "Tableau en feu : conducteurs et isolation en combustion - départ électrique", "iStock"],
        melted_plugs: [B + "0012034df-1d0c-4729-8d1b-f4c229283bb07480.png", "Rampe de prises fondues et carbonisées : surcharge prolongée", "Dreamstime"],
        strip_fire: [B + "3012034df-1d0c-4729-8d1b-f4c229283bb08570.png", "Fiche en feu dans une prise : échauffement de contact en cours", "My Trusted Expert"],
        overload_room: [B + "4012034df-1d0c-4729-8d1b-f4c229283bb03551.png", "Coffret extérieur calciné après surcharge : suies rayonnantes", "Ragsdale Electrical"],
        terminal_glow: [B + "2012034df-1d0c-4729-8d1b-f4c229283bb08470.png", "Sectionneur fondu : borne serrée insuffisamment, chauffe Joule", "iStock"],
        outlet_burnt: [B + "4012034df-1d0c-4729-8d1b-f4c229283bb04420.png", "Prise murale avec alvéole calcinée : court-circuit localisé", "Alamy"],
        socket_scorched: [B + "1012034df-1d0c-4729-8d1b-f4c229283bb01489.png", "Prise fissurée et brunie : traces de chauffe et amorçage", "iStock"],
        panel_burnt: [B + "5012034df-1d0c-4729-8d1b-f4c229283bb08238.png", "Tableau de distribution détruit : câbles fondus, suies, alligatoring du mur", "Alamy"],
        fuse_box: [B + "3012034df-1d0c-4729-8d1b-f4c229283bb02039.png", "Disjoncteur carbonisé en gros plan : arc interne, projections blanches", "Reddit r/AskElectricians"],
        harness_burnt: [B + "6012034df-1d0c-4729-8d1b-f4c229283bb03502.png", "Torons cuivre avant/après choc thermique : recuit, coloration pourpre interne", "Nature Scientific Reports"],
        harness_chafe: [B + "5012034df-1d0c-4729-8d1b-f4c229283bb05828.png", "Câbles cuivre sectionnés/usés : frottement ou rongeurs, amorçage à la masse", "Citizen Digital"],
        alternator_burnt: [B + "2012034df-1d0c-4729-8d1b-f4c229283bb02696.png", "Compartiment moteur : batterie, alternateur et câble B+ toujours énergisé", "Dreamstime"],
        v_pattern: [B + "5012034df-1d0c-4729-8d1b-f4c229283bb09055.png", "Doctrine NFPA 921 : V-pattern, char patterns, point d'origine", "Fire Investigation Training"],
        alligatoring: [B + "0012034df-1d0c-4729-8d1b-f4c229283bb02615.png", "Structure calcinée : lecture des profondeurs de carbonisation et écailles", "AGI Forensic"],
        crazed_glass: [B + "1012034df-1d0c-4729-8d1b-f4c229283bb08518.png", "Véhicule après incendie : vitrages éclatés (choc thermique), enquête en cours", "Fire Service"],
        corridor_fire: [B + "0012034df-1d0c-4729-8d1b-f4c229283bb02615.png", "Investigateurs en EPI dans un volume sinistré : relevé des traces", "AGI Forensic"],
        bedroom_fire: [B + "1012034df-1d0c-4729-8d1b-f4c229283bb01496.png", "Embrasement généralisé d'habitation (flashover) : phase plein développement", "BBC"],
        facade_ite: [B + "1012034df-1d0c-4729-8d1b-f4c229283bb01496.png", "Feu de bâtiment : propagation façade et toiture", "BBC"],
        spalling_concrete: [B + "0012034df-1d0c-4729-8d1b-f4c229283bb02615.png", "Débris et éclatement des matériaux après feu intense (spalling)", "AGI Forensic"],
        flashover: [B + "1012034df-1d0c-4729-8d1b-f4c229283bb01496.png", "Flashover : embrasement généralisé 600-800°C", "BBC"],
        backdraft: [B + "5012034df-1d0c-4729-8d1b-f4c229283bb05712.png", "Colonne de fumée dense nocturne : combustion incomplète, risque backdraft", "IOL"],
        rollover: [B + "1012034df-1d0c-4729-8d1b-f4c229283bb02076.png", "Véhicule embrasé en milieu urbain : langues de feu et rayonnement", "StockCake"],
        oil_puddle: [B + "2012034df-1d0c-4729-8d1b-f4c229283bb02696.png", "Moteur : durites d'huile et carburant au-dessus des points chauds", "Dreamstime"],
        exhaust_smoke: [B + "5012034df-1d0c-4729-8d1b-f4c229283bb05712.png", "Fumées d'incendie véhicule : produits de combustion incomplets", "IOL"],
        exhaust_hot: [B + "6012034df-1d0c-4729-8d1b-f4c229283bb06248.png", "Collecteur + catalyseur : colorations thermiques bleues/or (400-900°C)", "eBay Auto"],
        catalyst_glow: [B + "6012034df-1d0c-4729-8d1b-f4c229283bb06248.png", "Catalyseur : organe chaud 500-900°C, source d'inflammation", "eBay Auto"],
        dpf_regen: [B + "2012034df-1d0c-4729-8d1b-f4c229283bb08185.png", "FAP/catalyseur déposé : régénération 600-1200°C, suie interne", "eBay Auto"],
        gdi_pump: [B + "3012034df-1d0c-4729-8d1b-f4c229283bb03746.png", "Manomètre de pression carburant : GDI 150-350 bar, diesel CR 1600-2500 bar", "Reddit Mechanic"],
        coolant_leak: [B + "3012034df-1d0c-4729-8d1b-f4c229283bb08650.png", "Vase d'expansion LDR rose (glycol) : fuite possible sur échappement ~400°C", "Cars.com"],
        seat_foam: [B + "0012034df-1d0c-4729-8d1b-f4c229283bb04654.png", "Habitacle en feu : mousses PU de sièges = combustible majeur (CO + HCN)", "Vecteezy"],
        garage_fire: [B + "4012034df-1d0c-4729-8d1b-f4c229283bb04328.png", "Propagation entre véhicules stationnés : espacement <1 m = contamination", "The Mirror"],
        pack_teardown: [B + "5012034df-1d0c-4729-8d1b-f4c229283bb09329.png", "Armoire de puissance ouverte : inspection interne AVANT manipulation (HT)", "Aerosol Suppression"],
        ccs_connector: [B + "6012034df-1d0c-4729-8d1b-f4c229283bb01546.png", "Connecteur de charge branché : broches, HVIL, risque arc si contamination", "Unsplash"],
        rodent_damage: [B + "5012034df-1d0c-4729-8d1b-f4c229283bb05828.png", "Torons sectionnés : rongeurs ou usure mécanique = amorçage", "Citizen Digital"],
        tire_burn: [B + "0012034df-1d0c-4729-8d1b-f4c229283bb04727.png", "Véhicule totalement embrasé : pneus et polymères en phase décroissante", "Envato"],
        engine_burnt: [B + "6012034df-1d0c-4729-8d1b-f4c229283bb05987.png", "Feu de compartiment moteur en extinction : aluminium fondu, mousses", "LION Smart"],
        engine_melted_wires: [B + "6012034df-1d0c-4729-8d1b-f4c229283bb03502.png", "Cuivre recuit et oxydé après feu : comparaison avant/après thermique", "Nature"],
        car_fire_road: [B + "0012034df-1d0c-4729-8d1b-f4c229283bb04654.png", "Incendie véhicule capot ouvert : départ compartiment moteur", "Vecteezy"],
        chemical_sparks: [B + "2012034df-1d0c-4729-8d1b-f4c229283bb01498.png", "Réaction exothermique violente avec projections (test haute énergie)", "Sandia"],
        chemical_flame: [B + "2012034df-1d0c-4729-8d1b-f4c229283bb09565.png", "Séquence de flammes : combustion et dégazage inflammable", "ScienceDirect"],
        fire_triangle: [B + "5012034df-1d0c-4729-8d1b-f4c229283bb09055.png", "Tétraèdre du feu et lecture des traces (doctrine NFPA 921)", "Fire Training"],
        battery_runaway: [B + "6012034df-1d0c-4729-8d1b-f4c229283bb05809.png", "Caméra thermique : cellule Li-ion en emballement (>200°C au cœur)", "TYCORUN"],
        battery_burnt: [B + "4012034df-1d0c-4729-8d1b-f4c229283bb03136.png", "Banc d'essai post-runaway : pack éventré, dépôts d'électrolyte", "Fire Safety Search"],
        plane_battery_fire: [B + "2012034df-1d0c-4729-8d1b-f4c229283bb09565.png", "Jet-fire Li-ion : flamme directionnelle 800-1400°C", "ScienceDirect"],
        ev_charging_fire: [B + "2012034df-1d0c-4729-8d1b-f4c229283bb04210.png", "Explosion de point de charge : véhicule et bâtiment soufflés", "CSR Journal"],
        ev_wrecks: [B + "2012034df-1d0c-4729-8d1b-f4c229283bb04210.png", "Épave de VE après incendie batterie : structure calcinée", "CSR Journal"],
        ev_port_fire: [B + "4012034df-1d0c-4729-8d1b-f4c229283bb04855.png", "Borne de charge détruite et balisée : défaut de charge HT", "CTV News"],
        ev_reignition: [B + "0012034df-1d0c-4729-8d1b-f4c229283bb02288.png", "Zone balisée après feu de borne : surveillance ré-ignition obligatoire", "Patch"],
        liion_cell: [B + "3012034df-1d0c-4729-8d1b-f4c229283bb08916.png", "Niveaux de test UL 9540A : cellule, module, pack, installation", "Anern"],
        heat_colors: [B + "6012034df-1d0c-4729-8d1b-f4c229283bb06248.png", "Colorations de chauffe permanentes sur inox (bleu, or, violet)", "eBay Auto"],
        steel_samples: [B + "2012034df-1d0c-4729-8d1b-f4c229283bb08185.png", "Collecteur décoloré par la température : lecture métallographique", "eBay Auto"],
        aluminum_melt: [B + "6012034df-1d0c-4729-8d1b-f4c229283bb05987.png", "Aluminium fondu (660°C) dans un moteur incendié", "LION Smart"],
        investigation_kit: [B + "0012034df-1d0c-4729-8d1b-f4c229283bb02615.png", "Équipe d'investigation en EPI : relevé et échantillonnage", "AGI Forensic"],
        smoker_car: [B + "0012034df-1d0c-4729-8d1b-f4c229283bb04654.png", "Feu d'habitacle : mégot, chargeur ou siège chauffant en cause", "Vecteezy"],
        smoke_toxicity: [B + "5012034df-1d0c-4729-8d1b-f4c229283bb05712.png", "Fumées toxiques : CO, HCN, HF (Li-ion), HCl (PVC)", "IOL"],
        ppe_ari: [B + "0012034df-1d0c-4729-8d1b-f4c229283bb02288.png", "EPI + ARI obligatoires sur feu de VE (HF) et feux confinés", "Patch"]
    };
    for (const k in R) {
        PHOTOS[k] = { url: R[k][0], caption: R[k][1], credit: R[k][2] };
    }
    console.log("✅ Photos réelles injectées :", Object.keys(R).length, "clés");
})();
