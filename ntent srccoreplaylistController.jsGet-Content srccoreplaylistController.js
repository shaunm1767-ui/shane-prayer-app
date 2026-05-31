[1mdiff --git a/src/screens/HomeScreen.jsx b/src/screens/HomeScreen.jsx[m
[1mindex a139b6e..35bef89 100644[m
[1m--- a/src/screens/HomeScreen.jsx[m
[1m+++ b/src/screens/HomeScreen.jsx[m
[36m@@ -1,11 +1,10 @@[m
 import React, { useEffect, useState } from "react";[m
[31m-import audioEngine from "../audioEngine.js";[m
[32m+[m[32mimport playlistController from "../core/playlistController";[m
 [m
 export default function HomeScreen() {[m
   const [hasSession, setHasSession] = useState(false);[m
   const [currentTrack, setCurrentTrack] = useState(null);[m
 [m
[31m-  // 🎧 playlist (simple local source)[m
   const playlist = [[m
     "/audio/track1.mp3",[m
     "/audio/track2.mp3",[m
[36m@@ -13,7 +12,7 @@[m [mexport default function HomeScreen() {[m
   ];[m
 [m
   // =========================[m
[31m-  // 🔄 INIT SESSION[m
[32m+[m[32m  // INIT SESSION[m
   // =========================[m
   useEffect(() => {[m
     const savedTrack = localStorage.getItem("lastTrack");[m
[36m@@ -21,39 +20,43 @@[m [mexport default function HomeScreen() {[m
     if (savedTrack) {[m
       setHasSession(true);[m
       setCurrentTrack(savedTrack);[m
[31m-[m
[31m-      audioEngine.resumeLast();[m
     }[m
   }, []);[m
 [m
   // =========================[m
[31m-  // ▶ PLAY SELECTED TRACK[m
[32m+[m[32m  // PLAY TRACK (LOCKED)[m
   // =========================[m
   const playTrack = (track, index) => {[m
     console.log("PLAY TRACK:", track);[m
 [m
[31m-    audioEngine.loadQueue(playlist, index);[m
[31m-    audioEngine.play(track);[m
[32m+[m[32m    playlistController.load(playlist, index);[m
[32m+[m[32m    playlistController.play(index);[m
 [m
     setCurrentTrack(track);[m
     setHasSession(true);[m
   };[m
 [m
   // =========================[m
[31m-  // ▶ CONTINUE SESSION[m
[32m+[m[32m  // CONTINUE SESSION[m
   // =========================[m
   const handleContinue = () => {[m
     const track = localStorage.getItem("lastTrack");[m
     if (!track) return;[m
 [m
[31m-    audioEngine.play(track);[m
[32m+[m[32m    playlistController.play();[m
     setCurrentTrack(track);[m
   };[m
 [m
[32m+[m[32m  // =========================[m
[32m+[m[32m  // PAUSE[m
[32m+[m[32m  // =========================[m
   const handlePause = () => {[m
[31m-    audioEngine.pause();[m
[32m+[m[32m    playlistController.pause();[m
   };[m
 [m
[32m+[m[32m  // =========================[m
[32m+[m[32m  // CLEAR SESSION[m
[32m+[m[32m  // =========================[m
   const clearSession = () => {[m
     localStorage.removeItem("lastTrack");[m
     localStorage.removeItem("lastTime");[m
[36m@@ -63,16 +66,14 @@[m [mexport default function HomeScreen() {[m
     setHasSession(false);[m
     setCurrentTrack(null);[m
 [m
[31m-    audioEngine.stop?.();[m
[32m+[m[32m    playlistController.clear();[m
   };[m
 [m
   return ([m
     <div style={{ padding: 20 }}>[m
       <h1>HOME</h1>[m
 [m
[31m-      {/* =========================[m
[31m-          🎧 CONTINUE LISTENING[m
[31m-         ========================= */}[m
[32m+[m[32m      {/* CONTINUE LISTENING */}[m
       {hasSession && ([m
         <div[m
           style={{[m
[36m@@ -83,20 +84,15 @@[m [mexport default function HomeScreen() {[m
             background: "#f5fbff",[m
           }}[m
         >[m
[31m-          <h3 style={{ margin: 0 }}>Continue Listening</h3>[m
[32m+[m[32m          <h3>Continue Listening</h3>[m
 [m
[31m-          <button[m
[31m-            onClick={handleContinue}[m
[31m-            style={{ marginTop: 10, padding: 10 }}[m
[31m-          >[m
[32m+[m[32m          <button onClick={handleContinue} style={{ marginTop: 10, padding: 10 }}>[m
             ▶ Resume Last Session[m
           </button>[m
         </div>[m
       )}[m
 [m
[31m-      {/* =========================[m
[31m-          🎧 PLAYLIST UI[m
[31m-         ========================= */}[m
[32m+[m[32m      {/* PLAYLIST */}[m
       <h3>Playlist</h3>[m
 [m
       <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>[m
[36m@@ -109,10 +105,8 @@[m [mexport default function HomeScreen() {[m
               border: "1px solid #ddd",[m
               borderRadius: 8,[m
               cursor: "pointer",[m
[31m-              background:[m
[31m-                currentTrack === track ? "#dff3ff" : "white",[m
[31m-              fontWeight:[m
[31m-                currentTrack === track ? "bold" : "normal",[m
[32m+[m[32m              background: currentTrack === track ? "#dff3ff" : "white",[m
[32m+[m[32m              fontWeight: currentTrack === track ? "bold" : "normal",[m
             }}[m
           >[m
             🎵 Track {index + 1}[m
[36m@@ -120,9 +114,7 @@[m [mexport default function HomeScreen() {[m
         ))}[m
       </div>[m
 [m
[31m-      {/* =========================[m
[31m-          🎮 CONTROLS[m
[31m-         ========================= */}[m
[32m+[m[32m      {/* CONTROLS */}[m
       <div style={{ marginTop: 20, display: "flex", gap: 10 }}>[m
         <button onClick={handlePause}>⏸ Pause</button>[m
         <button onClick={clearSession}>🗑 Clear</button>[m
