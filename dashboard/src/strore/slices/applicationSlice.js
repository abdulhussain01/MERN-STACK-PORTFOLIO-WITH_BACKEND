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

    //delete softwareApplication
    deleteSoftwareApplicationRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    deleteSoftwareApplicationSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    deleteSoftwareApplicationFailed(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },
    //Add softwareApplication

    addSoftwareApplicationRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    addSoftwareApplicationSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    addSoftwareApplicationFailed(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },

    resetSoftwareApplicationSlice(state, action) {
      state.error = null;
      state.softwareApplication = state.softwareApplication;
      state.message = null;
      state.loading = false;
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

export const addNewSoftwareApplication =
  (softwareApplicationData) => async (dispatch) => {
    dispatch(softwareApplicationSlice.actions.addSoftwareApplicationRequest());
    try {
      const { data } = await axios.post(
        `https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/softwareapplication/add`,
        softwareApplicationData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(
        softwareApplicationSlice.actions.addSoftwareApplicationSuccess(
          data.message
        )
      );

      dispatch(softwareApplicationSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        softwareApplicationSlice.actions.addSoftwareApplicationFailed(
          error.response.data.message
        )
      );
    }
  };

export const deleteSoftwareApplication = (id) => async (dispatch) => {
  dispatch(softwareApplicationSlice.actions.deleteSoftwareApplicationRequest());
  try {
    const { data } = await axios.delete(
      `https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/softwareapplication/delete/${id}`,
      { withCredentials: true }
    );

    dispatch(
      softwareApplicationSlice.actions.deleteSoftwareApplicationSuccess(
        data.message
      )
    );

    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.deleteSoftwareApplicationFailed(
        error.response.data.message
      )
    );
  }
};

export const clearAllSoftwareApplicationErrors = () => async (dispatch) => {
  dispatch(softwareApplicationSlice.actions.clearAllErrors());
};

export const resetSoftwareApplicationSlice = () => async (dispatch) => {
  dispatch(softwareApplicationSlice.actions.resetSoftwareApplicationSlice());
};

export default softwareApplicationSlice.reducer;
