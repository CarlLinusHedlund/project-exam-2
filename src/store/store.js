import { configureStore } from "@reduxjs/toolkit";
import { supabaseApi } from "./modules/ApiSlice";
import { geolocationReducer } from "./modules/GeoloactionSlice";
import { pexelsReducer } from "./modules/PexelsSlice";
import { profileReducer } from "./modules/ProfileSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [supabaseApi.reducerPath]: supabaseApi.reducer,
    geolocation: geolocationReducer,
    pexelsImg: pexelsReducer,
    profileData: profileReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(supabaseApi.middleware),
});
