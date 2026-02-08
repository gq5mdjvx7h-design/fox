/* ============================================================
   FOX ENGINE — BADGES SYSTEM
   Structure vide pour accueillir 50 badges
============================================================ */

const FOX_BADGES = [
  // On remplira plus tard
];

/* ============================================================
   Vérification des badges
============================================================ */

function foxEvaluateBadges(game, merged) {
  const unlocked = [];

  for (const badge of FOX_BADGES) {
    try {
      if (badge.condition && badge.condition(game, merged)) {
        unlocked.push(badge.name);
      }
    } catch (e) {
      foxLog("ERROR", "Erreur dans un badge", badge);
    }
  }

  return unlocked;
}
