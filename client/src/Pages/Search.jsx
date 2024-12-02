import React, { useState, useEffect } from "react";
import { getBatter, getBowler } from "../api/match.api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, Volleyball } from "lucide-react";
import { motion } from "framer-motion";
import PlayerProfile from "../components/PlayerProfile";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  useEffect(() => {
    if (name) {
      setSearchTerm(name);
      handleSearch(name);
    }
  }, [name]);

  const handleSearch = async (term) => {
    if (!term.trim()) return;

    setIsLoading(true);
    try {
      const fetchedBattingResults = await getBatter(term);
      const fetchedBowlingResults = await getBowler(term);

      // Replace this logic with what you need to do with the results
      console.log("Batting Results:", fetchedBattingResults);
      console.log("Bowling Results:", fetchedBowlingResults);
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (searchTerm.trim()) {
      navigate(`?name=${searchTerm}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <div className=" mb-96 max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl">
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
            onClick={handleSubmit}
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
      </div>
      {/* Player Profile Component */}
      {name && <PlayerProfile />}
    </>
  );
};

export default SearchBox;
