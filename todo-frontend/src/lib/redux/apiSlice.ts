import { createApi } from "@reduxjs/toolkit/query";
import { axiosBaseQuery } from "../service/axiosBaseQuery";

export const apiSlice = createApi({
  reducerPath: `apiSlice`,
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: [""],
});
