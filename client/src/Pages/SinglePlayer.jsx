import React from 'react';
import { useLocation } from 'react-router-dom';

const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const SinglePlayer = () => {
  const { state } = useLocation();
  const player = state?.player;
  // console.log(player)
  if (!player) {
    return <div className="text-center mt-10 text-xl">No player data available</div>;
  }

  return (
    <div className="m-24 max-w-5xl mx-auto p-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-xl">
      <div className="flex flex-col md:flex-row items-center mb-8">
        <img
          src={player.img}
          alt={player.name}
          className="w-36 h-36 rounded-full object-cover border-4 border-gray-400 shadow-lg"
        />
        <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{player.name}</h1>
          <p className="text-xl text-gray-600 mb-1">Role: <span className="font-semibold">{capitalizeFirstLetter(player.role)}</span></p>
          <p className="text-xl text-gray-600">Country: <span className="font-semibold">{player.country}</span></p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Batting Stats</h2>
          <p className="text-lg text-gray-700 mb-2"><span className="font-semibold">Runs Scored:</span> {player.runsScored}</p>
          <p className="text-lg text-gray-700 mb-2"><span className="font-semibold">Balls Faced:</span> {player.ballsFaced}</p>
          <p className="text-lg text-gray-700 mb-2"><span className="font-semibold">Batting Avg:</span> {player.battingAvg.$numberDecimal}</p>
          <p className="text-lg text-gray-700"><span className="font-semibold">Strike Rate:</span> {player.strikeRate.$numberDecimal}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Additional Stats</h2>
          <p className="text-lg text-gray-700 mb-2"><span className="font-semibold">Matches Played:</span> {player.matchesPlayed}</p>
          <p className="text-lg text-gray-700 mb-2"><span className="font-semibold">Wickets Taken:</span> {player.wicketsTaken}</p>
          <p className="text-lg text-gray-700 mb-2"><span className="font-semibold">Bowling Skill:</span> {player.bowlingSkill || 'N/A'}</p>
          <p className="text-lg text-gray-700"><span className="font-semibold">Date of Birth:</span> {new Date(player.DOB).toLocaleDateString()}</p>
        </div>
      </div>
      {player && player?.yearlyStats?.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Yearly Stats</h2>
          <ul className="list-disc list-inside">
            {player.yearlyStats.map((stat, index) => (
              <li key={index} className="text-lg text-gray-700">
                <span className="font-semibold">{stat.year}:</span> {stat.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SinglePlayer;
