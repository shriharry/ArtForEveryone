import axios from "axios";
import { getAPIURI } from "../../../utils/auth.util";

const authAPI = `${getAPIURI}/api/auth`;

export function loginUser(data) {
  return axios.request({
    method: "post",
    url: authAPI + "/sign-in",
    data,
  });
}

export function registerUser(data) {
  return axios.request({
    method: "post",
    url: authAPI + "/sign-up",
    data,
  });
}
