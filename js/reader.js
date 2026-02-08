// ===============================
//  FOX ENGINE – READER (ORIGINAL FIXED)
// ===============================

/**
 * Lecture sécurisée d'une valeur dans un objet profondément imbriqué.
 * Exemple : foxRead(data, "module1.years.2024.months.01.total")
 */
function foxRead(obj, path, fallback = null) {
  try {
    if (!obj || !path) return fallback;

    const parts = path.split(".");
    let current = obj;

    for (const p of parts) {
      if (current[p] === undefined || current[p] === null) {
        return fallback;
      }
      current = current[p];
    }

    return current;
  } catch (e) {
    console.error("Erreur foxRead:", e);
    return fallback;
  }
}

/**
 * Vérifie si un chemin existe dans un objet.
 */
function foxHas(obj, path) {
  try {
    if (!obj || !path) return false;

    const parts = path.split(".");
    let current = obj;

    for (const p of parts) {
      if (current[p] === undefined || current[p] === null) {
        return false;
      }
      current = current[p];
    }

    return true;
  } catch (e) {
    console.error("Erreur foxHas:", e);
    return false;
  }
}

/**
 * Fusionne deux objets profondément.
 * (Utilisé si un jour tu veux fusionner module1 + module2 réels)
 */
function foxDeepMerge(target, source) {
  if (typeof target !== "object" || typeof source !== "object") {
    return source;
  }

  const output = { ...target };

  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      output[key] = foxDeepMerge(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  }

  return output;
}

/**
 * Fusionne les données réelles (si pas en mode démo)
 */
function foxMergeData() {
  const module1 = foxLoadStorage();
  const module2 = foxLoadStorage(); // placeholder si tu veux un jour séparer

  if (!module1 && !module2) {
    throw new Error("Aucune donnée réelle disponible");
  }

  if (module1 && module2) {
    return foxDeepMerge(module1, module2);
  }

  return module1 || module2;
}
