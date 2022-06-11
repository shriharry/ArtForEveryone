import axios from "axios";
import { authHeader, getAPIURI } from "../../../utils/auth.util";

const drawingAPI = `${getAPIURI}/api/drawing`;

export function getAllDrawings() {
  return axios.request({
    method: "get",
    url: drawingAPI,
    headers: authHeader(),
  });
}

export function saveDrawing(data) {
  return axios.request({
    method: "post",
    url: drawingAPI,
    data,
    headers: authHeader(),
  });
}

export function deleteDrawing(drawingId) {
  return axios.request({
    method: "delete",
    url: `${drawingAPI}/${drawingId}`,
    headers: authHeader(),
  });
}
