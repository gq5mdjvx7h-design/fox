// ===============================
//  FOX ENGINE – DEMO MODE (ORIGINAL FIXED)
// ===============================

// Toujours défini AVANT toute utilisation
const FOX_DEMO_MODE = true;

/**
 * Génère des données de démonstration réalistes
 * pour module1 et module2.
 */
function foxLoadDemoData() {

  const years = {};
  const yearList = [2024, 2025, 2026];

  for (const year of yearList) {
    years[year] = { months: {} };

    for (let m = 1; m <= 12; m++) {
      const monthKey = String(m).padStart(2, "0");

      // Données réalistes mais stables
      const base = 120 + Math.floor(Math.random() * 40);
      const h25 = Math.floor(Math.random() * 10);
      const h50 = Math.floor(Math.random() * 6);

      // Variations spéciales
      if (m === 7 || m === 12) {
        years[year].months[monthKey] = {
          total: base + 40,
          h25: h25 + 5,
          h50: h50 + 3
        };
      } else if (m === 2 || m === 11) {
        years[year].months[monthKey] = {
          total: base - 30,
          h25,
          h50
        };
      } else {
        years[year].months[monthKey] = {
          total: base,
          h25,
          h50
        };
      }
    }
  }

  // Structure EXACTE attendue par ton moteur
  return {
    module1: { years },
    module2: { years },
    lastSync: new Date().toISOString()
  };
}
