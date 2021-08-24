const express = require("express");
const cors = require("cors");
// sequelize (object relational mapper)
const { Sequelize } = require("sequelize");

// .models means => .models/index.js then indes.js exports all the models
// import all the models then export them as named exports here => Song
const { Song } = require("./models");
const session = require("express-session");

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
  id: null,
};
app.use(session(sess));

app.get("/listen", (req, res) => {
  res.send(`<h1>I am here listening!!</h1>`);
});

app.get("/api/kpop", (req, res) => {
  let kpopList = ["BTS", "Black Pink", "2NE1", "NCT Dream"];
  res.json(kpopList);
});

app.post("/songs", async (req, res) => {
  // `req.body` contains an Obj with kpopGroupName, bestSongName, okSongName
  /**
   * id | kpopGroupName |  bestSongName  |     okSongName      |
   *  1 | BTS           | Fly to my room | Permission to dance
   */
  const { kpopGroupName, bestSongName, okSongName } = req.body;
  console.log("req.body before ===******>!!!!!!", req.body);
  const newSong = await Song.create({
    kpopGroupName,
    bestSongName,
    okSongName,
  });
  console.log("req.body after ===******>!!!!!!", req.body);
  res.send(`Done!`);
  // res.json({
  //   id: newSong.id,
  // });
});

const PORT = 8080;
app.listen(PORT, () =>
  console.log(`Sever started at http://localhost:${PORT}`)
);
