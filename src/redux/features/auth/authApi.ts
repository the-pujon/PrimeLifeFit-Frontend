import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),

    signin: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "/auth/users",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),

    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/auth/users/${userId}/role`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} = authApi;
