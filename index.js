const express = require("express");
const cors = require("cors");
// sequelize (object relational mapper)
const { Sequelize } = require("sequelize");
const { Song } = require("./models");
const session = require("express-session");
const passport = require("passport");

const app = express();

// ----------------------------------------------------------------------------
//                                Middleware
// ----------------------------------------------------------------------------
app.use(cors());
// https://sequelize.org/master/manual/getting-started.html
// Option 2: Passing parameters separately (other dialects)
// __dirname is root of the project, Server will look inside public for static file (https://learn.digitalcrafts.com/flex/lessons/back-end-foundations/express-middleware/#serving-static-files)
// app.use('/', express.static(__dirname + '/public'));
app.use(express.static("public"));
// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded (converts str => json)

// order matters: session middleware before Passport OAuth
// cookie expires after 10 min
// secrete is key that allows browser know that I am the server
const sess = {
  secret: "keyboard mouse",
  cookie: { maxAge: 600000 },
  id: null
};
app.use(session(sess));

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

app.post('/songs', async (req, res) => )

const PORT = 8080;
app.listen(PORT, () =>
  console.log(`Sever started at http://localhost:${PORT}`)
);
