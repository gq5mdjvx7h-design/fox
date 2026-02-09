// ============================================================
//  FOX ENGINE 9.0 — XP ENGINE
// ============================================================

// ------------------------------------------------------------
// 1. Table XP par niveau
// ------------------------------------------------------------
// Formule simple : XP nécessaire = 100 * niveau
// (modifiable plus tard si tu veux une courbe plus dure)
function getXPForLevel(level) {
  return level * 100;
}

// ------------------------------------------------------------
// 2. Calcul du niveau depuis l’XP total
// ------------------------------------------------------------
function calculateLevelFromXP(xp) {
  let level = 1;
  while (xp >= getXPForLevel(level)) {
    xp -= getXPForLevel(level);
    level++;
  }
  return level;
}

// ------------------------------------------------------------
// 3. Ajout d’XP
// ------------------------------------------------------------
function addXP(amount) {
  if (amount <= 0) return;

  STATE.xp += amount;

  const oldLevel = STATE.level;
  const newLevel = calculateLevelFromXP(STATE.xp);

  STATE.level = newLevel;

  // Level-up détecté
  if (newLevel > oldLevel) {
    onLevelUp(newLevel);
  }

  saveState();
}

// ------------------------------------------------------------
// 4. Retrait d’XP
// ------------------------------------------------------------
function removeXP(amount) {
  if (amount <= 0) return;

  STATE.xp = Math.max(0, STATE.xp - amount);
  STATE.level = calculateLevelFromXP(STATE.xp);

  saveState();
}

// ------------------------------------------------------------
// 5. Callback Level-Up
// ------------------------------------------------------------
function onLevelUp(level) {
  console.log("🎉 Level UP ! Nouveau niveau :", level);

  // Ici tu pourras ajouter :
  // - animation UI
  // - badge automatique
  // - trophée
  // - message IA
  // - vibration mobile
}

// ------------------------------------------------------------
// 6. Réinitialisation XP
// ------------------------------------------------------------
function resetXP() {
  STATE.xp = 0;
  STATE.level = 1;
  saveState();
}

// ------------------------------------------------------------
// 7. API publique
// ------------------------------------------------------------
const XP = {
  add: addXP,
  remove: removeXP,
  reset: resetXP,
  getXPForLevel,
  calculateLevelFromXP
};

console.log("[XP] XP Engine 9.0 chargé.");
