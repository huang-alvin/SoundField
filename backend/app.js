const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const { environment } = require("./config");
const isProduction = environment === "production";

const app = express();
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
  // cors enabled in development only
  app.use(cors());
}

//helmet helps set variety of headers to better secure app
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

//sets _csurf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

app.use(routes);

module.exports = app;
