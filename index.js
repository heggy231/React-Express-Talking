const express = require("express");
const app = express();

app.get("/listen", (req, res) => {
  res.send(`<h1>I am here listening!!</h1>`);
});

app.get("/api/kpop", (req, res) => {
  let kpopList = ["BTS", "Black Pink", "2NE1", "NCT Dream"];
  res.json(kpopList);
});

const PORT = 8080;
app.listen(PORT, () =>
  console.log(`Sever started at http://localhost:${PORT}`)
);
