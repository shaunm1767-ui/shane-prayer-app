import { useState } from "react";
import {
  hinduFestivals2026,
  getNextFestival,
  formatFestivalDate,
} from "../data/hinduCalendar2026";
export default function HomeScreen() {
  const [showCalendar, setShowCalendar] = useState(false);
  const nextFestival = getNextFestival();
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <section style={styles.hero}>
          <div style={styles.namasteRow}>
            <span style={styles.om}>{"\u{1F549}\uFE0F"}</span>
            <span style={styles.namaste}>Namaste</span>
          </div>

          <div style={styles.divider} />

          <h1 style={styles.title}>SATSANG GUIDANCE</h1>
          <p style={styles.subtitle}>Wisdom for everyday life</p>
        </section>

        <section style={{ ...styles.card, ...styles.specialCard }}>
          <div style={styles.iconWrap}>{"\u{1F6D5}"}</div>
          <div style={styles.cardBody}>
            <h2 style={{ ...styles.cardTitle, color: "#c98aff" }}>
              SPECIAL DATES
            </h2>
            <p style={styles.cardText}>
              Upcoming observances and important prayer days.
            </p>
                    {nextFestival && (
          <div style={styles.nextFestival}>
            <div style={styles.nextLabel}>NEXT OBSERVANCE</div>
            <div style={styles.nextName}>{nextFestival.name}</div>
            <div style={styles.nextDate}>
              {formatFestivalDate(nextFestival.date)}
            </div>

            {nextFestival.note && (
              <div style={styles.nextNote}>{nextFestival.note}</div>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowCalendar((open) => !open)}
          style={styles.calendarButton}
        >
          {showCalendar ? "Hide 2026 Calendar ▲" : "View 2026 Calendar ▼"}
        </button>

        {showCalendar && (
          <div style={styles.calendarList}>
            {hinduFestivals2026.map((festival, index) => (
              <div
                key={`${festival.name}-${festival.date}-${index}`}
                style={styles.calendarRow}
              >
                <div style={styles.calendarDate}>
                  {formatFestivalDate(festival.date)}
                </div>

                <div style={styles.calendarName}>
                  {festival.name}
                </div>

                {festival.endDate && (
                  <div style={styles.calendarMeta}>
                    Until {formatFestivalDate(festival.endDate)}
                  </div>
                )}

                {festival.note && (
                  <div style={styles.calendarMeta}>
                    {festival.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
          </div>
        </section>

        <section style={{ ...styles.card, ...styles.fastCard }}>
          <div style={styles.iconWrap}>{"\u{1FA94}"}</div>
          <div style={styles.cardBody}>
            <h2 style={{ ...styles.cardTitle, color: "#f2a43c" }}>
              WHY WE FAST
            </h2>
            <p style={styles.cardText}>
              Fasting is more than food. It develops discipline, quietens the
              mind and helps us turn our attention toward God.
            </p>
          </div>
        </section>

        <section style={{ ...styles.card, ...styles.disciplineCard }}>
          <div style={styles.iconWrap}>{"\u{1F9D8}"}</div>
          <div style={styles.cardBody}>
            <h2 style={{ ...styles.cardTitle, color: "#6bd38a" }}>
              SPIRITUAL DISCIPLINE
            </h2>
            <p style={styles.cardText}>
              Small daily practices of prayer, gratitude, reflection and
              self-control help build a focused and purposeful life.
            </p>
          </div>
        </section>

        <section style={{ ...styles.card, ...styles.howToCard }}>
          <div style={styles.iconWrap}>{"\u{1F4D6}"}</div>
          <div style={styles.cardBody}>
            <h2 style={{ ...styles.cardTitle, color: "#69aafc" }}>
              HOW TO...
            </h2>
            <p style={styles.listItem}>• Prepare for prayer</p>
            <p style={styles.listItem}>• Begin a fast</p>
            <p style={styles.listItem}>• Create a daily prayer routine</p>
          </div>
        </section>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100%",
    padding: "18px 14px 30px",
    color: "#fff",
  },

  container: {
    width: "100%",
    maxWidth: 460,
    margin: "0 auto",
  },

  hero: {
    textAlign: "center",
    padding: "8px 8px 22px",
  },

  namasteRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },

  om: {
    fontSize: 40,
    lineHeight: 1,
    color: "#d6a84b",
  },

  namaste: {
    fontSize: 28,
    fontWeight: 700,
    color: "#d6a84b",
    letterSpacing: 0.4,
  },

  divider: {
    width: "56%",
    maxWidth: 220,
    height: 1,
    margin: "0 auto 18px",
    background: "rgba(214,168,75,0.45)",
  },

  title: {
    margin: 0,
    fontSize: 24,
    letterSpacing: 1.4,
    color: "#f1d7a1",
  },

  subtitle: {
    margin: "7px 0 0",
    color: "#c7c7c7",
    fontSize: 15,
  },

  card: {
    display: "flex",
    gap: 16,
    alignItems: "flex-start",
    padding: 18,
    borderRadius: 20,
    marginBottom: 16,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "#171720",
  },

  specialCard: {
    borderColor: "rgba(173,104,240,0.35)",
    background: "rgba(70,38,95,0.22)",
  },

  fastCard: {
    borderColor: "rgba(225,143,43,0.38)",
    background: "rgba(84,54,20,0.22)",
  },

  disciplineCard: {
    borderColor: "rgba(74,179,105,0.38)",
    background: "rgba(25,78,45,0.22)",
  },

  howToCard: {
    borderColor: "rgba(75,140,221,0.4)",
    background: "rgba(25,55,92,0.24)",
  },

  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    background: "rgba(255,255,255,0.07)",
    fontSize: 27,
  },

  cardBody: {
    flex: 1,
    minWidth: 0,
  },

  cardTitle: {
    margin: "2px 0 8px",
    fontSize: 18,
    letterSpacing: 0.6,
  },

  cardText: {
    margin: 0,
    color: "#e0e0e0",
    fontSize: 14,
    lineHeight: 1.55,
  },

  nextFestival: {
    marginTop: 14,
    padding: "12px 13px",
    borderRadius: 14,
    background: "rgba(173,104,240,0.11)",
    border: "1px solid rgba(173,104,240,0.25)",
  },

  nextLabel: {
    color: "#c98aff",
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 1.2,
    marginBottom: 5,
  },

  nextName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.3,
  },

  nextDate: {
    marginTop: 4,
    color: "#e3c6ff",
    fontSize: 13,
  },

  nextNote: {
    marginTop: 5,
    color: "#cfcfcf",
    fontSize: 11,
    lineHeight: 1.4,
  },

  calendarButton: {
    width: "100%",
    marginTop: 12,
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(173,104,240,0.3)",
    background: "rgba(173,104,240,0.14)",
    color: "#d9b4ff",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
  },

  calendarList: {
    marginTop: 10,
    maxHeight: 340,
    overflowY: "auto",
    paddingRight: 3,
  },

  calendarRow: {
    padding: "11px 4px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },

  calendarDate: {
    color: "#c98aff",
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 3,
  },

  calendarName: {
    color: "#f2f2f2",
    fontSize: 13,
    fontWeight: 600,
    lineHeight: 1.35,
  },

  calendarMeta: {
    marginTop: 3,
    color: "#bdbdbd",
    fontSize: 11,
    lineHeight: 1.4,
  },

  badge: {
    display: "inline-block",
    marginTop: 12,
    padding: "6px 10px",
    borderRadius: 9,
    background: "rgba(173,104,240,0.15)",
    color: "#d2a3ff",
    fontSize: 12,
  },

  listItem: {
    margin: "4px 0",
    color: "#e0e0e0",
    fontSize: 14,
    lineHeight: 1.45,
  },
};