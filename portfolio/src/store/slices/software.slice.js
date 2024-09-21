import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const softwareApplicationSlice = createSlice({
  name: "softwareApplication",
  initialState: {
    loading: false,
    softwareApplication: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllSoftwareApplicationRequest(state, action) {
      state.loading = true;
      state.softwareApplication = [];
      state.error = null;
    },
    getAllSoftwareApplicationSuccess(state, action) {
      state.loading = false;
      state.softwareApplication = action.payload;
      state.error = null;
    },
    getAllSoftwareApplicationFailed(state, action) {
      state.loading = false;
      state.softwareApplication = state.softwareApplication;
      state.error = action.payload;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.softwareApplication = state.softwareApplication;
    },
  },
});

export const getAllSoftwareApplication = () => async (dispatch) => {
  dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationRequest());
  try {
    const { data } = await axios.get(
      "https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/softwareapplication/getall",
      { withCredentials: true }
    );

    dispatch(
      softwareApplicationSlice.actions.getAllSoftwareApplicationSuccess(
        data.softwareApplication
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.getAllSoftwareApplicationFailed(
        error.response.data.message
      )
    );
  }
};

export default softwareApplicationSlice.reducer;
