/* ============================================================
   FOX ENGINE — CORE SYSTEM
   Initialisation du moteur, fusion des données, orchestration
============================================================ */

let FOX_ENGINE = {
  ready: false,
  mergedData: null
};

/* ============================================================
   Initialisation principale
============================================================ */

function foxInit() {
  foxLog("CORE", "Initialisation du moteur");

  let merged;

if (typeof FOX_DEMO_MODE !== "undefined" && FOX_DEMO_MODE === true) {
    foxLog("CORE", "Mode DEMO activé");
    merged = foxLoadDemoData();
} else {
    merged = foxMergeData();
}


localStorage.clear();
foxInitGame(merged);
foxInitUI(merged);
}


/* ============================================================
   Rafraîchissement manuel (si besoin)
============================================================ */

function foxRefresh() {
  foxLog("REFRESH", "Rafraîchissement manuel demandé");

  const merged = foxMergeData();
  FOX_ENGINE.mergedData = merged;

  foxInitGame(merged);
  foxInitUI(merged);

  foxMark("Rafraîchissement terminé");
}

/* ============================================================
   Auto-démarrage
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  foxInit();
});
