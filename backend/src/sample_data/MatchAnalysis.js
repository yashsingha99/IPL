const matchData = require("./matchesData.json");
const { Router } = require("express");
const router = Router();

const { Batsman, Bowler } = require("../models/match.model");

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
        let prevRuns = 0;
        let prevWickets = 0;

        matchArray.forEach((bowl) => {
          if (!playersOfBatsman[bowl.batsman][year]) {
            playersOfBatsman[bowl.batsman][year] = {};
          }

          if (!playersOfBatsman[bowl.batsman][year][matchId]) {
            playersOfBatsman[bowl.batsman][year][matchId] = {
              bowl: 0,
              runs: 0,
              venue: bowl.venue,
              team: bowl.bat_team,
              against_team: bowl.bowl_team,
              playWithBowlers: [],
            };
          }

          const batsmanStats = playersOfBatsman[bowl.batsman][year][matchId];
          batsmanStats.bowl += 1;
          batsmanStats.runs += Number(bowl.runs - prevRuns);

          if (!batsmanStats.playWithBowlers.includes(bowl.bowler)) {
            batsmanStats.playWithBowlers.push(bowl.bowler);
          }

          if (!playersOfBowler[bowl.bowler][year]) {
            playersOfBowler[bowl.bowler][year] = {};
          }

          if (!playersOfBowler[bowl.bowler][year][matchId]) {
            playersOfBowler[bowl.bowler][year][matchId] = {
              team: bowl.bowl_team,
              against_team: bowl.bat_team,
              venue: bowl.venue,
              wicket: 0,
              givesRun: 0,
              playWithBatters: [],
            };
          }

          const bowlerStats = playersOfBowler[bowl.bowler][year][matchId];
          bowlerStats.givesRun += Number(bowl.runs - prevRuns);
          bowlerStats.wicket += Number(bowl.wickets - prevWickets);

          if (!bowlerStats.playWithBatters.includes(bowl.batsman)) {
            bowlerStats.playWithBatters.push(bowl.batsman);
          }

          // Update previous values
          prevRuns = bowl.runs;
          prevWickets = bowl.wickets;
        });
      }
    }

    await Batsman.deleteMany({});
    const batsmenData = Object.entries(playersOfBatsman).map(([name, stats]) => ({ name, stats }));
    await Batsman.insertMany(batsmenData);

    await Bowler.deleteMany({});
    const bowlersData = Object.entries(playersOfBowler).map(([name, stats]) => ({ name, stats }));
    await Bowler.insertMany(bowlersData);

    res.status(200).json({
      message: "Data processed and stored successfully.",
    });
  } catch (error) {
    console.error("Error processing matches:", error);
    res.status(500).json({ error: "An error occurred while processing data." });
  }
});

module.exports = router;
