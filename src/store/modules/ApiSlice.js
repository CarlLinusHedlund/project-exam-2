import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../utils/Supabase";

const supabaseApi = createApi({
  reducerPath: "SupabaseApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Venues", "User", "Bookings"],
  endpoints: (builder) => ({
    getVenues: builder.query({
      queryFn: async (user_id) => {
        const { data, error } = await supabase
          .from("venues")
          .select("*")
          .eq("owner_id", user_id);
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
      providesTags: ["Venues"],
    }),
    getOwnersBookings: builder.query({
      queryFn: async (userId) => {
        const { data, error } = await supabase
          .rpc("get_bookings_with_owner_and_venue_details", { user_id: userId })
          .select("*")
          .order("created_at", { ascending: false });
        if (error) {
          console.log(error);
          throw { error };
        }
        return { data };
      },
      providesTags: ["Bookings"],
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
      providesTags: ["User"],
    }),
    getTodaysChekinChekout: builder.query({
      queryFn: async (owner_id) => {
        const { data, error } = await supabase.rpc(
          "get_checkins_checkouts_today",
          { owner_id: owner_id }
        );
        if (error) {
          console.log(error);
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
      providesTags: ["User"],
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
    bookVenue: builder.mutation({
      queryFn: async ({ from, to, user_id, id }) => {
        const { data, error } = await supabase
          .from("bookings")
          .insert({
            booking_start_date: from.toString(),
            booking_end_date: to.toString(),
            booked_by: user_id,
            venue_id: id,
          })
          .select()
          .single();
        if (error) {
          throw { error };
        }
        console.log(data);
        return { data };
      },
      invalidatesTags: ["Venues", "Bookings", "User"],
    }),
    deleteVenue: builder.mutation({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from("venues")
          .delete()
          .eq("id", id);
        if (error) {
          console.log(error);
          throw { error };
        }
        console.log("tst", data);
        return { data };
      },
      invalidatesTags: ["Venues", "Bookings", "User"],
    }),
    deleteBooking: builder.mutation({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from("bookings")
          .delete()
          .eq("id", id);
        if (error) {
          console.log(error);
          throw { error };
        }
        console.log("tst", data);
        return { data };
      },
      invalidatesTags: ["Venues", "Bookings", "User"],
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
      invalidatesTags: ["Venues"],
    }),
    updateBookingStatus: builder.mutation({
      queryFn: async ({ status, bookingId }) => {
        const { data, error } = await supabase
          .from("bookings")
          .update({ status: status })
          .eq("id", bookingId)
          .select();
        if (error) {
          console.log(error);
          throw { error };
        }
        console.log(data);
        return { data };
      },
      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const {
  useGetTodaysChekinChekoutQuery,
  useUpdateVenueMutation,
  useDeleteVenueMutation,
  useUploadFilesMutation,
  useGetVenuesQuery,
  useGetSingleVenueQuery,
  useGetUserQuery,
  useGetProfileQuery,
  usePublishVenueMutation,
  useDeleteBookingMutation,
  useGetOwnersBookingsQuery,
  useUpdateBookingStatusMutation,
  useBookVenueMutation,
} = supabaseApi;

export { supabaseApi };
