// ===============================
//  FOX ENGINE – CORE (CLEAN)
// ===============================

async function foxInit() {
  try {
    // Chargement du stockage interne
    foxInitStorage();

    // Mode démo activé
    const merged = foxLoadDemoData();

    // Initialisation du moteur
    foxInitGame(merged);
    foxInitUI(merged);

  } catch (err) {
    console.error("Erreur dans foxInit :", err);
    document.querySelector("#app").innerHTML = `
      <div class="error">
        Une erreur est survenue lors du chargement du moteur.
      </div>
    `;
  }
}

// Lancement automatique
document.addEventListener("DOMContentLoaded", foxInit);
