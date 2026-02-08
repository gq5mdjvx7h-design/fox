// ===============================
//  FOX ENGINE – MODULES BRIDGES
//  (Reconstruction propre du fichier original)
// ===============================

// --------------------------------------
//  MODULE 1 – Lecture annuelle
// --------------------------------------

const MODULE1_API = {
  getAnnualData() {
    try {
      const STORAGE_PREFIX = "CA_HS_TRACKER_V1";
      const currentYear = new Date().getFullYear();
      const yearKey = `${STORAGE_PREFIX}_DATA_${currentYear}`;
      const rawData = localStorage.getItem(yearKey);

      if (!rawData) {
        return {
          available: false,
          year: currentYear,
          totalHours: 0,
          carry: 0,
          months: []
        };
      }

      const yearData = JSON.parse(rawData);
      let totalHours = 0;
      let latestCarry = 0;
      const months = [];

      Object.entries(yearData)
        .filter(([key]) => /^\d{4}-\d{2}$/.test(key))
        .sort(([a], [b]) => a.localeCompare(b))
        .forEach(([monthKey, monthData]) => {
          const periodHours = this._getPeriodHours(monthKey, yearData);
          totalHours += periodHours;
          latestCarry = monthData.carry || 0;

          months.push({
            key: monthKey,
            periodHours,
            paid: monthData.paid || 0,
            carry: monthData.carry || 0,
            closing: monthData.closing
          });
        });

      return {
        available: true,
        year: currentYear,
        totalHours: totalHours.toFixed(2),
        carry: latestCarry.toFixed(2),
        months
      };
    } catch (e) {
      console.warn("⚠️ Erreur lecture Module 1:", e);
      return { available: false, error: e.message };
    }
  },

  _getPeriodHours(monthKey, yearData) {
    const { start, end } = this._getPeriodBounds(monthKey, yearData);
    let total = 0;

    Object.entries(yearData).forEach(([key, month]) => {
      if (!/^\d{4}-\d{2}$/.test(key)) return;

      Object.entries(month.days || {}).forEach(([d, h]) => {
        const [y, m] = key.split("-").map(Number);
        const date = new Date(y, m - 1, d);

        if (date >= start && date <= end) {
          total += h;
        }
      });
    });

    return total;
  },

  _getPeriodBounds(monthKey, yearData) {
    const [y, m] = monthKey.split("-").map(Number);
    const currentMonth = yearData[monthKey];

    if (!currentMonth) {
      return {
        start: new Date(y, m - 1, 1),
        end: new Date(y, m, 0)
      };
    }

    const prevMonthDate = new Date(y, m - 2, 1);
    const prevKey =
      prevMonthDate.getFullYear() +
      "-" +
      String(prevMonthDate.getMonth() + 1).padStart(2, "0");

    const prevMonth = yearData[prevKey];

    let start;
    if (prevMonth && typeof prevMonth.closing === "number") {
      start = new Date(
        prevMonthDate.getFullYear(),
        prevMonthDate.getMonth(),
        prevMonth.closing + 1
      );
    } else {
      start = new Date(y, m - 1, 1);
    }

    const closing = currentMonth.closing || this._getLastSunday(y, m - 1);
    const end = new Date(y, m - 1, closing);

    return { start, end };
  },

  _getLastSunday(year, monthIndex) {
    const lastDay = new Date(year, monthIndex + 1, 0);
    const day = lastDay.getDay();
    const diff = day === 0 ? 0 : day;
    lastDay.setDate(lastDay.getDate() - diff);
    return lastDay.getDate();
  },

  getIndividualDays() {
    try {
      const STORAGE_PREFIX = "CA_HS_TRACKER_V1";
      const currentYear = new Date().getFullYear();
      const yearKey = `${STORAGE_PREFIX}_DATA_${currentYear}`;
      const rawData = localStorage.getItem(yearKey);

      if (!rawData) return [];

      const yearData = JSON.parse(rawData);
      const days = [];

      Object.entries(yearData)
        .filter(([key]) => /^\d{4}-\d{2}$/.test(key))
        .forEach(([monthKey, monthData]) => {
          const [y, m] = monthKey.split("-").map(Number);

          Object.entries(monthData.days || {}).forEach(([day, hours]) => {
            const h = parseFloat(hours);
            if (h > 0) {
              days.push({
                date: `${y}-${String(m).padStart(2, "0")}-${String(
                  parseInt(day)
                ).padStart(2, "0")}`,
                hours: h
              });
            }
          });
        });

      return days;
    } catch (e) {
      console.warn("Erreur lecture jours Module 1:", e);
      return [];
    }
  }
};

// --------------------------------------
//  MODULE 2 – Exercice comptable
// --------------------------------------

const MODULE2_API = {
  getCurrentExercise() {
    try {
      const activeSuffix =
        localStorage.getItem("ACTIVE_YEAR_SUFFIX") ||
        new Date().getFullYear();

      const suffix = String(activeSuffix);

      const data = JSON.parse(
        localStorage.getItem("DATA_REPORT_" + suffix) || "{}"
      );
      const closures = JSON.parse(
        localStorage.getItem("CLOSURES_REPORT_" + suffix) || "[]"
      );
      const exerciseStart =
        localStorage.getItem("EXERCISE_START_" + suffix) || "";
      const baseHebdo =
        Number(localStorage.getItem("BASE_HEBDO_" + suffix)) || 35;

      return {
        available: Object.keys(data).length > 0,
        exercise: suffix,
        exerciseStart,
        baseHebdo,
        data,
        closures,
        totals: this._calculateTotals(
          data,
          closures,
          exerciseStart,
          baseHebdo
        )
      };
    } catch (e) {
      console.warn("⚠️ Erreur lecture Module 2:", e);
      return { available: false, error: e.message };
    }
  },

  getExerciseStats() {
    try {
      const current = this.getCurrentExercise();
      if (!current.available) return { available: false };

      let totalExtra = 0;
      let daysWorked = 0;

      Object.entries(current.data).forEach(([date, day]) => {
        totalExtra += day.extra || 0;
        if ((day.extra || 0) > 0) daysWorked++;
      });

      return {
        available: true,
        totalExtra: totalExtra.toFixed(2),
        daysWorked,
        ferieCount: 0
      };
    } catch (e) {
      return { available: false, error: e.message };
    }
  },

  _calculateTotals(data, closures, exerciseStart, baseHebdo) {
    return {
      total25: "0.00",
      total50: "0.00",
      totalRecup: "0.00",
      net: "0.00"
    };
  }
};

// --------------------------------------
//  BRIDGE ENTRE MODULE 1 & MODULE 2
// --------------------------------------

const MODULE_BRIDGES = {
  module1: MODULE1_API,
  module2: MODULE2_API,

  checkAvailability() {
    const m1 = this.module1.getAnnualData();
    const m2 = this.module2.getCurrentExercise();

    return {
      module1: m1.available,
      module2: m2.available,
      synced: m1.available && m2.available
    };
  }
};

window.MODULE_BRIDGES = MODULE_BRIDGES;

// --------------------------------------
//  VARIABLES GLOBALES
// --------------------------------------

let STATE = null;
let PROFILE = null;
let ANNUAL_THRESHOLDS = null;
let SCENARIOS = [];
let BADGES = [];
let MILESTONES = [];

// --------------------------------------
//  CHEAT CODE
// --------------------------------------

const CHEAT_CONFIG = {
  CODE: "19871",
  CLICKS_REQUIRED: 5,
  TIMEOUT: 3000,
  STORAGE_KEY: "MODULE3_CHEAT_UNLOCKED"
};

let cheatState = {
  clicks: 0,
  lastClickTime: 0,
  unlocked: localStorage.getItem(CHEAT_CONFIG.STORAGE_KEY) === "true"
};
