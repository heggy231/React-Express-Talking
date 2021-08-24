require('dotenv').config();
const express = require("express");
const cors = require("cors");
const session = require("express-session"); // for github login
// sequelize (object relational mapper)
const { Sequelize } = require("sequelize");
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

// .models means => .models/index.js then indes.js exports all the models
// import all the models then export them as named exports here => Song
const { Song } = require("./models");

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
app.use(session(sess));  // setup session middleware

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
},
function(accessToken, refreshToken, profile, cb) {
  console.log(JSON.stringify(profile));

  // ASIDE: Access Tokens are super important!! Treat them like pwd (never store in plain text)
  // You can use this to talk to Github API
  console.log("Access Token: *****=======>" + accessToken);

  // Tell passport to move on
  cb(null, profile)
}
));

app.use(passport.initialize());
app.use(passport.session());

// Configure Passport authenticated session persistence.
// [doc](https://github.com/passport/express-4.x-facebook-example/blob/master/boot/auth.js)
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


console.log('*******process.env.GITHUB_CLIENT_ID******', process.env.GITHUB_CLIENT_ID);

app.get("/", (req, res) => {
  console.log("Here! at the ROOOT!!!!")
  res.send(`<h1>Hello!</h1>`);
})

app.get("/listen", (req, res) => {
  res.send(`<h1>I am here listening!!</h1>`);
});

app.get("/api/kpop", (req, res) => {
  let kpopList = ["BTS", "Black Pink", "2NE1", "NCT Dream"];
  res.json(kpopList);
});

// get all the users in my db
app.get("/api/songs", async (req, res) => {
  const songs = await Song.findAll();
  res.json(songs);
})

// create a new song
app.post("/api/songs", async (req, res) => {
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

// Place github strategy after the home page
// http://www.passportjs.org/packages/passport-github/
// PUT 2 /auth/github/ endpoints after `/` root home pg

// 1. auth/github takes me to github, user enters github credential to authenticate('github'));
// 2. once profile is received, callback route => redirect `/` homepage
// 1,2 GOAL: 1. go to my app => 2. Github => 3. back to my app
app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


const PORT = 8080;
app.listen(PORT, () =>
  console.log(`Sever started at http://localhost:${PORT}`)
);
