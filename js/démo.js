/* ============================================================
   FOX ENGINE — DEMO MODE (Ultra complet, 3 ans, profil mixte)
============================================================ */

const FOX_DEMO_MODE = true;

/* ============================================================
   Génération de données réalistes
============================================================ */

function foxLoadDemoData() {
  const years = {};

  const yearList = [2024, 2025, 2026];

  for (const year of yearList) {
    years[year] = {
      months: {}
    };

    for (let m = 1; m <= 12; m++) {
      const monthKey = String(m).padStart(2, "0");

      // Variations réalistes
      const base = 120 + Math.floor(Math.random() * 40); // heures normales
      const h25 = Math.floor(Math.random() * 10);        // heures 25%
      const h50 = Math.floor(Math.random() * 6);         // heures 50%

      // Pics d’activité
      if (m === 7 || m === 12) {
        // été + décembre
        years[year].months[monthKey] = {
          total: base + 40,
          h25: h25 + 5,
          h50: h50 + 3
        };
      }
      // Mois faibles
      else if (m === 2 || m === 11) {
        years[year].months[monthKey] = {
          total: base - 30,
          h25: h25,
          h50: h50
        };
      }
      // Mois normaux
      else {
        years[year].months[monthKey] = {
          total: base,
          h25: h25,
          h50: h50
        };
      }
    }
  }

  return {
    module1: { years },
    module2: { years },
    lastSync: new Date().toISOString()
  };
}
