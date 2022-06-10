import axios from "axios";

export function loginUser(data) {
  return axios.request({
    method: "post",
    url: process.env.API_URL + "/api/auth/sign-in",
    data,
  });
}

export function registerUser(data) {
  return axios.request({
    method: "post",
    url: process.env.API_URL + "/api/auth/sign-up",
    data,
  });
}
