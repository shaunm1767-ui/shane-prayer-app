import { useState } from "react";
import Card from "../components/Card";

export default function PrayScreen() {
  const [request, setRequest] = useState("");
  const [journal, setJournal] = useState("");

  const submitRequest = () => {
    if (!request.trim()) return;

    console.log("PRAYER REQUEST:", request);

    alert("Your prayer has been noted 🙏");

    setRequest("");
  };

  const saveJournal = () => {
    if (!journal.trim()) return;

    console.log("JOURNAL ENTRY:", journal);

    alert("Journal saved ✨");

    setJournal("");
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <h2 style={styles.header}>🙏 Pray</h2>

      <p style={styles.subtext}>
        Take a moment to reflect, write, and submit your prayer
      </p>

      {/* PRAYER REQUEST */}
      <Card>
        <h3>Prayer Request</h3>

        <textarea
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          placeholder="Write your prayer request..."
          style={styles.input}
        />

        <button onClick={submitRequest} style={styles.button}>
          Submit Prayer
        </button>
      </Card>

      {/* JOURNAL */}
      <Card>
        <h3>Prayer Journal</h3>

        <textarea
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          placeholder="Write your reflection..."
          style={styles.input}
        />

        <button onClick={saveJournal} style={styles.secondaryButton}>
          Save Journal
        </button>
      </Card>
    </div>
  );
}

const styles = {
  container: {
    padding: 16,
    color: "#fff",
  },

  header: {
    fontSize: 22,
    marginBottom: 4,
  },

  subtext: {
    fontSize: 13,
    color: "#aaa",
    marginBottom: 16,
  },

  input: {
    width: "100%",
    minHeight: 90,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    border: "1px solid #333",
    background: "#1a1a1a",
    color: "#fff",
    resize: "none",
  },

  button: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    border: "none",
    background: "#1DB954",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
  },

  secondaryButton: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    border: "1px solid #333",
    background: "#222",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};