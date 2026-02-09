// ============================================================
//  FOX ENGINE 9.0 — STATE ENGINE
//  Gestion du stockage, cohérence interne, versioning
// ============================================================

const STATE_VERSION = 1;

// ------------------------------------------------------------
// 1. Structure par défaut
// ------------------------------------------------------------
function getDefaultState() {
  return {
    version: STATE_VERSION,

    // Jours saisis
    days: [],               // { id, date, hours, type }

    // Stats globales
    totalDays: 0,
    totalHours: 0,
    nightShifts: 0,
    weekendDays: 0,
    calculations: 0,

    // Streaks
    currentStreak: 0,
    maxStreak: 0,
    dayTypesWorked: new Set(),

    // XP & progression
    xp: 0,
    level: 1,

    // Badges & trophées
    unlockedBadges: [],
    trophies: { gold: 0, silver: 0, bronze: 0 },

    // Milestones
    completedMilestones: [],

    // IA
    ai: null,
    aiHistory: [],

    // Exports
    exports: 0
  };
}

// ------------------------------------------------------------
// 2. Chargement depuis localStorage
// ------------------------------------------------------------
function loadState() {
  try {
    const raw = localStorage.getItem("FOX_STATE");
    if (!raw) return getDefaultState();

    const parsed = JSON.parse(raw);

    // Restaurer les Sets
    if (parsed.dayTypesWorked && Array.isArray(parsed.dayTypesWorked)) {
      parsed.dayTypesWorked = new Set(parsed.dayTypesWorked);
    }

    return parsed;
  } catch (e) {
    console.warn("Erreur chargement STATE :", e);
    return getDefaultState();
  }
}

// ------------------------------------------------------------
// 3. Sauvegarde dans localStorage
// ------------------------------------------------------------
function saveState() {
  try {
    const copy = structuredClone(STATE);

    // Convertir Set → Array
    if (copy.dayTypesWorked instanceof Set) {
      copy.dayTypesWorked = Array.from(copy.dayTypesWorked);
    }

    localStorage.setItem("FOX_STATE", JSON.stringify(copy));
  } catch (e) {
    console.warn("Erreur sauvegarde STATE :", e);
  }
}

// ------------------------------------------------------------
// 4. Reset complet
// ------------------------------------------------------------
function resetState() {
  STATE = getDefaultState();
  saveState();
}

// ------------------------------------------------------------
// 5. Recalcul global (cohérence interne)
// ------------------------------------------------------------
function recalcState() {
  STATE.totalDays = STATE.days.length;
  STATE.totalHours = STATE.days.reduce((s, d) => s + d.hours, 0);

  STATE.nightShifts = STATE.days.filter(d => d.type === "nuit").length;
  STATE.weekendDays = STATE.days.filter(d => d.type === "saturday" || d.type === "sunday").length;

  STATE.dayTypesWorked = new Set(STATE.days.map(d => d.type));

  // Ces fonctions seront définies dans leurs modules respectifs
  if (typeof recalculateStreak === "function") recalculateStreak();
  if (typeof recalculateTrophies === "function") recalculateTrophies();
}

// ------------------------------------------------------------
// 6. Initialisation globale
// ------------------------------------------------------------
let STATE = loadState();
recalcState();
saveState();
