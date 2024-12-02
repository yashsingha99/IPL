const express = require("express");
const router = express.Router();
const { Batsman, Bowler, Venue } = require("../models/match.model");

router.get("/batsmen", async (req, res) => {
  try {
    const batsmen = await Batsman.find();
    res.status(200).json(batsmen);
  } catch (error) {
    console.error("Error fetching batsmen:", error);
    res.status(500).json({ error: "Failed to fetch batsmen." });
  }
});

router.get("/batsman/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const batsman = await Batsman.findOne({ name });
    if (!batsman) return res.status(404).json({ error: "Batsman not found." });
    res.status(200).json(batsman);
  } catch (error) {
    console.error("Error fetching batsman:", error);
    res.status(500).json({ error: "Failed to fetch batsman." });
  }
});
router.get("/batsmen/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const batsman = await Batsman.findById( id );
    if (!batsman) return res.status(404).json({ error: "Batsman not found." });
    res.status(200).json(batsman);
  } catch (error) {
    console.error("Error fetching batsman:", error);
    res.status(500).json({ error: "Failed to fetch batsman." });
  }
});

router.get("/bowlers", async (req, res) => {
  try {
    const bowlers = await Bowler.find();
    res.status(200).json(bowlers);
  } catch (error) {
    console.error("Error fetching bowlers:", error);
    res.status(500).json({ error: "Failed to fetch bowlers." });
  }
});

router.get("/bowlers/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const bowler = await Bowler.findOne({ name });
    if (!bowler) return res.status(404).json({ error: "Bowler not found." });
    res.status(200).json(bowler);
  } catch (error) {
    console.error("Error fetching bowler:", error);
    res.status(500).json({ error: "Failed to fetch bowler." });
  }
});
router.get("/bowler/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bowler = await Bowler.findById(id);
    if (!bowler) return res.status(404).json({ error: "Bowler not found." });
    res.status(200).json(bowler);
  } catch (error) {
    console.error("Error fetching bowler:", error);
    res.status(500).json({ error: "Failed to fetch bowler." });
  }
});

router.get("/venue/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const player = await Venue.findOne({ name });
    if (!player) return res.status(404).json({ error: "Player not found." });
    res.status(200).json(player);
  } catch (error) {
    console.error("Error fetching batsman:", error);
    res.status(500).json({ error: "Failed to fetch batsman." });
  }
});
router.get("/allVenue", async (req, res) => {
  try {
    const { name } = req.params;
    const player = await Venue.find({  });
    if (!player) return res.status(404).json({ error: "Player not found." });
    res.status(200).json(player);
  } catch (error) {
    console.error("Error fetching batsman:", error);
    res.status(500).json({ error: "Failed to fetch batsman." });
  }
});

router.get("/venueById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Venue.findById(id);
    if (!player) return res.status(404).json({ error: "Player not found." });
    res.status(200).json(player);
  } catch (error) {
    console.error("Error fetching batsman:", error);
    res.status(500).json({ error: "Failed to fetch batsman." });
  }
});


module.exports = router;
