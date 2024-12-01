import axios from "axios";
import Cookies from "js-cookie";
const URI = "http://localhost:5000";

export const Login = async (user) => {
  try {
    const res = await axios.post(`${URI}/api/user/`, user);
    // console.log(res)
    Cookies.set("user", JSON.stringify(res.data.token));  
    return res;
  } catch (error) {
    console.log("login", error);
    error = { ...error, status: 400 };
    return error;
  }
};

// Register function
export const Register = async (user) => {
  try {
    const res = await axios.post(`${URI}/api/user/register`, user);
  
    if (res.status === 200) {
      await Login(user);
    }

    return res;
  } catch (error) {
    error = { ...error, status: 400 };
    return error;
  }
};

// Other functions remain unchanged
export const GetCurrentUser = async (data) => {
  try {
    const res = await axios.post(`${URI}/app/user/getCurrentUser`, data);
    return res;
  } catch (error) {
    console.log("getCurrentUser", error);
  }
};

export const FetchAllUsers = async (data) => {
  try {
    const res = await axios.post(`${URI}/app/user/fetchAllUsers`, data);
    return res;
  } catch (error) {
    console.log("fetchAllUsers", error);
  }
};
