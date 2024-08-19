import { createSlice } from "@reduxjs/toolkit";
import { ssoService } from "../service/ssoService";
import { LOCAL_KEYS, setLocalValue } from "../../utils/reduxStorage";

type InitialStateType = {
  accessToken?: string | null;
};

const initialState: InitialStateType = {
  accessToken: null,
};

const ssoSlice = createSlice({
  name: "sso",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      ssoService.endpoints.signIn.matchFulfilled,
      (state, action) => {
        const { payload } = action;
        state.accessToken = payload?.accessToken;
        setLocalValue(LOCAL_KEYS.ACCESS_TOKEN, payload?.accessToken);
      }
    );
  },
});

export default ssoSlice.reducer;
