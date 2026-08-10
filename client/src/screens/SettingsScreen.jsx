import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function SettingsScreen() {
  const supportEmail = "punditshanesatsang@gmail.com";

  const openGmail = (subject, body) => {
    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1&to=${supportEmail}` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  const handleShare = async () => {
    const shareData = {
      title: "Shane Prayer",
      text: "Join us for daily prayer, devotional music and spiritual guidance.",
      url: "https://shane-prayer-app-2026-f2a3e.web.app",
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Shane Prayer link copied.");
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  const handleDonate = () => {
    openGmail(
      "I'd like to support the Shane Prayer App",
      "Namaste,\n\nI'd like to support the Shane Prayer App.\n\nPlease send me more information about how I can contribute.\n"
    );
  };

  const handleSponsor = () => {
    openGmail(
      "I'd like to sponsor the Shane Prayer App",
      "Namaste,\n\nI'm interested in sponsoring the Shane Prayer App.\n\nName:\nOrganisation:\nContact number:\n"
    );
  };

  const handleSuggestion = () => {
    openGmail(
      "Suggestion for the Shane Prayer App",
      "Namaste,\n\nI have the following suggestion for the Shane Prayer App:\n\n"
    );
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <section style={styles.hero}>
          <div style={styles.namasteRow}>
            <span style={styles.om}>{"\u{1F549}\uFE0F"}</span>
            <span style={styles.namaste}>Namaste</span>
          </div>

          <div style={styles.divider} />

          <h1 style={styles.heading}>HELP US GROW</h1>
          <p style={styles.intro}>
            Support the prayer journey and help Shane Prayer reach more people.
          </p>
        </section>

        <section style={{ ...styles.card, ...styles.shareCard }}>
          <div style={styles.iconWrap}>{"\u{1F4E4}"}</div>

          <div style={styles.cardBody}>
            <h2 style={{ ...styles.cardTitle, color: "#c98aff" }}>
              SHARE SHANE PRAYER
            </h2>

            <p style={styles.copy}>
              Share the app with family, friends and your devotional community.
            </p>

            <button
              type="button"
              onClick={handleShare}
              style={styles.primaryButton}
            >
              Share the App
            </button>
          </div>
        </section>

        <section style={{ ...styles.card, ...styles.donateCard }}>
          <div style={styles.iconWrap}>{"\u{1F64F}"}</div>

          <div style={styles.cardBody}>
            <h2 style={{ ...styles.cardTitle, color: "#e6ad4d" }}>
              DONATE
            </h2>

            <p style={styles.copy}>
              Help us keep Shane Prayer available and support future devotional
              content.
            </p>

            <button
              type="button"
              onClick={handleDonate}
              style={styles.primaryButton}
            >
              Support Shane Prayer
            </button>
          </div>
        </section>

        <section style={{ ...styles.card, ...styles.sponsorCard }}>
          <div style={styles.iconWrap}>{"\u{1F91D}"}</div>

          <div style={styles.cardBody}>
            <h2 style={{ ...styles.cardTitle, color: "#6bd38a" }}>
              SPONSOR THE APP
            </h2>

            <p style={styles.copy}>
              Temples, businesses and individuals can support future
              development and devotional initiatives.
            </p>

            <button
              type="button"
              onClick={handleSponsor}
              style={styles.secondaryButton}
            >
              Become a Sponsor
            </button>
          </div>
        </section>

        <section style={{ ...styles.card, ...styles.suggestionCard }}>
          <div style={styles.iconWrap}>{"\u{1F4AC}"}</div>

          <div style={styles.cardBody}>
            <h2 style={{ ...styles.cardTitle, color: "#69aafc" }}>
              SHARE A SUGGESTION
            </h2>

            <p style={styles.copy}>
              Help us improve future versions of Shane Prayer.
            </p>

            <button
              type="button"
              onClick={handleSuggestion}
              style={styles.secondaryButton}
            >
              Send Suggestion
            </button>
          </div>
        </section>

        <section style={{ ...styles.card, ...styles.aboutCard }}>
          <div style={styles.bioBody}>
            <img
              src="/images/shane/shane-portrait.jpeg"
              alt="Pundith Shane Maharaj"
              style={styles.bioPortrait}
            />

            <h2 style={styles.bioTitle}>Pundith Shane Maharaj</h2>

            <p style={styles.bioCopy}>
              The story begins more than a century ago, when Indians first arrived
              on South African shores, bringing with them their faith, culture and
              traditions.
            </p>

            <p style={styles.bioCopy}>
              Despite generations living far from India, that heritage has endured.
              It remains alive today in South African Indian families - passed from
              one generation to the next through prayer, ritual, tradition and a
              shared sense of identity.
            </p>

            <p style={styles.bioHighlight}>
              Pundith Shane Maharaj has dedicated his life to keeping that flame burning.
            </p>

            <p style={styles.bioCopy}>
              His spiritual journey began at the tender age of six, learning from
              his father, PA Maharaj, and his uncle, SM Maharaj. That journey has
              now spanned more than seven decades, during which he has devoted
              himself to preserving the rich Hindu culture and traditions inherited
              from our ancestors.
            </p>

            <p style={styles.bioCopy}>
              What distinguishes Pundith Shane is his ability to bring together
              orthodox Hindu rituals with a practical way of life - helping people
              understand not only the rituals of their faith, but how those teachings
              can guide everyday life.
            </p>

            <p style={styles.bioCopy}>
              Through decades of service, devotion and teaching, he has earned the
              respect and affection of the communities he has served.
            </p>

            <p style={styles.bioCopy}>
              A spiritual leader and purohit of the highest calibre, Pundith Shane
              Maharaj continues a tradition handed down through generations -
              preserving its foundations while ensuring its wisdom remains accessible
              to generations still to come.
            </p>

            <div style={styles.heritageBlock}>
              <img
                src="/images/shane/shane-mandela-udw-1994.jpeg"
                alt="Pundith Shane Maharaj officiating an opening prayer with Nelson Mandela in 1994"
                style={styles.heritageImage}
              />

              <div style={styles.heritageText}>
                <h3 style={styles.heritageTitle}>A Life of Service</h3>
                <p style={styles.heritageCaption}>
                  Pundith Shane Maharaj officiating the opening prayer with then
                  President Nelson Mandela at the UDW Hindu Centre, 1994.
                </p>
              </div>
            </div>

            <p style={styles.bioClosing}>
              This app is part of that continuing journey.
            </p>
          </div>
        </section>

        <button
          type="button"
          onClick={handleLogout}
          style={styles.logoutButton}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100%",
    padding: "18px 14px 34px",
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

  heading: {
    margin: 0,
    fontSize: 24,
    letterSpacing: 1.4,
    color: "#f1d7a1",
  },

  intro: {
    margin: "7px auto 0",
    maxWidth: 360,
    color: "#c7c7c7",
    fontSize: 14,
    lineHeight: 1.5,
  },

  card: {
    display: "flex",
    gap: 16,
    alignItems: "flex-start",
    padding: 18,
    marginBottom: 16,
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "#171720",
    boxSizing: "border-box",
  },

  shareCard: {
    borderColor: "rgba(173,104,240,0.35)",
    background: "rgba(70,38,95,0.22)",
  },

  donateCard: {
    borderColor: "rgba(225,143,43,0.38)",
    background: "rgba(84,54,20,0.22)",
  },

  sponsorCard: {
    borderColor: "rgba(74,179,105,0.38)",
    background: "rgba(25,78,45,0.22)",
  },

  suggestionCard: {
    borderColor: "rgba(75,140,221,0.4)",
    background: "rgba(25,55,92,0.24)",
  },

  bioBody: {
    width: "100%",
  },

  bioPortrait: {
    width: "100%",
    maxWidth: 300,
    display: "block",
    margin: "0 auto 18px",
    borderRadius: 22,
    border: "1px solid rgba(214,168,75,0.6)",
    boxShadow: "0 10px 28px rgba(0,0,0,0.28)",
  },

  bioTitle: {
    margin: "0 0 18px",
    textAlign: "center",
    color: "#f1d7a1",
    fontSize: 24,
    lineHeight: 1.2,
  },

  bioCopy: {
    margin: "0 0 14px",
    color: "#e4e4e4",
    fontSize: 14,
    lineHeight: 1.65,
  },

  bioHighlight: {
    margin: "18px 0",
    color: "#d6a84b",
    fontSize: 15,
    lineHeight: 1.6,
    fontWeight: 700,
  },

  heritageBlock: {
    marginTop: 22,
    border: "1px solid rgba(214,168,75,0.35)",
    borderRadius: 16,
    overflow: "hidden",
    background: "rgba(255,255,255,0.035)",
  },

  heritageImage: {
    width: "100%",
    height: "auto",
    display: "block",
  },

  heritageText: {
    padding: "14px 16px 16px",
  },

  heritageTitle: {
    margin: "0 0 8px",
    color: "#d6a84b",
    fontSize: 18,
  },

  heritageCaption: {
    margin: 0,
    color: "#d8d8d8",
    fontSize: 13,
    lineHeight: 1.55,
  },

  bioClosing: {
    margin: "22px 0 2px",
    textAlign: "center",
    color: "#f1d7a1",
    fontSize: 16,
    lineHeight: 1.5,
    fontWeight: 700,
  },

  aboutCard: {
    borderColor: "rgba(214,168,75,0.3)",
    background: "rgba(70,54,28,0.18)",
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
    fontSize: 25,
  },

  cardBody: {
    flex: 1,
    minWidth: 0,
  },

  cardTitle: {
    margin: "2px 0 8px",
    fontSize: 17,
    letterSpacing: 0.5,
  },

  copy: {
    margin: 0,
    color: "#e0e0e0",
    fontSize: 14,
    lineHeight: 1.55,
  },

  primaryButton: {
    width: "100%",
    marginTop: 14,
    padding: "11px 14px",
    border: "1px solid rgba(241,205,105,0.45)",
    borderRadius: 10,
    background: "#d6a84b",
    color: "#17110a",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
  },

  secondaryButton: {
    width: "100%",
    marginTop: 14,
    padding: "11px 14px",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: 10,
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
  },

  logoutButton: {
    display: "block",
    margin: "6px auto 0",
    padding: "9px 22px",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 999,
    background: "transparent",
    color: "#aaa",
    fontSize: 12,
    cursor: "pointer",
  },
};