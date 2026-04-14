export const getSpiritualMode = () => {
  // TEMP FIX → always force working mode
  return "aarti";
};

export const modePlaylistMap = {
  aarti: "aarti",
  morning: "aarti",
  day: "aarti",        // 🔥 FIXED (was bhajan)
  evening: "aarti",
  night: "aarti",
};