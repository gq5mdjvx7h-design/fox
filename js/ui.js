// ===============================
//  FOX ENGINE – UI (ORIGINAL FIXED)
// ===============================

/**
 * Affiche l'interface complète à partir de gameState.
 */
function foxRenderUI(gameState) {
  if (!gameState) {
    console.error("foxRenderUI: gameState manquant");
    return;
  }

  const app = document.querySelector("#app");
  if (!app) {
    console.error("foxRenderUI: élément #app introuvable");
    return;
  }

  const totals = gameState.totals || { totalHours: 0, totalH25: 0, totalH50: 0 };
  const badges = gameState.badges || [];
  const league = gameState.league || "Non classé";

  app.innerHTML = `
    <section class="summary">
      <h2>Résumé général</h2>
      <p><strong>Dernière synchro :</strong> ${new Date(gameState.lastSync).toLocaleString()}</p>
      <p><strong>Ligue :</strong> ${league}</p>
    </section>

    <section class="stats">
      <h2>Statistiques</h2>
      <p><strong>Heures totales :</strong> ${totals.totalHours}</p>
      <p><strong>Heures 25% :</strong> ${totals.totalH25}</p>
      <p><strong>Heures 50% :</strong> ${totals.totalH50}</p>
    </section>

    <section class="progress">
      <h2>Progression</h2>
      <p><strong>XP :</strong> ${gameState.xp}</p>
      <p><strong>Niveau :</strong> ${gameState.level}</p>
    </section>

    <section class="badges">
      <h2>Badges</h2>
      ${
        badges.length === 0
          ? "<p>Aucun badge pour le moment.</p>"
          : `<ul>${badges.map(b => `<li>${b}</li>`).join("")}</ul>`
      }
    </section>
  `;
}

/**
 * Initialise l'UI à partir des données fusionnées.
 */
function foxInitUI(merged) {
  foxLog("UI", "Initialisation de l'interface");

  let gameState = foxLoadStorage();

  // Si aucune sauvegarde → on calcule un nouvel état
  if (!gameState) {
    foxLog("UI", "Aucune sauvegarde trouvée, création d'un nouvel état");
    gameState = foxInitGame(merged);
  }

  foxRenderUI(gameState);
}
