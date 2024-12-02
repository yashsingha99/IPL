import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { venueById } from "../api/match.api";
import {
  BarChart2,
  CandyCane,
  Clock,
  MapPin,
  Trophy,
  User,
  Volleyball,
  Info,
} from "lucide-react";
import CricketChart from "./CricketChart";

// Reusable Card Component with Enhanced Styling
const StatsCard = ({
  icon,
  label,
  value,
  sublabel = null,
  color = "blue",
  className = "",
}) => (
  <div
    className={`
    bg-white 
    rounded-xl 
    shadow-md 
    p-4 
    flex 
    items-center 
    space-x-3 
    border-l-4 
    border-${color}-500 
    hover:shadow-lg 
    transition-all 
    duration-300
    ${className}
  `}
  >
    <div className={`p-3 rounded-full bg-${color}-50`}>
      {React.cloneElement(icon, { className: `text-${color}-500` })}
    </div>
    <div className="flex-1">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-bold text-gray-800 text-lg">{value}</p>
      {sublabel && <p className="text-xs text-gray-400">{sublabel}</p>}
    </div>
  </div>
);

// Enhanced Loading Component
const LoadingView = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
    <div className="text-center bg-white p-8 rounded-xl shadow-2xl">
      <Volleyball
        className="mx-auto animate-spin text-blue-500 mb-4"
        size={64}
      />
      <h2 className="text-2xl font-bold text-blue-700 mb-2">
        Loading Player Stats
      </h2>
      <p className="text-gray-500">Fetching performance data...</p>
    </div>
  </div>
);

// Enhanced Error Component
const ErrorView = ({ message }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
    <div className="text-center bg-white p-8 rounded-xl shadow-2xl">
      <Info className="mx-auto text-red-500 mb-4" size={64} />
      <h2 className="text-2xl font-bold text-red-700 mb-2">
        Oops! Something went wrong
      </h2>
      <p className="text-gray-600 mb-4">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
      >
        Retry
      </button>
    </div>
  </div>
);

function VenueYearStats() {
  const [searchParams] = useSearchParams();
  const playerId = searchParams.get("playerId");
  const year = searchParams.get("year");

  const [venue, setVenue] = useState(null);
  const [isBowler, setIsBowler] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [currVenue, setCurrVenue] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVenue = async () => {
    try {
      setLoading(true);
      const res = await venueById(playerId);

      setVenue(res?.stats[year]);
      setPlayerName(res?.name);
    } catch (error) {
      setError("Unable to fetch player statistics. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenue();
  }, [playerId, year]);
  console.log(venue);

  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} />;

  // Render main content
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 lg:p-8">
      <div className="w-full mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-blue-600 text-white p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <User className="text-white" size={48} />
              <div>
                <h1 className="text-3xl font-bold">{playerName}</h1>
                <p className="text-blue-100 text-lg">Performance in {year}</p>
              </div>
            </div>

            {/* Toggle Buttons */}
            <div className="flex space-x-4 bg-blue-700 rounded-full p-2">
              <button
                className={`px-6 py-2 rounded-full transition-all ${
                  !isBowler
                    ? "bg-white text-blue-600 shadow-md"
                    : "text-white hover:bg-blue-600"
                }`}
                onClick={() => setIsBowler(false)}
              >
                Batting
              </button>
              <button
                className={`px-6 py-2 rounded-full transition-all ${
                  isBowler
                    ? "bg-white text-blue-600 shadow-md"
                    : "text-white hover:bg-blue-600"
                }`}
                onClick={() => setIsBowler(true)}
              >
                Bowling
              </button>
            </div>
          </div>
        </div>

        <div className=" w-full flex justify-betweengap-6 p-6">
          <div className="w-[60%] bg-gray-50 rounded-xl p-4 shadow-inner">
            <CricketChart data={venue} isBowler={isBowler} isVenue />
          </div>

          {/* Stats Cards */}
          <div className=" w-[40%] grid md:grid-cols-2 gap-4">
            <StatsCard
              icon={<CandyCane />}
              label={isBowler ? "Runs Conceded" : "Total Runs"}
              value={
                isBowler
                  ? currVenue?.bowl?.givesRun || 0
                  : currVenue?.bat?.runs || 0
              }
              color="green"
            />
            <StatsCard
              icon={<Clock />}
              label={isBowler ? "Total Bowled" : "Balls Faced"}
              value={
                isBowler
                  ? currVenue?.bowl?.bowls || 0
                  : currVenue?.bat?.bowls || 0
              }
              color="blue"
            />
            <StatsCard
              icon={<BarChart2 />}
              label={isBowler ? "Economy Rate" : "Strike Rate"}
              value={
                isBowler
                  ? (currVenue?.bowl?.wickets !== 0
                      ? currVenue?.bowl?.givesRun / currVenue?.bowl?.wickets
                      : 0 || 0
                    ).toFixed(2)
                  : (
                      (currVenue?.bat?.runs / currVenue?.bat?.bowls) * 100 || 0
                    ).toFixed(2)
              }
              color="purple"
            />
          </div>
        </div>
        <div className="p-4 flex gap-4 flex-wrap">
          {Object.entries(venue).map(([venueName, details]) => {
            if ((isBowler && details.bowl) || (!isBowler && details.bat))
              return (
                <button
                  key={venueName}
                  onClick={() => setCurrVenue(details)}
                  className={`flex-shrink-0 p-3 rounded-lg transition-all ${
                    currVenue === details
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  <MapPin className="mr-2 inline" size={20} />
                  {venueName}
                </button>
                // </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}

export default VenueYearStats;
