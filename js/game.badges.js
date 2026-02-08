// ===============================
//  FOX ENGINE – BADGES (ORIGINAL FIXED)
// ===============================

/**
 * Système de badges basé sur les totaux et l'XP.
 * 
 * totals = {
 *   totalHours: number,
 *   totalH25: number,
 *   totalH50: number
 * }
 * 
 * xp = number
 */

function foxBadgeEngine(totals, xp) {
  if (!totals) {
    console.warn("foxBadgeEngine: totals manquant");
    return [];
  }

  const badges = [];

  // Badge 1 : Volume total
  if (totals.totalHours >= 500) {
    badges.push("Travailleur");
  }
  if (totals.totalHours >= 1000) {
    badges.push("Marathonien");
  }
  if (totals.totalHours >= 2000) {
    badges.push("Machine");
  }

  // Badge 2 : Heures 25%
  if (totals.totalH25 >= 50) {
    badges.push("Nocturne");
  }
  if (totals.totalH25 >= 150) {
    badges.push("Insomniaque");
  }

  // Badge 3 : Heures 50%
  if (totals.totalH50 >= 30) {
    badges.push("Survivant");
  }
  if (totals.totalH50 >= 100) {
    badges.push("Titan");
  }

  // Badge 4 : XP
  if (xp >= 3000) {
    badges.push("Confirmé");
  }
  if (xp >= 8000) {
    badges.push("Expert");
  }
  if (xp >= 15000) {
    badges.push("Légende");
  }

  return badges;
}
