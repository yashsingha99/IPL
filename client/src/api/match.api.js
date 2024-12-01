import axios from "axios";

const URI = "http://localhost:5000/api/fetchMatch";

// Fetch all batters
export const getAllBatters = async () => {
  try {
    const res = await axios.get(`${URI}/batsmen`);
    return res.data;
  } catch (error) {
    console.error("Error fetching all batters:", error);
  }
};

// Fetch all bowlers
export const getAllBowlers = async () => {
  try {
    const res = await axios.get(`${URI}/bowlers`);
    return res.data;
  } catch (error) {
    console.error("Error fetching all bowlers:", error);
  }
};

// Fetch a specific batter
export const getBatter = async (name) => {
  try {
    const res = await axios.get(`${URI}/batsman/${name}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching batter data:", error);
  }
};

// Fetch a specific bowler
export const getBowler = async (name) => {
  try {
    const res = await axios.get(`${URI}/bowlers/${name}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching bowler data:", error);
  }
};

export const getBowlerById= async (id) => {
  try {
    const res = await axios.get(`${URI}/bowler/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching bowler data:", error);
  }
};

export const getBatterById = async (id) => {
  try {
    const res = await axios.get(`${URI}/batsmen/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching bowler data:", error);
  }
};

export const getPlayerVenue = async (name) => {
  try {
    const res = await axios.get(`${URI}/venue/${name}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching bowler data:", error);
  }
};
export const venueById = async (id) => {
  try {
    
    const res = await axios.get(`${URI}/venueById/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching bowler data:", error);
  }
};

export const getbattle = async(data) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/filterBattle/batsman/${data.batsman}/bowler/${data.bowler}}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching bowler data:", error);
  }
}