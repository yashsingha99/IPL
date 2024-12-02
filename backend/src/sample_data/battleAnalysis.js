const matchData = require("./matchesData.json");
const { Router } = require("express");
const router = Router();
const { Battle } = require("../models/match.model");

router.get("/", async (req, res) => {
  try {
    const filteredData = {};
    const bowlers = new Set();
    const batsmans = new Set();

    matchData.forEach((match) => {
      const year = match.date.substring(0, 4);
      const matchId = match.mid;

      batsmans.add(match.batsman);
      bowlers.add(match.bowler);

      if (!filteredData[year]) {
        filteredData[year] = {};
      }

      if (!filteredData[year][matchId]) {
        filteredData[year][matchId] = [];
      }

      filteredData[year][matchId].push(match);
    });

    const playersOfBatsman = {};
    const playersOfBowler = {};

    batsmans.forEach((batsman) => {
      playersOfBatsman[batsman] = {};
    });

    bowlers.forEach((bowler) => {
      playersOfBowler[bowler] = {};
    });

    for (const [year, matches] of Object.entries(filteredData)) {
      for (const [matchId, matchArray] of Object.entries(matches)) {
        let prev = { runs: 0, wickets: 0 };

        matchArray.forEach((bowl) => {
          if (!bowl.batsman || !bowl.bowler) return;

          // Update Batsman Data
          if (!playersOfBatsman[bowl.batsman][bowl.bowler]) {
            playersOfBatsman[bowl.batsman][bowl.bowler] = {};
          }
          if (!playersOfBatsman[bowl.batsman][bowl.bowler][year]) {
            playersOfBatsman[bowl.batsman][bowl.bowler][year] = {
              bowls: 0,
              runs: 0,
            };
          }

          const battingData = playersOfBatsman[bowl.batsman][bowl.bowler][year];
          battingData.bowls += 1;
          battingData.runs += Math.max(Number(bowl.runs) - prev.runs, 0);

          // Update Bowler Data
          if (!playersOfBowler[bowl.bowler][bowl.batsman]) {
            playersOfBowler[bowl.bowler][bowl.batsman] = {};
          }
          if (!playersOfBowler[bowl.bowler][bowl.batsman][year]) {
            playersOfBowler[bowl.bowler][bowl.batsman][year] = {
              bowls: 0,
              givesRun: 0,
              wickets: 0,
            };
          }

          const bowlingData = playersOfBowler[bowl.bowler][bowl.batsman][year];
          bowlingData.bowls += 1;
          bowlingData.givesRun += Math.max(Number(bowl.runs) - prev.runs, 0);
          bowlingData.wickets += Math.max(
            Number(bowl.wickets) - prev.wickets,
            0
          );

          prev = {
            runs: Number(bowl.runs) || 0,
            wickets: Number(bowl.wickets) || 0,
          };
        });
      }
    }

    // Save processed data to the database
    await Battle.deleteMany({}); // Clear existing data
    const dataToSave = [];

    // Prepare data for insertion
    Object.entries(playersOfBatsman).forEach(([batsman, bowlersData]) => {
      Object.entries(bowlersData).forEach(([bowler, yearsData]) => {
        dataToSave.push({
          name: batsman,
          stats: { bowler, years: yearsData, type: "batsman" }, // Stats include bowler and yearly data
        });
      });
    });

    Object.entries(playersOfBowler).forEach(([bowler, batsmansData]) => {
      Object.entries(batsmansData).forEach(([batsman, yearsData]) => {
        dataToSave.push({
          name: bowler,
          stats: { batsman, years: yearsData, type: "bowler" }, // Stats include batsman and yearly data
        });
      });
    });

    await Battle.insertMany(dataToSave);

    res
      .status(200)
      .json({
        message: "Data saved successfully",
        playersOfBatsman,
        playersOfBowler,
      });
  } catch (error) {
    console.error("Error processing matches:", error);
    res.status(500).json({ message: "Error processing matches", error });
  }
});

router.get("/batsman/:batsman/bowler/:bowler", async (req, res) => {
  try {
    const { batsman, bowler } = req.params;

    // Find all battles where the batsman and bowler pair exists
    const batterdata = await Battle.findOne({
      name: batsman,
      "stats.bowler": bowler,
    });
    const bowlerdata = await Battle.findOne({
      name: bowler,
      "stats.batsman": batsman,
    });
    // console.log(battles);

    if (!bowlerdata || bowlerdata.length === 0 || !batterdata || batterdata.length === 0) {
      return res
        .status(404)
        .json({ message: `No data found for ${batsman} vs ${bowler}`, bowlerdata,  batterdata});
    }

    res.status(200).json({batterdata, bowlerdata});
  } catch (error) {
    console.error("Error fetching data for batsman vs bowler:", error);
    res
      .status(500)
      .json({ message: "Error fetching data for batsman vs bowler", error });
  }
});

module.exports = router;
