import { storage } from "./firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

/**
 * Loads audio files from a Firebase Storage folder.
 * Standard track format:
 * {
 *   id: string,
 *   title: string,
 *   src: string
 * }
 */
export async function loadFirebasePlaylist(folder = "aarti") {
  try {
    console.log("[FIREBASE] Loading playlist:", folder);

    const folderRef = ref(storage, folder);
    const result = await listAll(folderRef);

    const tracks = await Promise.all(
      result.items.map(async (item, index) => {
        const url = await getDownloadURL(item);

        return {
          id: item.fullPath || `${folder}-${index + 1}`,
          title: item.name.replace(/\.[^/.]+$/, ""),
          src: url,
        };
      })
    );

    console.log("[FIREBASE] Playlist loaded:", tracks);
    return tracks;
  } catch (error) {
    console.error("[FIREBASE] Playlist load failed:", error);
    return [];
  }
}
