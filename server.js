const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up session and connect to our Sequelize db
const sess = {
  secret: "Super secret secret",

  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    // sets httponly attribute to true, meaning the cookie is only accessible through the HTTP protocol
    httpOnly: true,
    // sets secure attribute to false, if secure attribute is true, the cookie is only set when HTTPS is used
    secure: false,
    // sets the sameSite attribute, which controls whether cookies are sent with cross-origin requests
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,

  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create(
  { helpers, runtimeOptions: {
    allowProtoPropertiesByDefault: true },
  }
  );

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});
