/* ============================================================
   FOX ENGINE — LEAGUES SYSTEM
   Structure vide pour accueillir 10 ligues
============================================================ */

const FOX_LEAGUES = [
  // On remplira plus tard
];

/* ============================================================
   Détermination de la ligue actuelle
============================================================ */

function foxGetLeague(game) {
  let current = FOX_LEAGUES[0] || null;

  for (const league of FOX_LEAGUES) {
    if (league.minXP !== undefined && game.xp >= league.minXP) {
      current = league;
    }
  }

  return current;
}
