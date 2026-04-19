// src/utils/loadPlaylist.js

import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export default async function loadPlaylist(folder = "aarti") {
  try {
    console.log("📦 SAFE FIREBASE LOAD:", folder);

    const folderRef = ref(storage, `${folder}/`);
    const result = await listAll(folderRef);

    const tracks = await Promise.all(
      result.items.map(async (item) => {
        const url = await getDownloadURL(item);

        return {
          name: item.name.replace(".mp3", ""),
          url,
        };
      })
    );

    console.log("🎧 TRACKS LOADED:", tracks);
    return tracks;
  } catch (err) {
    console.error("❌ Playlist load failed:", err);
    return [];
  }
}