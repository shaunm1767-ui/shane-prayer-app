export const loadPlaylist = (folder) => {
  console.log("📦 Loading static playlist:", folder);

  if (folder === "aarti") {
    return [
      {
        title: "Jai Ambe Gauri",
        url: "https://firebasestorage.googleapis.com/v0/b/shane-storage-90931.firebasestorage.app/o/aarti%2Fshane_Jaiambegauri_arthi.mp3?alt=media&token=423af3bb-a31d-483b-81f7-dc1123d1a5ca"
      },
      {
        title: "Hanuman Aarti",
        url: "https://firebasestorage.googleapis.com/v0/b/shane-storage-90931.firebasestorage.app/o/aarti%2Fshane_hanuman_arthi.mp3?alt=media&token=b1d354d8-5254-448c-a2fd-23a626ab8b91"
      }
    ];
  }

  return [];
};