import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const loadPlaylist = async (folder) => {
  console.log("📦 Loading Firebase folder:", folder);

  try {
    
    const folderRef = ref(storage, folder);

    const res = await listAll(folderRef);

    if (!res.items.length) {
      console.warn("⚠️ No tracks found in:", folder);
      return [];
    }

    const tracks = await Promise.all(
      res.items.map(async (item, index) => {
        const url = await getDownloadURL(item);

        return {
          title: item.name.replace(/\.[^/.]+$/, ""), // remove file extension
          url,
        };
      })
    );

    console.log("✅ TRACKS LOADED:", tracks);
    return tracks;

  } catch (err) {
    console.error("❌ Firebase load error:", err);
    return [];
  }
};