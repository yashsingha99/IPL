const matchData = require("./matchesData.json");
const { Router } = require("express");
const router = Router();
const { Venue } = require("../models/match.model");

router.get("/", async (req, res) => {
  try {
    const filteredData = {};
    const bowlers = new Set();
    const batsmen = new Set();

    // Group matches by year and matchId, collect unique batsmen and bowlers
    matchData.forEach((match) => {
      const year = match.date.substring(0, 4);
      const matchId = match.mid;

      if (match.batsman) batsmen.add(match.batsman);
      if (match.bowler) bowlers.add(match.bowler);

      if (!filteredData[year]) {
        filteredData[year] = {};
      }
      if (!filteredData[year][matchId]) {
        filteredData[year][matchId] = [];
      }
      filteredData[year][matchId].push(match);
    });

    const players = {};

    // Initialize players object
    batsmen.forEach((batsman) => {
      if (!players[batsman]) {
        players[batsman] = {};
      }
    });

    bowlers.forEach((bowler) => {
      if (!players[bowler]) {
        players[bowler] = {};
      }
    });

    // Process match data and calculate statistics
    for (const [year, matchesByYear] of Object.entries(filteredData)) {
      for (const [matchId, matchList] of Object.entries(matchesByYear)) {
        let prev = { runs: 0, wickets: 0 };

        matchList.forEach((match) => {
          if (!match) return; // Skip if match is undefined or null

          const { batsman, bowler, venue, runs = 0, wickets = 0 } = match;

          // Ensure batsman stats exist
          if (batsman) {
            if (!players[batsman][year]) {
              players[batsman][year] = {};
            }
            if (!players[batsman][year][venue]) {
               players[batsman][year][venue] = { };
            }
            if (!players[batsman][year][venue].bat) {
               players[batsman][year][venue].bat = { bowls: 0, runs: 0 };
            }

            let batsmanData = players[batsman][year][venue].bat;
            batsmanData.runs += Math.max(runs - (prev.runs || 0), 0); // Increment runs safely
            batsmanData.bowls += 1;
          }

          // Ensure bowler stats exist
          if (bowler) {
            if (!players[bowler][year]) {
              players[bowler][year] = {};
            }
            if (!players[bowler][year][venue]) {
              players[bowler][year][venue] = { };
            }
            if (!players[bowler][year][venue].bowl) {
              players[bowler][year][venue].bowl = {
                bowls: 0,
                givesRun: 0,
                wickets: 0,
              };
            }

            let bowlerData = players[bowler][year][venue].bowl;
            bowlerData.givesRun += Math.max(runs - (prev.runs || 0), 0); // Increment runs safely
            bowlerData.wickets += Math.max(wickets - (prev.wickets || 0), 0); // Increment wickets safely
            bowlerData.bowls += 1;
          }

          prev = { runs, wickets };
        });
      }
    }

    // Save the processed data to the database
    await Venue.deleteMany({});
    const venueData = Object.entries(players).map(([name, stats]) => ({
      name,
      stats,
    }));
    await Venue.insertMany(venueData);

    // Respond with the processed data
    res.status(200).json({
      message: "Data processed and stored successfully.",
      venueData,
    });
  } catch (error) {
    console.error("Error processing matches:", error);
    res.status(500).json({ error: "An error occurred while processing data." });
  }
});

module.exports = router;
