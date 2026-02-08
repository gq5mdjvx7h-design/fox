// ===============================
//  FOX ENGINE – DEV LOG VIEWER
// ===============================

(function() {

  const logBox = () => document.getElementById("devLogViewer");
  const filterButtons = () => document.querySelectorAll("[data-logfilter]");
  let currentFilter = "all";

  function addLog(type, args) {
    const box = logBox();
    if (!box) return;

    if (currentFilter !== "all" && currentFilter !== type) return;

    const msg = args.map(a => 
      typeof a === "object" ? JSON.stringify(a, null, 2) : a
    ).join(" ");

    box.textContent += `[${type.toUpperCase()}] ${msg}\n`;

    box.scrollTop = box.scrollHeight;
  }

  // Interception console
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;

  console.log = function(...args) {
    addLog("log", args);
    originalLog.apply(console, args);
  };

  console.warn = function(...args) {
    addLog("warn", args);
    originalWarn.apply(console, args);
  };

  console.error = function(...args) {
    addLog("error", args);
    originalError.apply(console, args);
  };

  // Filtres
  document.addEventListener("click", e => {
    if (e.target.dataset.logfilter) {
      currentFilter = e.target.dataset.logfilter;
      logBox().textContent = "";
      console.log(`Filtre appliqué : ${currentFilter}`);
    }
  });

  // Clear
  document.addEventListener("click", e => {
    if (e.target.id === "clearLogsBtn") {
      logBox().textContent = "";
    }
  });

})();
