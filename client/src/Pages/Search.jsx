import React, { useState } from "react";
import { getBatter, getBowler } from "../api/match.api";
import { Link } from "react-router-dom";
import { Search, User, Trophy, Volleyball } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [battingResults, setBattingResults] = useState(null);
  const [bowlingResults, setBowlingResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") return;

    setIsLoading(true);
    try {
      const fetchedBattingResults = await getBatter(searchTerm);
      const fetchedBowlingResults = await getBowler(searchTerm);
    
      setBattingResults(fetchedBattingResults || null);
      setBowlingResults(fetchedBowlingResults || null);
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      {/* Search Input */}
      <div className="flex justify-center items-center space-x-2 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="Search for a player"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none flex items-center space-x-2"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin">
              <Volleyball className="h-5 w-5" />
            </div>
          ) : (
            <>
              <Search className="h-5 w-5" />
              <span>Search</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {(battingResults || bowlingResults) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Batting Results */}
            {battingResults && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-blue-50 p-4 rounded-lg"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Trophy className="text-blue-600 h-6 w-6" />
                  <h2 className="text-lg font-semibold text-blue-800">Batting Stats: {battingResults.name}</h2>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {battingResults.stats &&
                    Object.keys(battingResults.stats).map((year) => (
                      <Link
                        key={year}
                        to={`/player/?batingId=${battingResults._id}&bowlingId=${
                          bowlingResults?._id || "_"
                        }&year=${year}`}
                        className="bg-white shadow-sm rounded-md p-2 text-center hover:bg-blue-100 transition-colors"
                      >
                        <div className="font-medium text-blue-600">{year}</div>
                      </Link>
                    ))}
                </div>
              </motion.div>
            )}

            {/* Bowling Results */}
            {bowlingResults && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-green-50 p-4 rounded-lg"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Trophy className="text-green-600 h-6 w-6" />
                  <h2 className="text-lg font-semibold text-green-800">Bowling Stats: {bowlingResults.name}</h2>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {bowlingResults.stats &&
                    Object.keys(bowlingResults.stats).map((year) => (
                      <Link
                        key={year}
                        to={`/player/?batingId=${battingResults._id}&bowlingId=${
                          bowlingResults?._id || "_"
                        }&year=${year}`}
                        className="bg-white shadow-sm rounded-md p-2 text-center hover:bg-green-100 transition-colors"
                      >
                        <div className="font-medium text-green-600">{year}</div>
                      </Link>
                    ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Results State */}
      {!battingResults && !bowlingResults && !isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 p-4 bg-gray-50 rounded-lg"
        >
          <Search className="mx-auto h-10 w-10 text-gray-400 mb-2" />
          <p>Start typing to search for players!</p>
        </motion.div>
      )}
    </div>
  );
};

export default SearchBox;