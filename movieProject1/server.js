const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const movieRoutes = require("./routes/movieRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/moviedb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/movies", movieRoutes);

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
