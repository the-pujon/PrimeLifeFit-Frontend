import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // existing endpoints
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

    // new endpoints
    getAllUsers: builder.query({
      query: () => ({
        url: "/auth/users",
        method: "GET",
      }),
    }),

    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/auth/users/${userId}/role`,
        method: "PATCH",
        body: { role },
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} = authApi;
