// ===============================
//  FOX ENGINE – CORE (ORIGINAL FIXED)
// ===============================

function foxInit() {
  foxLog("CORE", "Initialisation du moteur");

  let merged = null;

  try {
    // Mode démo ou mode réel
    if (typeof FOX_DEMO_MODE !== "undefined" && FOX_DEMO_MODE === true) {
      foxLog("CORE", "Mode démo activé");
      merged = foxLoadDemoData();
    } else {
      foxLog("CORE", "Mode réel activé");
      merged = foxMergeData();
    }

    // Vérification sécurité
    if (!merged) {
      throw new Error("Merged data est null ou undefined");
    }

    foxLog("CORE", "Données fusionnées", merged);

    // Initialisation du moteur
    foxInitGame(merged);
    foxInitUI(merged);

  } catch (err) {
    console.error("Erreur dans foxInit :", err);

    const app = document.querySelector("#app");
    if (app) {
      app.innerHTML = `
        <div class="error">
          Une erreur est survenue lors du chargement du moteur.<br>
          ${err.message}
        </div>
      `;
    }
  }
}

// Lancement automatique
document.addEventListener("DOMContentLoaded", foxInit);
