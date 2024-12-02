import React, { useEffect, useState } from "react";
import { getbattle } from "../api/match.api";
import { Sword, User, Search, Loader } from "lucide-react";
import CricketChart from "./CricketChart";
import { useNavigate, useSearchParams } from "react-router-dom";

function Battle() {
  const [batsman, setBatsman] = useState("");
  const [bowler, setBowler] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [battingData, setBattingData] = useState();
  const [bowlingData, setBowlingData] = useState();
  const [bowlerName, setBowlerName] = useState("");
  const [batterName, setBatterName] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const batting = searchParams.get("batter");
  const bowling = searchParams.get("bowler");

  useEffect(() => {
    setBatsman(batting || "");
    setBowler(bowling || "");
    if (batting && bowling) fetchData();
  }, [batting, bowling]);

  const fetchData = async () => {
    if (!batsman.trim() || !bowler.trim()) {
      return alert("Please enter both Batsman and Bowler!");
    }
    setLoading(true);
    navigate(`?batter=${batsman.trim()}&bowler=${bowler.trim()}`);
    try {
      const data = { batsman: batsman.trim(), bowler: bowler.trim() };
      const res = await getbattle(data);
      setResult(res);
      setBowlerName(res?.batterdata?.name || "Unknown Bowler");
      setBatterName(res?.bowlerdata?.name || "Unknown Batsman");
      setBattingData(res?.batterdata?.stats?.years || []);
      setBowlingData(res?.bowlerdata?.stats?.years || []);
    } catch (error) {
      console.error("Error fetching battle data:", error);
      alert("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full mx-auto">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2 flex items-center justify-center">
          <Sword className="w-6 h-6 mr-2 text-blue-500" />
          Battle Analysis
        </h1>
        <p className="text-gray-600">
          Compare performances between a batsman and a bowler.
        </p>
      </div>

      {/* Input Section */}
      <div className="flex flex-col items-center w-full">
        <div className="w-[30%] space-y-4">
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <User className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Enter Batsman Name"
              className="flex-1 focus:outline-none"
              value={batsman}
              onChange={(e) => setBatsman(e.target.value)}
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <User className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Enter Bowler Name"
              className="flex-1 focus:outline-none"
              value={bowler}
              onChange={(e) => setBowler(e.target.value)}
            />
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className={`w-full py-2 text-white rounded-lg flex items-center justify-center transition ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5 mr-2" />
            )}
            {loading ? "Loading..." : "Let's Battle"}
          </button>
        </div>
      </div>

      {/* Result Section */}
      {result && (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 lg:p-8">
          <div className="w-full mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-blue-600 w-full text-white p-6 flex flex-col md:flex-row items-center justify-between">
              <div className="flex w-full items-center space-x-4">
                <User className="text-white" size={40} />
                <div className="w-full flex justify-around">
                  <span className="text-2xl font-bold">{bowlerName}</span>
                  <span className="text-2xl font-bold">VS</span>
                  <span className="text-2xl font-bold">{batterName}</span>
                </div>
              </div>
            </div>
            <div className="w-full flex">
              <CricketChart data={battingData} isBettle />
              <CricketChart data={bowlingData} isBettle isBowler />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Battle;
