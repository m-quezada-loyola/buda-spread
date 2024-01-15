const express = require("express");
const spreadRoutes = require("./routes/spreadsRoutes");
const ExpressError = require("./utils/ExpressError");
const { swaggerDocs } = require("./swagger");

const app = express();

app.use(express.json());
app.use("/", spreadRoutes);
swaggerDocs(app, process.env.PORT);


app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(statusCode).json(err);
});

module.exports = app;
