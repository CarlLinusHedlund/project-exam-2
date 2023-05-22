import axios from "axios";

const pexelsKey = import.meta.env.VITE_PEXELS_KEY;
const instance = axios.create({
  baseURL: "https://api.pexels.com",
});

instance.defaults.headers.common["Authorization"] = pexelsKey;

export default instance;
