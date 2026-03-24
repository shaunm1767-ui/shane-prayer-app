// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

import { firebaseConfig } from "./firebaseConfig.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign Up
document.getElementById("signupBtn").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert(`Signed up: ${userCredential.user.email}`);
    } catch (error) {
        alert(error.message);
    }
});

// Login
document.getElementById("loginBtn").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert(`Logged in: ${userCredential.user.email}`);
        loadPrayers();
    } catch (error) {
        alert(error.message);
    }
});

// Add Prayer
document.getElementById("addPrayerBtn").addEventListener("click", async () => {
    const text = document.getElementById("prayerText").value;
    const user = auth.currentUser;

    if (!user) return alert("Please log in first");

    try {
        await addDoc(collection(db, "prayers"), {
            userId: user.uid,
            text: text
        });
        document.getElementById("prayerText").value = "";
        loadPrayers();
    } catch (error) {
        alert(error.message);
    }
});

// Load Prayers
async function loadPrayers() {
    const prayerList = document.getElementById("prayerList");
    prayerList.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "prayers"));
    querySnapshot.forEach((doc) => {
        const li = document.createElement("li");
        li.textContent = doc.data().text + " (by " + doc.data().userId + ")";
        prayerList.appendChild(li);
    });
}

// Optional: Load prayers on page load if user is logged in
auth.onAuthStateChanged((user) => {
    if (user) loadPrayers();
});