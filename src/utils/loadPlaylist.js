import { storage } from "../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export async function loadPlaylist() {
  const folderRef = ref(storage, "/");

  const result = await listAll(folderRef);

  const tracks = await Promise.all(
    result.items.map(async (item) => {
      const url = await getDownloadURL(item);

      return {
        title: item.name.replace(/\.[^/.]+$/, ""),
        url
      };
    })
  );

  return tracks;
}
