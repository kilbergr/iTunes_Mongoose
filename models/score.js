var mongoose = require("mongoose");

	var scoreSchema = new mongoose.Schema({
		player: String,
		highScore: Number,
		date: Number
	});

	var Score = mongoose.model("Score", scoreSchema);

	module.exports = Score;