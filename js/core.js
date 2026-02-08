// ===============================
//  FOX ENGINE – CORE
//  Version 9.0 – Base propre et modulaire
// ===============================

// --------------------------------------
// 1) VARIABLES GLOBALES
// --------------------------------------

let STATE = null;
let PROFILE = null;
let ANNUAL_THRESHOLDS = null;

let ENGINE_READY = false;


// --------------------------------------
// 2) ÉTAT PAR DÉFAUT (STATE)
// --------------------------------------

function getDefaultState() {
  return {
    meta: {
      createdAt: new Date().toISOString(),
      lastPlayed: new Date().toISOString(),
      version: "9.0-fox-engine"
    },

    // Progression
    level: 1,
    xp: 0,
    totalXP: 0,

    // Statistiques globales
    totalDays: 0,
    totalHours: 0,
    calculations: 0,
    maxStreak: 0,
    currentStreak: 0,
    nightShifts: 0,
    weekendDays: 0,
    exports: 0,

    // Données journalières
    days: [],

    // Succès & progression
    unlockedBadges: [],
    trophies: { gold: 0, silver: 0, bronze: 0 },
    completedMilestones: [],

    // Scénarios
    scenarioHistory: [],
    scenarioTriggers: [],

    // Scores intelligents
    riskScore: 0,
    fatigueScore: 0,
    legalScore: 0,

    // Données temporelles
    lastDayDate: null,
    dayTypesWorked: [],

    // Flags internes
    totalXPInitialized: false,
    workMode: "sync",

    // Debug / Dev
    devFlags: {}
  };
}


// --------------------------------------
// 3) INITIALISATION DU MOTEUR
// --------------------------------------

function initEngine() {
  console.log("🦊 Initialisation du Fox Engine 9.0…");

  // Charger ou créer un STATE
  const saved = localStorage.getItem("FOX_ENGINE_STATE");

  if (saved) {
    try {
      STATE = JSON.parse(saved);
      console.log("📦 STATE chargé depuis le stockage local");
    } catch (e) {
      console.warn("⚠️ STATE corrompu, réinitialisation…");
      STATE = getDefaultState();
    }
  } else {
    console.log("📦 Aucun STATE trouvé, création d’un nouveau");
    STATE = getDefaultState();
  }

  ENGINE_READY = true;
  saveState();

  console.log("🦊 Fox Engine prêt.");
}


// --------------------------------------
// 4) SAUVEGARDE DU STATE
// --------------------------------------

function saveState() {
  if (!ENGINE_READY) return;
  try {
    localStorage.setItem("FOX_ENGINE_STATE", JSON.stringify(STATE));
  } catch (e) {
    console.error("❌ Impossible de sauvegarder le STATE :", e);
  }
}


// --------------------------------------
// 5) OUTILS GÉNÉRIQUES
// --------------------------------------

function addXP(amount) {
  if (!STATE) return;
  STATE.xp += amount;
  STATE.totalXP += amount;
  saveState();
}

function addDay(dayData) {
  if (!STATE) return;

  STATE.days.push(dayData);
  STATE.totalDays++;
  STATE.totalHours += dayData.hours || 0;

  STATE.lastDayDate = dayData.date;

  saveState();
}

function updateStreak(isWorkedDay) {
  if (!STATE) return;

  if (isWorkedDay) {
    STATE.currentStreak++;
    if (STATE.currentStreak > STATE.maxStreak) {
      STATE.maxStreak = STATE.currentStreak;
    }
  } else {
    STATE.currentStreak = 0;
  }

  saveState();
}


// --------------------------------------
// 6) CALCULS (placeholders prêts à remplir)
// --------------------------------------

function calculateDailyStats(day) {
  return {
    isNight: false,
    isWeekend: false,
    overtime: 0
  };
}

function calculateWeeklyStats(weekDays) {
  return {
    totalHours: 0,
    overtime: 0,
    legalIssues: []
  };
}

function calculateScores() {
  STATE.riskScore = 0;
  STATE.fatigueScore = 0;
  STATE.legalScore = 0;
  saveState();
}


// --------------------------------------
// 7) SCÉNARIOS
// --------------------------------------

function triggerScenario(id, data = {}) {
  STATE.scenarioHistory.push({
    id,
    date: new Date().toISOString(),
    data
  });

  saveState();
}


// --------------------------------------
// 8) BADGES
// --------------------------------------

function unlockBadge(id) {
  if (!STATE.unlockedBadges.includes(id)) {
    STATE.unlockedBadges.push(id);
    saveState();
  }
}


// --------------------------------------
// 9) EXPORT / IMPORT
// --------------------------------------

function exportState() {
  return JSON.stringify(STATE, null, 2);
}

function importState(json) {
  try {
    STATE = JSON.parse(json);
    saveState();
    return true;
  } catch (e) {
    console.error("❌ Import STATE échoué :", e);
    return false;
  }
}


// --------------------------------------
// 10) LANCEMENT AUTOMATIQUE
// --------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  initEngine();
});
