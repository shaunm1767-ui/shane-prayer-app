import { useState } from "react";

export default function SupportScreen() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const appVersion = "v9-support-v2";

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const openWhatsApp = () => {
    const phone = "27837000780";
    const message = encodeURIComponent(
      "Hi, I need help with the Shane Prayer App."
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  const openEmail = () => {
    window.location.href =
      "mailto:support@shaneprayerapp.com?subject=App Support Request";
  };

  const faq = [
    {
      q: "App is not playing audio?",
      a: "Close and reopen the app. Check internet connection and try again.",
    },
    {
      q: "Why is the screen blank?",
      a: "This usually means a failed load. Refresh or restart the app.",
    },
    {
      q: "Where is my playlist saved?",
      a: "Your playlist is stored locally on your device for faster access.",
    },
    {
      q: "Does the app work offline?",
      a: "Some features work offline, but audio streaming requires internet.",
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Support</h1>

      {/* PRIMARY CTA */}
      <div style={styles.card}>
        <h3>Need Help Fast?</h3>

        <button onClick={openWhatsApp} style={styles.primaryBtn}>
          💬 WhatsApp Support
        </button>

        <button onClick={openEmail} style={styles.secondaryBtn}>
          ✉️ Email Support
        </button>
      </div>

      {/* FAQ SECTION */}
      <div style={styles.card}>
        <h3>FAQ</h3>

        {faq.map((item, index) => (
          <div key={index} style={styles.faqItem}>
            <div
              onClick={() => toggleFAQ(index)}
              style={styles.faqQuestion}
            >
              {item.q}
            </div>

            {openFAQ === index && (
              <div style={styles.faqAnswer}>{item.a}</div>
            )}
          </div>
        ))}
      </div>

      {/* APP INFO */}
      <div style={styles.card}>
        <h3>App Info</h3>
        <p>Shane Prayer App</p>
        <p>Build: {appVersion}</p>
        <p>Status: Stable Support Layer</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 16,
    color: "#fff",
  },

  title: {
    fontSize: 22,
    marginBottom: 16,
  },

  card: {
    background: "#1a1a22",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    border: "1px solid #2a2a35",
  },

  primaryBtn: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    background: "#25D366",
    border: "none",
    borderRadius: 10,
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
  },

  secondaryBtn: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    background: "#2a2a35",
    border: "1px solid #3a3a45",
    borderRadius: 10,
    color: "#fff",
    cursor: "pointer",
  },

  faqItem: {
    marginTop: 10,
    borderBottom: "1px solid #2a2a35",
    paddingBottom: 8,
  },

  faqQuestion: {
    cursor: "pointer",
    fontWeight: "bold",
    padding: 6,
  },

  faqAnswer: {
    padding: 6,
    fontSize: 14,
    color: "#bdbdbd",
  },
};