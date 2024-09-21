import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    error: null,
  },
  reducers: {
    getUserRequest(state, action) {
      state.loading = true;
      state.user = {};
      state.error = null;
    },
    getUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    getUserFailed(state, action) {
      state.loading = false;
      state.user = state.user;
      state.error = action.payload;
    },
  },
});

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.getUserRequest());

  try {
    const { data } = await axios.get(
      "https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/user/profile/portfolio"
    );

    dispatch(userSlice.actions.getUserSuccess(data.user));
  } catch (error) {
    dispatch(userSlice.actions.getUserFailed(error));
  }
};

export default userSlice.reducer;
