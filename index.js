const express = require("express");
const { Sequelize } = require("sequelize");

const app = express();

// https://sequelize.org/master/manual/getting-started.html
// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize("kpop", "", "", {
  host: "localhost",
  dialect: "postgres",
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

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
