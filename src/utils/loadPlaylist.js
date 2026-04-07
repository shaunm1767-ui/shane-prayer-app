import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

// Your Firebase category folders
const categories = ["aarthi", "bhajan", "chalisa", "discourse"];

export async function loadAllTracks() {
  const allTracks = {};

  for (const category of categories) {
    try {
      const folderRef = ref(storage, category);
      const res = await listAll(folderRef);

      const tracks = await Promise.all(
        res.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return {
            name: item.name,
            url,
            category
          };
        })
      );

      allTracks[category] = tracks;
    } catch (err) {
      console.log("Error loading category:", category, err);
      allTracks[category] = [];
    }
  }

  return allTracks;
}
