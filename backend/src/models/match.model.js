const mongoose = require("mongoose");

const batsmanSchema = new mongoose.Schema({
  name: String,
  stats: Object,
});

const bowlerSchema = new mongoose.Schema({
  name: String,
  stats: Object,
});

const venueSchema = new mongoose.Schema({
  name: String,
  stats: Object,
});

const matchSchema = new mongoose.Schema({
  year: String,
  matchId: String,
  deliveries: Array,
});

const battleSchema = new mongoose.Schema({
  name: String,
  stats: Object,
});

const Batsman = mongoose.model("Batsman", batsmanSchema);
const Bowler = mongoose.model("Bowler", bowlerSchema);
const Venue = mongoose.model("Venue", venueSchema);
const Match = mongoose.model("Match", matchSchema);
const Battle = mongoose.model("Battle", battleSchema);

module.exports = { Batsman, Bowler, Match, Venue, Battle };