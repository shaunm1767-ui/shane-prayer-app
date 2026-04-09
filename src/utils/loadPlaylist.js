import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const categories = ["aarthi", "bhajan", "chalisa", "discourse"];

export async function loadPlaylist() {
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
      allTracks[category] = [];
    }
  }

  return allTracks;
}
