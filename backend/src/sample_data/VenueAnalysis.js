const matchData = require("./matchesData.json");
const { Router } = require("express");
const router = Router();
const { Venue } = require("../models/match.model");


router.get("/", async (req, res) => {
  try {
    const filteredData = {};
    const bowlers = new Set();
    const batsmans = new Set();

    // Group matches by matchId and collect unique batsmen and bowlers
    matchData.forEach((match) => {
      const matchId = match.mid;

      batsmans.add(match.batsman);
      bowlers.add(match.bowler);

      if (!filteredData[matchId]) {
        filteredData[matchId] = [];
      }
      filteredData[matchId].push(match);
    });

    const players = {};

    // Initialize players object
    batsmans.forEach((batsman) => {
      players[batsman] = {};
    });

    bowlers.forEach((bowler) => {
      if (!players[bowler]) {
        players[bowler] = {};
      }
    });

    // Process match data and calculate statistics
    for (const [matchId, matchArray] of Object.entries(filteredData)) {
      let prev = {
        runs: 0,
        wickets: 0,
      };

      matchArray.forEach((match) => {
        // Ensure venue entry exists for batsman
        if (!players[match.batsman][match.venue]) {
          players[match.batsman][match.venue] = {};
        }

        // Process batsman data
        if (!players[match.batsman][match.venue].bat) {
          players[match.batsman][match.venue].bat = {
            bowls: 0,
            runs: 0,
          };
        }

        const batsmanData = players[match.batsman][match.venue].bat;
        batsmanData.runs += Number(match.runs - prev.runs);
        batsmanData.bowls += 1;

        // Ensure venue entry exists for bowler
        if (!players[match.bowler][match.venue]) {
          players[match.bowler][match.venue] = {};
        }

        // Process bowler data
        if (!players[match.bowler][match.venue].bowl) {
          players[match.bowler][match.venue].bowl = {
            bowls: 0,
            givesRun: 0,
            wickets: 0,
          };
        }

        const bowlerData = players[match.bowler][match.venue].bowl;
        bowlerData.givesRun += Number(match.runs - prev.runs);
        bowlerData.wickets += Number(match.wickets - prev.wickets);
        bowlerData.bowls += 1;

        // Update previous values
        prev = {
          runs: match.runs,
          wickets: match.wickets,
        };
      });
    }


    await Venue.deleteMany({});
    const venueData = Object.entries(players).map(([name, stats]) => ({ name, stats }));
    await Venue.insertMany(venueData);

    // Respond with the processed data
    res.status(200).json({
      message: "Data processed and stored successfully.",
    });
  } catch (error) {
    console.error("Error processing matches:", error);
    res.status(500).json({ error: "An error occurred while processing data." });
  }
});

module.exports = router;
