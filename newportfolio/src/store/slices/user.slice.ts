import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Dispatch, PayloadAction } from '@reduxjs/toolkit'
import type { UserType } from '@/types';

const SERVERURL = import.meta.env.VITE_SERVERURL || "http://localhost:4000";

type UserState = {
  loading: boolean;
  user: UserType | null;
  error: string | null;
};

const initialState: UserState = {
  loading: false,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserRequest(state) {
      state.loading = true;
      state.user = null;
      state.error = null;
    },
    getUserSuccess(state, action: PayloadAction<UserType>) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    getUserFailed(state, action: PayloadAction<string | null>) {
      state.loading = false;
      state.user = state.user;
      state.error = action.payload;
    },
  },
});

export const getUser = () => async (dispatch:Dispatch) => {
  dispatch(userSlice.actions.getUserRequest());

  try {
    const { data } = await axios.get(
      `${SERVERURL}/user/profile/portfolio`
    );

    dispatch(userSlice.actions.getUserSuccess(data.user));
  } catch (error:any) {
    dispatch(userSlice.actions.getUserFailed(error));
  }
};

export default userSlice.reducer;
