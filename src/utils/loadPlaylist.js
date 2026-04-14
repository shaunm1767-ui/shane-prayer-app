const PLAYLISTS = {
  aarti: [
    {
      title: "Jai Ambe Gauri",
      url: "https://firebasestorage.googleapis.com/v0/b/shane-storage-90931.firebasestorage.app/o/aarti%2Fshane_Jaiambegauri_arthi.mp3?alt=media&token=423af3bb-a31d-483b-81f7-dc1123d1a5ca"
    },
    {
      title: "Hanuman Aarti",
      url: "https://firebasestorage.googleapis.com/v0/b/shane-storage-90931.firebasestorage.app/o/aarti%2Fshane_hanuman_arthi.mp3?alt=media&token=YOUR_TOKEN"
    }
  ]
};

export const loadPlaylist = async (category = "aarti") => {
  console.log("📦 Loading static playlist:", category);

  const list = PLAYLISTS[category] || [];

  console.log("✅ TRACKS LOADED:", list);

  return list;
};