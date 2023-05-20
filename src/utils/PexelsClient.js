import { createClient } from "pexels";
const pexelsKey = import.meta.env.VITE_PEXELS_KEY;

export const client = createClient(pexelsKey);

// All requests made with the client will be authenticated
