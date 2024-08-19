import { ssoDtoType } from "../../utils/types";
import { apiSlice } from "../redux/apiSlice";
import { signIn, signUp } from "./endpoints";

export const ssoService = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<any, ssoDtoType>({
      query: (payload) => ({
        ...signIn,
        data: { ...payload },
      }),
    }),
    signUp: build.mutation<any, ssoDtoType>({
      query: (payload) => ({
        ...signUp,
        data: { ...payload },
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = ssoService;
