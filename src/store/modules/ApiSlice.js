import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../utils/Supabase";

const supabaseApi = createApi({
  reducerPath: "SupabaseApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getVenues: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase.from("venues").select("*");
        if (error) {
          throw { error };
        }
        return { data };
      },
    }),
    getSingleVenue: builder.query({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from("venues")
          .select("*")
          .eq("id", id);
        if (error) {
          throw { error };
        }

        return { data };
      },
    }),
    getUser: builder.query({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id);
        if (error) {
          throw { error };
        }
        return { data };
      },
    }),
    getProfile: builder.query({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id);
        if (error) {
          throw { error };
        }
        return { data };
      },
    }),
    publishVenue: builder.mutation({
      queryFn: async ({
        user,
        location,
        // meta,
        title,
        description,
        // media,
        price_per_night,
        max_guests,
        type,
      }) => {
        const { data, error } = await supabase
          .from("venues")
          .insert({
            owner_id: user,
            location: location,
            title: title,
            description: description,
            price_per_night: price_per_night,
            max_guest: max_guests,
            type: type,
          })
          .select();
        if (error) {
          console.log(error);
          throw { error };
        }
        console.log(data);
        return { data };
      },
    }),
  }),
});

export const {
  useGetVenuesQuery,
  useGetSingleVenueQuery,
  useGetUserQuery,
  useGetProfileQuery,
  usePublishVenueMutation,
} = supabaseApi;

export { supabaseApi };
