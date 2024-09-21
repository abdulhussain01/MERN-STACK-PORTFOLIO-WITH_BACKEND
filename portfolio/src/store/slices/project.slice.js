import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    projects: [],
    singleProject: {},
    error: null,
  },
  reducers: {
    getProjectRequest(state, action) {
      state.loading = true;
      state.projects = [];
      state.error = null;
    },
    getProjectSuccess(state, action) {
      state.loading = false;
      state.projects = action.payload;
      state.error = null;
    },
    getProjectFailed(state, action) {
      state.loading = false;
      state.projects = state.projects;
      state.error = action.payload;
    },
  },
});

export const getProject = () => async (dispatch) => {
  dispatch(projectSlice.actions.getProjectRequest());

  try {
    const { data } = await axios.get(
      "https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/project/getall"
    );

    dispatch(projectSlice.actions.getProjectSuccess(data.project));
  } catch (error) {
    dispatch(projectSlice.actions.getProjectFailed(error));
  }
};

export default projectSlice.reducer;
