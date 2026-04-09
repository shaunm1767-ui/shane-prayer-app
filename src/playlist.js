import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const categories = ["aarthi", "bhajan", "chalisa", "discourse"];

export async function loadPlaylist() {
  let tracks = [];

  for (const category of categories) {
    const folderRef = ref(storage, category);
    const files = await listAll(folderRef);

    const urls = await Promise.all(
      files.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return {
          title: item.name,
          url,
          category
        };
      })
    );

    tracks = [...tracks, ...urls];
  }

  return tracks;
}