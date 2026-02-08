// ===============================
//  FOX ENGINE – STORAGE (ORIGINAL FIXED)
// ===============================

const FOX_STORAGE_KEY = "fox-engine-module3";

/**
 * Charge les données stockées localement.
 */
function foxLoadStorage() {
  try {
    const raw = localStorage.getItem(FOX_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);

    // Vérification minimale pour éviter les crashs
    if (typeof parsed !== "object" || parsed === null) {
      console.warn("foxLoadStorage: données invalides, reset");
      return null;
    }

    return parsed;

  } catch (e) {
    console.error("Erreur foxLoadStorage:", e);
    return null;
  }
}

/**
 * Sauvegarde les données du moteur.
 */
function foxSaveStorage(data) {
  try {
    if (!data || typeof data !== "object") {
      console.warn("foxSaveStorage: data invalide");
      return;
    }

    localStorage.setItem(FOX_STORAGE_KEY, JSON.stringify(data));

  } catch (e) {
    console.error("Erreur foxSaveStorage:", e);
  }
}

/**
 * Réinitialise complètement le stockage.
 */
function foxClearStorage() {
  try {
    localStorage.removeItem(FOX_STORAGE_KEY);
  } catch (e) {
    console.error("Erreur foxClearStorage:", e);
  }
}
