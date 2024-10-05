import axios from "axios";

const API_URL = "http://localhost:8000/api/";

export const fetchActivities = async () => {
  var activies = await axios.get(`${API_URL}activity`);
  //   alert(JSON.stringify(activies.data, null, 2));
  return activies;
};
