import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  // data from "/api/kpop" endpoint
  const [kpop, setKpop] = useState([]);
  // data from "api/songs" endpoint
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    try {
      fetch("/api/kpop")
        .then((res) => res.json())
        .then((kpopdata) => {
          console.log("kpop list data from server", kpopdata);
          // => ["BTS", "Black Pink", "2NE1", "NCT Dream"]
          setKpop(kpopdata);
        });
    } catch (error) {
      console.error("my get api/kpop request error ====>", error.message);
    }
  }, []);

  useEffect(() => {
    try {
      fetch("/api/songs")
        .then((res) => res.json())
        .then((songsData) => {
          console.log("Songs from kpop db ===>", songsData);
          // => [{}, {}, {}] {id: 1, kpopGroupName: "BTS", bestSongName: "Fly to my room", okSongName: "Permission to dance"}
          setSongs(songsData);
        });
    } catch (error) {
      console.error("my get api/songs request error ====>", error.message);
    }
  }, []);

  return (
    <div className="App">
      <h1>Kpop listing in console!</h1>
      <ul>{songs.map(song => <li key={song.id}>{song.kpopGroupName} - {song.bestSongName}</li>)}</ul>
    </div>
  );
}

export default App;
