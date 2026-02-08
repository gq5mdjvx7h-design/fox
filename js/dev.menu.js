// ===============================
//  FOX ENGINE – DEV MENU (API développeur)
// ===============================

window.DEV = {
  // -----------------------------
  // XP & LEVEL
  // -----------------------------
  xp(amount = 1000) {
    if (!STATE) return;
    STATE.xp += amount;
    STATE.totalXP += amount;
    console.log(`+${amount} XP ajouté`);
  },

  level(amount = 1) {
    if (!STATE) return;
    STATE.level += amount;
    console.log(`Niveau +${amount}`);
  },

  // -----------------------------
  // BADGES
  // -----------------------------
  badges: {
    unlockAll() {
      if (!STATE) return;
      STATE.unlockedBadges = BADGES.map(b => b.id);
      console.log("Tous les badges débloqués");
    },
    reset() {
      if (!STATE) return;
      STATE.unlockedBadges = [];
      console.log("Badges réinitialisés");
    }
  },

  // -----------------------------
  // SCÉNARIOS
  // -----------------------------
  scenarios: {
    run(id) {
      const scn = FOX_SCENARIOS.find(s => s.id === id);
      if (!scn) return console.warn("Scénario introuvable:", id);

      console.log("▶️ Exécution scénario :", scn);
      return scn;
    },
    reset() {
      if (!STATE) return;
      STATE.completedMilestones = [];
      console.log("Scénarios réinitialisés");
    }
  },

  // -----------------------------
  // TEMPS / SIMULATION
  // -----------------------------
  time: {
    addDays(n = 1) {
      if (!STATE) return;
      const d = new Date(STATE.lastDayDate || new Date());
      d.setDate(d.getDate() + n);
      STATE.lastDayDate = d.toISOString();
      console.log(`+${n} jours simulés`);
    },
    addWeeks(n = 1) {
      this.addDays(n * 7);
    },
    addMonths(n = 1) {
      if (!STATE) return;
      const d = new Date(STATE.lastDayDate || new Date());
      d.setMonth(d.getMonth() + n);
      STATE.lastDayDate = d.toISOString();
      console.log(`+${n} mois simulés`);
    }
  },

  // -----------------------------
  // STATE
  // -----------------------------
  state: {
    reset() {
      STATE = getDefaultState();
      console.log("STATE réinitialisé");
    },
    export() {
      console.log("Export STATE:", JSON.stringify(STATE, null, 2));
    },
    import(json) {
      try {
        STATE = JSON.parse(json);
        console.log("STATE importé");
      } catch (e) {
        console.error("Erreur import:", e);
      }
    }
  },

  // -----------------------------
  // MODULES
  // -----------------------------
  modules: {
    m1() {
      console.log("Module 1:", MODULE1_API.getAnnualData());
    },
    m2() {
      console.log("Module 2:", MODULE2_API.getCurrentExercise());
    },
    bridges() {
      console.log("Bridges:", MODULE_BRIDGES.checkAvailability());
    }
  },

  // -----------------------------
  // GOD MODE
  // -----------------------------
  godMode() {
    console.log("🔥 GOD MODE ACTIVÉ");
    this.xp(999999);
    this.level(50);
    this.badges.unlockAll();
    this.time.addMonths(12);
  }
};
