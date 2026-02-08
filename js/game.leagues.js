// ===============================
//  FOX ENGINE – LEAGUES (ORIGINAL FIXED)
// ===============================

/**
 * Classement en ligues basé sur l'XP.
 * 
 * xp = number
 */

function foxLeagueEngine(xp) {
  if (typeof xp !== "number" || xp < 0) {
    console.warn("foxLeagueEngine: XP invalide");
    return "Non classé";
  }

  // Ligues progressives
  if (xp < 1000) {
    return "Bronze";
  }
  if (xp < 3000) {
    return "Argent";
  }
  if (xp < 6000) {
    return "Or";
  }
  if (xp < 10000) {
    return "Platine";
  }
  if (xp < 15000) {
    return "Diamant";
  }

  return "Maître";
}
