// ===============================
//  FOX ENGINE – GAME (ORIGINAL FIXED)
// ===============================

/**
 * Calcule les totaux d'heures à partir des données fusionnées.
 */
function foxComputeTotals(merged) {
  if (!merged || !merged.module1 || !merged.module1.years) {
    throw new Error("Données invalides dans foxComputeTotals");
  }

  let totalHours = 0;
  let totalH25 = 0;
  let totalH50 = 0;

  const years = merged.module1.years;

  for (const year of Object.keys(years)) {
    const months = years[year].months;

    for (const m of Object.keys(months)) {
      const data = months[m];

      totalHours += Number(data.total || 0);
      totalH25 += Number(data.h25 || 0);
      totalH50 += Number(data.h50 || 0);
    }
  }

  return { totalHours, totalH25, totalH50 };
}

/**
 * Calcule l'XP totale.
 */
function foxComputeXP(totals) {
  if (!totals) return 0;

  const xp =
    totals.totalHours * 10 +
    totals.totalH25 * 20 +
    totals.totalH50 * 30;

  return Math.round(xp);
}

/**
 * Calcule le niveau.
 */
function foxComputeLevel(xp) {
  if (!xp || xp < 0) return 1;
  return Math.floor(xp / 1000) + 1;
}

/**
 * Calcule les badges (délégué à game.badges.js)
 */
function foxComputeBadges(totals, xp) {
  if (typeof foxBadgeEngine !== "function") {
    console.warn("foxBadgeEngine manquant");
    return [];
  }

  return foxBadgeEngine(totals, xp);
}

/**
 * Calcule les ligues (délégué à game.leagues.js)
 */
function foxComputeLeague(xp) {
  if (typeof foxLeagueEngine !== "function") {
    console.warn("foxLeagueEngine manquant");
    return "Non classé";
  }

  return foxLeagueEngine(xp);
}

/**
 * Initialise l'état complet du jeu.
 */
function foxInitGame(merged) {
  foxLog("GAME", "Initialisation du moteur de jeu");

  const totals = foxComputeTotals(merged);
  const xp = foxComputeXP(totals);
  const level = foxComputeLevel(xp);
  const badges = foxComputeBadges(totals, xp);
  const league = foxComputeLeague(xp);

  const gameState = {
    totals,
    xp,
    level,
    badges,
    league,
    lastSync: merged.lastSync
  };

  foxSaveStorage(gameState);
  foxLog("GAME", "État final du jeu", gameState);

  return gameState;
}
