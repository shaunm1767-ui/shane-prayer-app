import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const loadPlaylist = async (category = "aarti") => {
  try {
    const folderRef = ref(storage, category);

    const result = await listAll(folderRef);

    const tracks = await Promise.all(
      result.items.map(async (item) => {
        const url = await getDownloadURL(item);

        return {
          title: item.name.replace(".mp3", ""),
          url,
        };
      })
    );

    console.log("TRACKS:", tracks);

    return tracks;
  } catch (err) {
    console.error("LOAD ERROR:", err);
    return [];
  }
};