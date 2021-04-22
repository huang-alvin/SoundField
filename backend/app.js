const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { ValidationError } = require("sequelize");

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

app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  // next(err) this command passes the err onto err handlers after this middlewre
  // next() will not invoke err handlers after thsi middleware
  next(err);
});

app.use((err, _req, _res, next) => {
  //checking for sequelize err
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = "Validation error";
  }
  next(err);
});

//err formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.log(err);
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
