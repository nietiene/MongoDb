
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./userRoutes.js");
const App = express();

App.use(express.json());

const URL = process.env.URL || "mongodb+srv://mongoself:factorise@etiene.jjrlz2m.mongodb.net/mongo"

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then (() => console.log("Connected Successfully"))
  .catch((err) => console.log("ERROR: ", err));

App.get('/', (req, res) => {
  res.send("Welcome to node js App");
});

App.use('/user', userRoutes);
const PORT = process.env.PORT || 3000;

App.listen(PORT, () => console.log(`http://localhost:${PORT}`));