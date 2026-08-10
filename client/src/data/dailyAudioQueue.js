import { loadFirebasePlaylist } from "../firebasePlaylistScanner";
import { getDailyAudioPlan } from "./dailyAudioPlan";

function normalize(value = "") {
  return String(value).trim().toLowerCase();
}

function shuffle(list = []) {
  const copy = [...list];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function findTrack(tracks, match) {
  const needle = normalize(match);

  return tracks.find((track) =>
    normalize(track.title).includes(needle)
  );
}

export async function buildDailyAudioQueue(day) {
  const plan = getDailyAudioPlan(day);

  if (!plan) {
    return {
      plan: null,
      queue: [],
      missing: [],
    };
  }

  const requested = [
    ...(plan.core || []),
    ...(plan.pool || []),
  ];

  const folders = [
    ...new Set(
      requested
        .map((item) => item.folder)
        .filter(Boolean)
    ),
  ];

  const folderTracks = {};

  await Promise.all(
    folders.map(async (folder) => {
      folderTracks[folder] = await loadFirebasePlaylist(folder);
    })
  );

  const missing = [];

  const resolveItem = (item) => {
    const tracks = folderTracks[item.folder] || [];
    const track = findTrack(tracks, item.match);

    if (!track) {
      missing.push({
        folder: item.folder,
        match: item.match,
      });

      return null;
    }

    return track;
  };

  const coreTracks = (plan.core || [])
    .map(resolveItem)
    .filter(Boolean);

  const poolTracks = shuffle(
    (plan.pool || [])
      .map(resolveItem)
      .filter(Boolean)
  );

  const combined = [...coreTracks, ...poolTracks];

  const seen = new Set();

  const queue = combined.filter((track) => {
    const key = track.id || track.src || track.title;

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });

  console.log("[DAILY AUDIO QUEUE]", {
    day: plan.day,
    theme: plan.theme,
    queue: queue.map((track) => track.title),
    missing,
  });

  return {
    plan,
    queue,
    missing,
  };
}