// ===============================
//  FOX ENGINE – DEMO MODE (CLEAN)
// ===============================

const FOX_DEMO_MODE = true;

function foxLoadDemoData() {

  const years = {};
  const yearList = [2024, 2025, 2026];

  for (const year of yearList) {
    years[year] = { months: {} };

    for (let m = 1; m <= 12; m++) {
      const monthKey = String(m).padStart(2, "0");

      years[year].months[monthKey] = {
        total: 150,
        h25: 5,
        h50: 2
      };
    }
  }

  return {
    module1: { years },
    module2: { years },
    lastSync: new Date().toISOString()
  };
}
