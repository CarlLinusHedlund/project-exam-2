import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../utils/Supabase";

const supabaseApi = createApi({
  reducerPath: "SupabaseApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Venues", "Bookings"],
  endpoints: (builder) => ({
    getVenues: builder.query({
      queryFn: async ({ type, user_id }) => {
        if (type === "getUserVenues") {
          const { data, error } = await supabase
            .from("venues")
            .select("*")
            .eq("owner_id", user_id);
          if (error) {
            throw { error };
          }
          return { data };
        }

        const { data, error } = await supabase.from("venues").select("*");
        if (error) {
          throw { error };
        }
        return { data };
      },
      providesTags: ["Venues"],
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
        user_id,
        location,
        meta,
        title,
        description,
        price_per_night,
        max_guests,
        type,
      }) => {
        const { data, error } = await supabase
          .from("venues")
          .insert({
            owner_id: user_id,
            location: location,
            title: title,
            description: description,
            price_per_night: price_per_night,
            max_guest: max_guests,
            type: type,
            meta: meta,
          })
          .select()
          .single();
        if (error) {
          throw { error };
        }
        console.log(data);
        return { data };
      },
      invalidatesTags: ["Venues"],
    }),
    deleteVenue: builder.mutation({
      queryFn: async ({ venue_id }) => {
        const { data, error } = await supabase
          .from("venues")
          .delete()
          .eq("id", venue_id);
        if (error) {
          throw { error };
        }
        // console.log(data);
        return { data };
      },
      invalidatesTags: ["Venues"],
    }),
    uploadFiles: builder.mutation({
      queryFn: async ({ file, venue_id, user_id }) => {
        const { data, error } = await supabase.storage
          .from("venue_media")
          .upload(`${user_id}/${venue_id}/${file.name}${Date.now()}`, file);
        if (error) {
          throw { error };
        }
        return { data };
      },
    }),
    updateVenue: builder.mutation({
      queryFn: async ({ type, media, venue_id }) => {
        if (type === "addMedia") {
          const { data, error } = await supabase
            .from("venues")
            .update({ media: media })
            .eq("id", venue_id)
            .select();
          if (error) {
            throw { error };
          }
          return { data };
        }
      },
    }),
  }),
});

export const {
  useUpdateVenueMutation,
  useDeleteVenueMutation,
  useUploadFilesMutation,
  useGetVenuesQuery,
  useGetSingleVenueQuery,
  useGetUserQuery,
  useGetProfileQuery,
  usePublishVenueMutation,
} = supabaseApi;

export { supabaseApi };
