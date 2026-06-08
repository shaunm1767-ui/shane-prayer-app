import { storage } from "./firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

/**
 * Loads audio files from a Firebase Storage folder
 * Example folders: aarti, bhajan, chalisa, discourse
 */
export async function loadFirebasePlaylist(folder = "aarti") {
  try {
    const folderRef = ref(storage, folder);

    const result = await listAll(folderRef);

    const tracks = await Promise.all(
      result.items.map(async (item, index) => {
        const url = await getDownloadURL(item);

        return {
          id: index + 1,
          title: item.name.replace(".mp3", ""),
          src: url
        };
      })
    );

    return tracks;
  } catch (error) {
    console.log("Firebase playlist load error:", error);
    return [];
  }
}