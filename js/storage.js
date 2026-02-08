// FOX ENGINE – STORAGE (CLEAN)

const FOX_STORAGE_KEY = "fox-engine-module3";

function foxLoadStorage() {
  try {
    const raw = localStorage.getItem(FOX_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("Erreur lecture storage", e);
    return null;
  }
}

function foxSaveStorage(data) {
  try {
    localStorage.setItem(FOX_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Erreur écriture storage", e);
  }
}
