import React, { useEffect, useState } from "react";
import { getPlayer } from "../api/player.api";
import { getPlayerVenue } from "../api/match.api"
import {motion} from "framer-motion"
import { 
  UserCircle2, 
  TrophyIcon, 
  MapPinIcon, 
  CalendarDaysIcon, 
  Trophy
} from "lucide-react";
import { Link } from "react-router-dom";

const PlayerProfile = ({name}) => {
  const [players, setPlayers] = useState([]);
  const [playerVenue, setPlayerVenue] = useState();
  const [filteredPlayer, setFilteredPlayer] = useState(null);
  const [activeTab, setActiveTab] = useState("bio");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await getPlayer({ allPlayer: true });
        const playerList = res.data.players || [];
        setPlayers(playerList);

        const player = playerList.find(
          (player) =>
            player.name
              .charAt(0)
              .toLowerCase()
              .includes(name.split(" ")[0].charAt(0).toLowerCase()) &&
            player.name.toLowerCase().includes(name.split(" ")[1].toLowerCase())
        );

        setFilteredPlayer(player);
      } catch (err) {
        console.error("Error fetching players:", err);
      }
    };

    const fetchPlayersVenue = async () => {
      try {
        const res = await getPlayerVenue(name);
        // const playerList = res.data.players;
        console.log(res)
        setPlayerVenue(res);
        // setPlayers(playerList);

        // setFilteredPlayer(player);
      } catch (err) {
        console.error("Error fetching players:", err);
      }
    };

    fetchPlayers();
    fetchPlayersVenue();
  }, [name]);
  console.log(playerVenue)

  const TabButton = ({ children, tab, icon: Icon }) => (
    <button
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
        ${activeTab === tab 
          ? 'bg-blue-500 text-white shadow-lg' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
      `}
      onClick={() => setActiveTab(tab)}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );

  const renderContent = () => {
    if (!filteredPlayer) return <div className="text-center text-gray-500">Loading player details...</div>;

    switch (activeTab) {
      case "bio":
        return (
          <div className="grid grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow-md">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Player Biography</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 col-span-2">
                  <UserCircle2 className="text-blue-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold mr-2">Name:</span>
                    <span className="break-words">{filteredPlayer.name}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrophyIcon className="text-yellow-500 flex-shrink-0" />
                  <span className="font-semibold mr-2">Role:</span>
                  <span>{filteredPlayer.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="text-green-500 flex-shrink-0" />
                  <span className="font-semibold mr-2">Country:</span>
                  <span>{filteredPlayer.country}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <CalendarDaysIcon className="text-red-500 flex-shrink-0" />
                  <span className="font-semibold mr-2">DOB:</span>
                  <span>{filteredPlayer.DOB.split("T")[0]}</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Career Highlights</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="font-semibold text-gray-600">Matches Played</p>
                  <p className="text-2xl text-blue-600">{filteredPlayer.matchesPlayed}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">Runs Scored</p>
                  <p className="text-2xl text-green-600">{filteredPlayer.runsScored}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">Strike Rate</p>
                  <p className="text-2xl text-purple-600">{filteredPlayer.strikeRate}</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "stats":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Player Statistics</h2>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(filteredPlayer.stats || {}).map(([key, value]) => (
                <div key={key} className="bg-gray-100 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600 uppercase">{key}</p>
                  <p className="text-2xl font-bold text-blue-600">{value}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "ground":
        return (
          <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-green-50 p-4 rounded-lg"
        >
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="text-green-600 h-6 w-6" />
            <h2 className="text-lg font-semibold text-green-800">Venue Stats</h2>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {playerVenue.stats &&
              Object.keys(playerVenue.stats).map((year) => (
                <Link
                  key={year}
                  to={`/venue/?playerId=${playerVenue._id}&year=${year}`}
                  className="bg-white shadow-sm rounded-md p-2 text-center hover:bg-green-100 transition-colors"
                >
                  <div className="font-medium text-green-600">{year}</div>
                </Link>
              ))}
          </div>
        </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full mx-auto bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-12">
        <div className="flex items-center space-x-8">
          <div className="w-1/3">
            {filteredPlayer?.img ? (
              <img
                src={filteredPlayer.img}
                alt={filteredPlayer.name}
                className="w-full h-96 object-cover rounded-lg shadow-xl"
              />
            ) : (
              <div className="w-full h-96 bg-gray-300 rounded-lg flex items-center justify-center">
                Player Image Unavailable
              </div>
            )}
          </div>
          <div className="w-2/3">
            <h1 className={`font-extrabold mb-4 flex flex-wrap gap-2`}>
              {filteredPlayer?.name.split(' ').map((namePart, index) => (
                <span 
                  key={index} 
                  className={`
                    ${index > 0 ? 'text-yellow-300' : 'text-white'}
                    ${filteredPlayer.name.split(' ').length > 3 ? 'text-4xl' : 'text-6xl'}
                  `}
                >
                  {namePart}
                </span>
              ))}
            </h1>
            <div className="text-xl flex items-center space-x-4 opacity-80">
              <span>{filteredPlayer?.role.toUpperCase()}</span>
              <span>•</span>
              <span>{filteredPlayer?.country.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4 py-6 bg-white shadow-sm">
        <TabButton tab="bio" icon={UserCircle2}>Biography</TabButton>
        <TabButton tab="stats" icon={TrophyIcon}>Statistics</TabButton>
        <TabButton tab="ground" icon={MapPinIcon}>Ground Performance</TabButton>
      </div>

      {/* Content Area */}
      <div className="p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default PlayerProfile;