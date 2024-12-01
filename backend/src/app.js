const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
dotenv.config();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());

const matchRouter = require("./routers/match.routes");
app.use("/api/match", matchRouter);

const playerRouter = require("./routers/player.routes");
app.use("/api/player", playerRouter);

const userRouter = require("./routers/user.routes");
app.use("/api/user", userRouter);

const ground = require("./routers/ground.routes");
app.use("/api/ground", ground);

const filterMatchRoute = require("./sample_data/MatchAnalysis")
app.use("/api/filterData",  filterMatchRoute);

const filterVenueRoute = require("./sample_data/VenueAnalysis")
app.use("/api/filterVenueData",  filterVenueRoute);

const fetchMatch = require("./routers/fetchData.routes")
app.use("/api/fetchMatch",  fetchMatch);

const filterbattle = require("./sample_data/battleAnalysis")
app.use("/api/filterBattle",  filterbattle);

module.exports = app;