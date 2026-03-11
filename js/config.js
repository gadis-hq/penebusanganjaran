/* =========================
   GADIS QS HQ CONFIG
========================= */

const CONFIG = {

  /* =========================
     API ENDPOINT
  ========================= */

  API_URL: "https://script.google.com/macros/s/AKfycbxAh5FU9Yq89oFD3Yg5VAGtVENdqAJKLRCrls4XJGz-XFFntRdFtU5INgA6Yi1pmPOr/exec",

  /* endpoint tambahan (future upgrade) */
  API_MAP: "https://script.google.com/macros/s/AKfycbxAh5FU9Yq89oFD3Yg5VAGtVENdqAJKLRCrls4XJGz-XFFntRdFtU5INgA6Yi1pmPOr/exec?mode=peta",

  /* =========================
     SECURITY SETTINGS
  ========================= */

  MAX_CHECK_PER_MINUTE: 5,

  ENABLE_GPS_LOG: true,

  ENABLE_SOUND: true,

  /* =========================
     UI SETTINGS
  ========================= */

  THEME_COLOR: "#d4af37",

  BRAND_NAME: "GADIS QS HQ",

  VERSION: "2.0.0"

};

/* =========================
   DEBUG MODE (optional)
========================= */

if (typeof window !== "undefined") {

  console.log(
    "GADIS QS HQ System Loaded",
    "Version:", CONFIG.VERSION
  );

}
