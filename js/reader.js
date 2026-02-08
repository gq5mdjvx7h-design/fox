/* ============================================================
   FOX ENGINE — DATA READER
   Lecture seule des modules 1 et 2
============================================================ */

/* ============================================================
   Chargement brut depuis localStorage
============================================================ */

function foxReadRaw(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    foxLog("ERROR", "Lecture impossible pour " + key, e);
    return null;
  }
}

/* ============================================================
   Lecture du module 1 (compteur annuel)
============================================================ */

function foxReadModule1() {
  const data = foxReadRaw("HEURES_DATA");

  if (!data) {
    foxLog("INFO", "Module 1 non trouvé");
    return null;
  }

  foxLog("LOAD", "Module 1 chargé", data);

  return {
    type: "module1",
    years: data
  };
}

/* ============================================================
   Lecture du module 2 (mensualisé)
============================================================ */

function foxReadModule2() {
  const data = foxReadRaw("PAYE_DATA");

  if (!data) {
    foxLog("INFO", "Module 2 non trouvé");
    return null;
  }

  foxLog("LOAD", "Module 2 chargé", data);

  return {
    type: "module2",
    years: data
  };
}

/* ============================================================
   Fusion des données (lecture seule)
   ⚠️ Version corrigée : NE PAS ÉCRASER LE MODE DÉMO
============================================================ */

function foxMergeData() {

  // 🔥 IMPORTANT :
  // Si le mode DEMO est actif, on NE fusionne PAS les données réelles.
  // On laisse core.js utiliser foxLoadDemoData().
  if (typeof FOX_DEMO_MODE !== "undefined" && FOX_DEMO_MODE === true) {
    foxLog("MERGE", "Mode DEMO actif — fusion ignorée");
    return null; 
  }

  const m1 = foxReadModule1();
  const m2 = foxReadModule2();

  const merged = {
    module1: m1,
    module2: m2,
    lastSync: new Date().toISOString()
  };

  foxLog("MERGE", "Fusion des données terminée", merged);
  foxMark("Fusion terminée");

  return merged;
}
