import React, { useState } from 'react';
import { getbattle } from '../api/match.api';
import { Sword, User, Search, Loader } from 'lucide-react';
import CricketChart from "./CricketChart"
function Battle() {
  const [batsman, setBatsman] = useState('');
  const [bowler, setBowler] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
 const[battingData, setBattingData] = useState();
 const[bowlingData, setBowlingData] = useState();
  const fetchData = async () => {
    if (batsman.trim() === '' || bowler.trim() === '') return alert('Please enter both Batsman and Bowler!');
    setLoading(true);
    try {
      const data = { batsman: batsman.trim(), bowler: bowler.trim() };
      const res = await getbattle(data);
      setResult(res);
      setBattingData(res.batterdata.stats.years)
      setBowlingData(res.bowlerdata.stats.years)
    } catch (error) {
      console.error('Error fetching battle data:', error);
      alert('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  console.log(battingData);
  console.log(bowlingData);
  
  
  

  return (
    <div className="p-6 w-full mx-auto">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2 flex items-center justify-center">
          <Sword className="w-6 h-6 mr-2 text-blue-500" />
          Battle Analysis
        </h1>
        <p className="text-gray-600">Compare performances between a batsman and a bowler.</p>
      </div>

      {/* Input Section */}
      <div className="flex flex-col items-center w-full ">
      <div className=" w-[30%] ">
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
          className={`w-full py-2 text-white rounded-lg flex items-center justify-center transition 
            ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5 mr-2" />}
          {loading ? 'Loading...' : "Let's Battle"}
        </button>
      </div>
      </div>

      {/* Result Section */}
      {result && (
        <div className='w-full flex' >
          <CricketChart data={battingData} isBettle  />
          <CricketChart data={bowlingData} isBettle  isBowler/>
        </div>
      )}
    </div>
  );
}

export default Battle;
