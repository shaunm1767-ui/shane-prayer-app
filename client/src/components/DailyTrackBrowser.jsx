import { useEffect, useState } from "react";
import playlistController from "../core/playlistController";
import { buildDailyAudioQueue } from "../data/dailyAudioQueue";

function prettyTitle(title = "") {
  return String(title)
    .replace(/^shane_/i, "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function DailyTrackBrowser({ day }) {
  const [queue, setQueue] = useState([]);
  const [coreTracks, setCoreTracks] = useState([]);
  const [poolTracks, setPoolTracks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadDay() {
      setLoading(true);
      setMessage("");

      try {
        const result = await buildDailyAudioQueue(day);

        if (!active) return;

        setQueue(result.queue || []);
        setCoreTracks(result.coreTracks || []);
        setPoolTracks(result.poolTracks || []);
        setCurrentIndex(0);

        if (!(result.queue || []).length) {
          setMessage("No devotional audio is available for this day.");
        }

        if (result.missing?.length) {
          console.warn(
            "[DAILY TRACK BROWSER] Missing planned tracks:",
            result.missing
          );
        }
      } catch (error) {
        console.error("[DAILY TRACK BROWSER]", error);

        if (active) {
          setMessage("Today's devotional audio could not be loaded.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadDay();

    return () => {
      active = false;
    };
  }, [day]);

  const findQueueIndex = (track) => {
    const key = track?.id || track?.src || track?.title;

    return queue.findIndex((item) => {
      const itemKey = item?.id || item?.src || item?.title;
      return itemKey === key;
    });
  };

  const playIndex = (index) => {
    if (!queue.length) return;
    if (index < 0 || index >= queue.length) return;

    setCurrentIndex(index);

    playlistController.load(queue, index);

    setMessage(`Now playing: ${prettyTitle(queue[index]?.title)}`);
  };

  const playTrack = (track) => {
    const index = findQueueIndex(track);

    if (index >= 0) {
      playIndex(index);
    }
  };

  const previous = () => {
    if (!queue.length) return;

    const nextIndex =
      currentIndex <= 0 ? 0 : currentIndex - 1;

    playIndex(nextIndex);
  };

  const next = () => {
    if (!queue.length) return;

    const nextIndex =
      currentIndex >= queue.length - 1
        ? queue.length - 1
        : currentIndex + 1;

    playIndex(nextIndex);
  };

  if (loading) {
    return (
      <div style={styles.panel}>
        <p style={styles.loading}>Loading today's devotion...</p>
      </div>
    );
  }

  return (
    <div style={styles.panel}>
      <button
        type="button"
        onClick={() => playIndex(0)}
        disabled={!queue.length}
        style={styles.mainPlayButton}
      >
        ▶ Play Today's Prayer
      </button>

      {message && (
        <p style={styles.status}>
          {message}
        </p>
      )}

      {!!coreTracks.length && (
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            TODAY'S DEVOTION
          </div>

          <div style={styles.trackList}>
            {coreTracks.map((track, position) => {
              const index = findQueueIndex(track);
              const active = index === currentIndex;

              return (
                <button
                  key={track.id || track.src || `${track.title}-${position}`}
                  type="button"
                  onClick={() => playTrack(track)}
                  style={{
                    ...styles.trackRow,
                    ...(active ? styles.trackRowActive : {}),
                  }}
                >
                  <span style={styles.trackNumber}>
                    {position + 1}
                  </span>

                  <span style={styles.trackTitle}>
                    {prettyTitle(track.title)}
                  </span>

                  <span style={styles.playIcon}>
                    ▶
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {!!poolTracks.length && (
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            CONTINUE LISTENING
          </div>

          <div style={styles.trackList}>
            {poolTracks.map((track, position) => {
              const index = findQueueIndex(track);
              const active = index === currentIndex;

              return (
                <button
                  key={track.id || track.src || `${track.title}-${position}`}
                  type="button"
                  onClick={() => playTrack(track)}
                  style={{
                    ...styles.trackRow,
                    ...(active ? styles.trackRowActive : {}),
                  }}
                >
                  <span style={styles.trackNumber}>
                    {position + 1}
                  </span>

                  <span style={styles.trackTitle}>
                    {prettyTitle(track.title)}
                  </span>

                  <span style={styles.playIcon}>
                    ▶
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {!!queue.length && (
        <div style={styles.navigation}>
          <button
            type="button"
            onClick={previous}
            style={styles.navButton}
          >
            ◀ Previous
          </button>

          <span style={styles.position}>
            {currentIndex + 1} / {queue.length}
          </span>

          <button
            type="button"
            onClick={next}
            style={styles.navButton}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  panel: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  loading: {
    textAlign: "center",
    color: "rgba(255,255,255,0.78)",
    fontSize: 13,
  },

  mainPlayButton: {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.35)",
    background: "rgba(0,0,0,0.38)",
    color: "#ffffff",
    fontSize: 15,
    fontWeight: 800,
    cursor: "pointer",
  },

  status: {
    margin: 0,
    textAlign: "center",
    color: "#FFE39A",
    fontSize: 13,
  },

  section: {
    borderRadius: 14,
    padding: 12,
    background: "rgba(0,0,0,0.27)",
    border: "1px solid rgba(255,255,255,0.14)",
  },

  sectionHeader: {
    marginBottom: 9,
    color: "#FFE39A",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 0.8,
  },

  trackList: {
    display: "flex",
    flexDirection: "column",
    gap: 7,
  },

  trackRow: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "30px 1fr 30px",
    alignItems: "center",
    gap: 8,
    padding: "11px 10px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.07)",
    color: "#ffffff",
    textAlign: "left",
    cursor: "pointer",
  },

  trackRowActive: {
    border: "1px solid rgba(255,227,154,0.9)",
    background: "rgba(255,227,154,0.14)",
  },

  trackNumber: {
    color: "#FFE39A",
    fontWeight: 800,
    textAlign: "center",
  },

  trackTitle: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: 14,
  },

  playIcon: {
    color: "#FFE39A",
    textAlign: "center",
  },

  navigation: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    gap: 8,
    alignItems: "center",
  },

  navButton: {
    padding: "10px 8px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.20)",
    background: "rgba(0,0,0,0.30)",
    color: "#ffffff",
    fontWeight: 700,
    cursor: "pointer",
  },

  position: {
    minWidth: 44,
    textAlign: "center",
    color: "#FFE39A",
    fontSize: 12,
    fontWeight: 800,
  },
};