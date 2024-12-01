import React, { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";
import { getPlayer } from "../api/player.api";
import { FaUserAlt } from "react-icons/fa";
import "../styles/Player.css";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await getPlayer({ allPlayer: true });
        // console.log(res.data.players);
        setPlayers(res.data.players);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const handlePlayerClick = (player) => {
    navigate(`/player/${player?._id}`, { state: { player } });
  };

  if (loading) return <h2 className="text-center mb-4 mt-4">Loading...</h2>;
  if (error) return <h2 className="text-center mb-4 mt-4">Error: {error}</h2>;

  return (
    <>
      <div className="conta">
        <h2>Players</h2>
        <div className="stadium-grid">
          {players.map((player) =>{
          if(player?.img !== "" && player?.img !== undefined)
          
            return(
            // <Link to={`/player/${player._id}`} key={player._id}>
            <div key={player._id}>
              <div className="stadium-card" key={player._id} onClick={() => handlePlayerClick(player)}>
                <div className="stadium-img">
                  {player.img ? (
                    <img
                      src={player.img}
                      alt={player.name}
                      className="player-img object-fill"
                    />
                  ) : (
                    <FaUserAlt className="player-icon" />
                  )}
                </div>
                <div className="stadium-details">
                  <h3>{player.name}</h3>
                  <p>
                    Role: {player.role} <br />
                    Strike Rate: 
                    {player.strikeRate && player.strikeRate.$numberDecimal
                      ? parseFloat(player.strikeRate.$numberDecimal)
                      : "N/A"} <br />
                  </p>
                  <h4>Matches Played: {player.matchesPlayed || "N/A"}</h4>
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>
    </>
  );
};

export default Players;
