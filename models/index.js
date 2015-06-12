var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/songGame");
mongoose.set("debug", true);

module.exports.Score = require("./score.js");