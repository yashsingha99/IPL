import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";
import { venueById } from '../api/match.api';
import { BarChart2, CandyCane, Clock, MapPin, Trophy, User } from 'lucide-react';
import CricketChart from './CricketChart';


const StatCard = ({ icon, label, value }) => (
    <div className="bg-white/90 rounded-lg shadow-md p-4 flex items-center space-x-3 transition-all hover:shadow-xl hover:scale-105">
      {icon}
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="font-bold text-blue-800">{value}</p>
      </div>
    </div>
  );
  

function VenueYearStats() {
  const [searchParams] = useSearchParams();
    const playerId = searchParams.get("playerId");
    const year = searchParams.get("year");
   const [ venue, setVenue ] = useState()
   const [ isBowler, setIsBowler] = useState(false)
  const [playerName, setPlayerName] = useState("");


   const fetchVenue = async() => {
    const res = await venueById(playerId)
    
    setVenue(res?.stats[year])
    setPlayerName(res?.name)
 }
    useEffect(() => {
        fetchVenue()
    }, [])

    console.log(venue);


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
      <CricketChart data={venue} isBowler={isBowler} isVenue />

        </div>
        {/* <div className="grid grid-cols-2 gap-4">
          {!isBowler ? (
            <>
              <StatCard icon={<CandyCane className="text-green-500" />} label="Total Runs" value={currentMatch?.runs || 0} />
              <StatCard icon={<Clock className="text-blue-500" />} label="Balls Faced" value={currentMatch?.bowl || 0} />
            </>
          ) : (
            <>
              <StatCard icon={<Trophy className="text-red-500" />} label="Wickets" value={currentMatch?.bowl || 0} />
              <StatCard icon={<Trophy className="text-red-500" />} label="Wickets" value={currentMatch?.wicket || 0} />
              <StatCard icon={<BarChart2 className="text-purple-500" />} label="Runs Given" value={currentMatch?.givesRun || 0} />
            </>
          )}
        </div> */}
      </div>

      {/* <div className="p-6 bg-gray-50">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Match Details</h3>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {venue?.map((ground, index) => (
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
              {ground || "Unknown"}
            </button>
          ))}
        </div>
      </div> */}
    </div>
  </div>


   )
}

export default VenueYearStats