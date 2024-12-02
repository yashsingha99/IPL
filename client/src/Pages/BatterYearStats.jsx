import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  MapPin,
  Trophy,
  User,
  Clock,
  BarChart2,
  Star,
  Volleyball,
  CandyCane,
} from "lucide-react";
import { getBatterById, getBowlerById } from "../api/match.api";
import CricketChart from "./CricketChart";

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white/90 rounded-lg shadow-md p-4 flex items-center space-x-3 transition-all hover:shadow-xl hover:scale-105">
    {icon}
    <div>
      <p className="text-gray-500 text-xl">{label}</p>
      <p className="font-bold text-xl text-blue-800">{value}</p>
    </div>
  </div>
);

const BatterYearStats = () => {
  const [batStats, setBatStats] = useState(null);
  const [bowlStats, setBowlStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [activeMatchIndex, setActiveMatchIndex] = useState(0);
  const [isBowler, setIsBowler] = useState(false);

  const [searchParams] = useSearchParams();
  const battingId = searchParams.get("batingId");
  const bowlingId = searchParams.get("bowlingId");
  const year = searchParams.get("year");

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const fetchBattingStats = battingId
          ? await getBatterById(battingId)
          : null;
        const fetchBowlingStats = bowlingId
          ? await getBowlerById(bowlingId)
          : null;

        if (fetchBattingStats) {
          setPlayerName(fetchBattingStats.name || "Player");
          setBatStats(fetchBattingStats.stats[year] || {});
        }

        if (fetchBowlingStats) {
          setBowlStats(fetchBowlingStats.stats[year] || {});
        }
      } catch (err) {
        setError("Error fetching stats");
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [battingId, bowlingId, year]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <Volleyball
            className="mx-auto animate-spin text-blue-500"
            size={64}
          />
          <p className="mt-4 text-blue-700 font-semibold">
            Loading Player Stats...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <div className="text-center bg-white p-8 rounded-xl shadow-xl">
          <Trophy className="mx-auto text-red-500 mb-4" size={64} />
          <p className="text-red-700 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  const stats = isBowler ? bowlStats : batStats;
  const matches = stats ? Object.keys(stats) : [];

  if (!matches.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center bg-white p-8 rounded-xl shadow-xl">
          <Star className="mx-auto text-gray-500 mb-4" size={64} />
          <p className="text-gray-700 font-semibold">
            No stats available for this year.
          </p>
        </div>
      </div>
    );
  }

  const currentMatch = stats[matches[activeMatchIndex]];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-blue-600 text-white p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <User className="text-white" size={40} />
            <div>
              <h2 className="text-2xl font-bold">{playerName}</h2>
              <p className="text-blue-100">Performance in {year}</p>
            </div>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button
              className={`px-4 py-2 rounded transition-all ${
                !isBowler
                  ? "bg-white text-blue-600 shadow-md"
                  : "bg-blue-700 text-white hover:bg-blue-500"
              }`}
              onClick={() => setIsBowler(false)}
            >
              Batting Stats
            </button>
            <button
              className={`px-4 py-2 rounded transition-all ${
                isBowler
                  ? "bg-white text-blue-600 shadow-md"
                  : "bg-blue-700 text-white hover:bg-blue-500"
              }`}
              onClick={() => setIsBowler(true)}
            >
              Bowling Stats
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div>
            <CricketChart data={stats} isBowler={isBowler} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {!isBowler ? (
              <>
                <StatCard
                  icon={<CandyCane className="text-green-500" />}
                  label="Total Runs"
                  value={currentMatch?.runs || 0}
                />
                <StatCard
                  icon={<Clock className="text-blue-500" />}
                  label="Balls Faced"
                  value={currentMatch?.bowl || 0}
                />
                <StatCard
                  icon={<BarChart2 />}
                  label={"Strike Rate"}
                  value={(
                    (currentMatch?.runs / currentMatch?.bowl) * 100 || 0
                  ).toFixed(2)}
                  color="purple"
                />
              </>
            ) : (
              <>
                <StatCard
                  icon={<Trophy className="text-red-500" />}
                  label="Bowls"
                  value={currentMatch?.bowl || 0}
                />
                <StatCard
                  icon={<Trophy className="text-red-500" />}
                  label="Wickets"
                  value={currentMatch?.wicket || 0}
                />
                <StatCard
                  icon={<BarChart2 className="text-purple-500" />}
                  label="Runs Given"
                  value={currentMatch?.givesRun || 0}
                />
                  <StatCard
                  icon={<BarChart2 />}
                  label={"Economy Rate"}
                  value={(
                    (currentMatch?.wicket !== 0  ? (currentMatch?.bowl / currentMatch?.wicket) : 0)  || 0
                  ).toFixed(2)}
                  color="purple"
                />
              </>
            )}
          </div>
        </div>

        <div className="p-6 bg-gray-50">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Match Details
          </h3>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {matches.map((matchKey, index) => (
              <button
                key={index}
                onClick={() => setActiveMatchIndex(index)}
                className={`flex-shrink-0 p-3 rounded-lg transition-all ${
                  activeMatchIndex === index
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-blue-100"
                }`}
              >
                <MapPin className="mr-2 inline" size={20} />
                {stats[matchKey]?.venue || "Unknown"}
              </button>
            ))}
          </div>

          <div className="mt-6 bg-white rounded-xl shadow-md p-6">
            <h4 className="text-lg font-bold mb-4 text-gray-800">
              Match at {currentMatch?.venue || "Unknown"}
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">
                  <strong>Team:</strong> {currentMatch?.team || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Against:</strong>{" "}
                  {currentMatch?.against_team || "N/A"}
                </p>
              </div>
              <div>
                <strong>Played with {isBowler ? "Batters" : "Bowlers"}:</strong>
                <ul className="list-disc pl-5 mt-1 text-gray-600">
                  {(isBowler
                    ? currentMatch?.playWithBatters
                    : currentMatch?.playWithBowlers
                  )?.map((player, idx) => <li key={idx}>{player}</li>) || (
                    <li>No data available</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatterYearStats;
