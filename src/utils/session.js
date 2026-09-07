const PLAYER_ID_KEY = "quiz_player_device_id";
const ACTIVE_SESSION_KEY = "quiz_active_session";

export function getPlayerDeviceId() {
  if (typeof window === "undefined" || !window.sessionStorage) {
    return "temp_" + Math.random().toString(36).substring(2, 9);
  }

  try {
    let id = window.sessionStorage.getItem(PLAYER_ID_KEY);
    if (!id) {
      id = "dev_" + Math.random().toString(36).substring(2, 11);
      window.sessionStorage.setItem(PLAYER_ID_KEY, id);
    }
    return id;
  } catch {
    return "dev_" + Math.random().toString(36).substring(2, 9);
  }
}

export function saveActiveSession(session) {
  if (typeof window === "undefined" || !window.sessionStorage) return;
  try {
    window.sessionStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(session));
  } catch (err) {
    console.error("No se pudo persistir la sesion efimera:", err);
  }
}

export function getActiveSession() {
  if (typeof window === "undefined" || !window.sessionStorage) return null;
  try {
    const raw = window.sessionStorage.getItem(ACTIVE_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearActiveSession() {
  if (typeof window === "undefined" || !window.sessionStorage) return;
  try {
    window.sessionStorage.removeItem(ACTIVE_SESSION_KEY);
  } catch (err) {
    console.error("Error al limpiar la sesion efimera:", err);
  }
}
