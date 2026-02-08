// ===============================
//  FOX ENGINE – DEV MENU UI (Panneau latéral)
// ===============================

(function() {

  // Création du panneau
  const panel = document.createElement("div");
  panel.id = "devPanelUI";
  panel.classList.add("dev-panel", "hidden");

  panel.innerHTML = `
    <div class="dev-header">
      <span>🛠️ Mode Développeur</span>
      <button id="devCloseBtn">✖</button>
    </div>

    <div class="dev-tabs">
      <button data-tab="xp">XP</button>
      <button data-tab="badges">Badges</button>
      <button data-tab="scenarios">Scénarios</button>
      <button data-tab="time">Temps</button>
      <button data-tab="state">State</button>
      <button data-tab="modules">Modules</button>
      <button data-tab="god">GOD MODE</button>
    </div>

    <div class="dev-content">

      <div class="dev-tab" id="tab-xp">
        <h3>XP & Niveau</h3>
        <button onclick="DEV.xp(500)">+500 XP</button>
        <button onclick="DEV.xp(5000)">+5000 XP</button>
        <button onclick="DEV.level(1)">+1 Niveau</button>
        <button onclick="DEV.level(10)">+10 Niveaux</button>
      </div>

      <div class="dev-tab" id="tab-badges">
        <h3>Badges</h3>
        <button onclick="DEV.badges.unlockAll()">Débloquer tous</button>
        <button onclick="DEV.badges.reset()">Reset badges</button>
      </div>

      <div class="dev-tab" id="tab-scenarios">
        <h3>Scénarios</h3>
        <input id="scenarioIdInput" type="number" placeholder="ID scénario">
        <button onclick="DEV.scenarios.run(parseInt(document.getElementById('scenarioIdInput').value))">
          Exécuter scénario
        </button>
        <button onclick="DEV.scenarios.reset()">Reset scénarios</button>
      </div>

      <div class="dev-tab" id="tab-time">
        <h3>Simulation du temps</h3>
        <button onclick="DEV.time.addDays(1)">+1 jour</button>
        <button onclick="DEV.time.addDays(7)">+7 jours</button>
        <button onclick="DEV.time.addWeeks(4)">+4 semaines</button>
        <button onclick="DEV.time.addMonths(1)">+1 mois</button>
      </div>

      <div class="dev-tab" id="tab-state">
        <h3>STATE</h3>
        <button onclick="DEV.state.reset()">Reset complet</button>
        <button onclick="DEV.state.export()">Exporter STATE (console)</button>
        <textarea id="stateImportBox" placeholder="Colle un STATE ici"></textarea>
        <button onclick="DEV.state.import(document.getElementById('stateImportBox').value)">Importer</button>
      </div>

      <div class="dev-tab" id="tab-modules">
        <h3>Modules</h3>
        <button onclick="DEV.modules.m1()">Inspecter Module 1</button>
        <button onclick="DEV.modules.m2()">Inspecter Module 2</button>
        <button onclick="DEV.modules.bridges()">Inspecter Bridges</button>
      </div>

      <div class="dev-tab" id="tab-god">
        <h3>🔥 GOD MODE</h3>
        <button class="god-btn" onclick="DEV.godMode()">Activer GOD MODE</button>
      </div>

    </div>
  `;

  document.body.appendChild(panel);

  // Gestion des onglets
  const tabs = panel.querySelectorAll(".dev-tabs button");
  const contents = panel.querySelectorAll(".dev-tab");

  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;

      contents.forEach(c => c.style.display = "none");
      document.getElementById("tab-" + target).style.display = "block";
    });
  });

  // Bouton fermer
  document.getElementById("devCloseBtn").onclick = () => {
    panel.classList.add("hidden");
  };

  // Fonction globale pour ouvrir/fermer
  window.toggleDevPanel = function() {
    panel.classList.toggle("hidden");
  };

})();
