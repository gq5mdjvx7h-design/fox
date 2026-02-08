/* ============================================================
   FOX ENGINE — CORE SYSTEM
   Initialisation du moteur, fusion des données, 

let FOX_ENGINE = {
  ready: false,
  mergedData: null
};

/* ============================================================
   Initialisation principale
============================================================ */
alert("CORE START");
alert("DEMO MODE TYPE = " + typeof FOX_DEMO_MODE);

alert("TEST 1");
let merged;
alert("TEST 2");

if (FOX_DEMO_MODE) {
    alert("TEST 3");
    merged = foxLoadDemoData();
    alert("TEST 4");
} else {
    alert("TEST 5");
    merged = foxMergeData();
    alert("TEST 6");
}

alert("TEST 7");
foxInitGame(merged);
alert("TEST 8");

function foxInit() {
  foxLog("CORE", "Initialisation du moteur");
alert("DEMO MODE = " + FOX_DEMO_MODE);

  let merged;

if (typeof FOX_DEMO_MODE !== "undefined" && FOX_DEMO_MODE === true) {
    foxLog("CORE", "Mode DEMO activé");
    merged = foxLoadDemoData();
} else {
    merged = foxMergeData();
}


localStorage.clear();
foxLog("CORE", "Avant foxInitGame");
foxInitGame(merged);
foxLog("CORE", "Après foxInitGame");
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
