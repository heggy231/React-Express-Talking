import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  useEffect(() => {
    fetch("/api/kpop")
      .then((res) => res.json())
      .then((kpopdata) => console.log("kpop list data from server", kpopdata));
  }, []);

  return (
    <div className="App">
      <h1>Kpop listing in console!</h1>
    </div>
  );
}

export default App;
