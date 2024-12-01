const URI = "http://localhost:5000"
import axios from "axios"

export const getAllBatters = async () => {
    try {
        const res = axios.get(`${URI}/api/fetchMatch/batsmen`);
        return res;
    } catch (error) {
        console.log(error);
    }
}
export const getAllBowlers = async () => {
    try {
        const res = axios.get(`${URI}/api/fetchMatch/bowlers`);
        return res;
    } catch (error) {
        console.log(error);
    }
}