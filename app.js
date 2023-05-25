const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/user");
require("dotenv").config();

mongoose.connect(
  "mongodb+srv://jass:jassijassi@cluster0.9wvd40i.mongodb.net/shop",
  {
    useNewUrlParser: true,
  }
);

mongoose.Promise = global.Promise;

app.use(helmet());

app.use(
  morgan(
    ":method :url :status :res[content-length]B :response-time ms :date[web] :remote-addr"
  )
);

app.use("/upload", express.static("upload"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

const productsLimiter = rateLimit({
  windowMs: 1 * 1000, // 1 second
  max: 1, // 1 request
});

const userLimiter = rateLimit({
  windowMs: 60 * 1 * 1000, // 1 minute
  max: 3, // 3 requests
});

app.use("/products", productsLimiter, productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userLimiter, userRoutes);

app.use((req, res, next) => {
  const error = new Error("Route Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
