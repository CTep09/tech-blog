const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

// Import Sequelize connection
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Configure Session
const sesh = {
  // Secret key for session encryption
  secret: "Super secret secret",
  // Cookie configuration (default values)
  cookie: {},
  // Forces the session to be saved back to the session store
  resave: false,
  // Saves uninitialized sessions
  saveUninitialized: true,
  store: new SequelizeStore({
    // Connects session store to Sequelize database
    db: sequelize,
  }),
};

// Initialize session middleware
app.use(session(sesh));

// Create an instance of the Handlebars engine
const hbs = exphbs.create({ helpers: helpers });

// Set Handlebars as the template engine
// Set the default view engine to Handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Parse JSON data
// Parse URL-encoded data
// Serve static files from the 'public' directory
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.normalize(path.join(__dirname, "/public"))));

// Include the routes defined in the controllers directory
app.use(require("./controllers"));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  //  Sync Sequelize models to the database
  sequelize.sync({ force: false });
});
