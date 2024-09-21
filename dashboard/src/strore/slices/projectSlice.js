import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    project: [],
    singleProject: {},
    error: null,
    message: null,
  },
  reducers: {
    getAllProjectRequest(state, action) {
      state.loading = true;
      state.project = [];
      state.error = null;
    },
    getAllProjectSuccess(state, action) {
      state.loading = false;
      state.project = action.payload;
      state.error = null;
    },
    getAllProjectFailed(state, action) {
      state.loading = false;
      state.project = state.project;
      state.error = action.payload;
    },

    // getsingle project

    getSingleProjectRequest(state, action) {
      state.loading = true;
      state.singleProject = {};
      state.error = null;
    },
    getSingleProjectSuccess(state, action) {
      state.loading = false;
      state.singleProject = action.payload;
      state.error = null;
    },
    getSingleProjectFailed(state, action) {
      state.loading = false;
      state.singleProject = state.singleProject;
      state.error = action.payload;
    },

    //delete project
    deleteProjectRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    deleteProjectSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    deleteProjectFailed(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },
    //update project
    updateProjectRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    updateProjectSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updateProjectFailed(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },
    //Add project

    addProjectRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    addProjectSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    addProjectFailed(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },

    resetProjectSlice(state, action) {
      state.error = null;
      state.project = state.project;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.project = state.project;
    },
  },
});

export const getAllProjects = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectRequest());
  try {
    const { data } = await axios.get(
      "https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/project/getall",
      { withCredentials: true }
    );

    dispatch(projectSlice.actions.getAllProjectSuccess(data.project));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.getAllProjectFailed(error.response.data.message)
    );
  }
};

export const addNewProject = (projectData) => async (dispatch) => {
  dispatch(projectSlice.actions.addProjectRequest());
  try {
    const { data } = await axios.post(
      `https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/project/add`,
      projectData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(projectSlice.actions.addProjectSuccess(data.message));

    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.addProjectFailed(error.response.data.message)
    );
  }
};

export const deleteProject = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.deleteProjectRequest());
  try {
    const { data } = await axios.delete(
      `https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/project/delete/${id}`,
      { withCredentials: true }
    );

    dispatch(projectSlice.actions.deleteProjectSuccess(data.message));

    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.deleteProjectFailed(error.response.data.message)
    );
  }
};
export const updateProject = (id, newData) => async (dispatch) => {
  dispatch(projectSlice.actions.updateProjectRequest());
  try {
    const { data } = await axios.put(
      `https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/project/update/${id}`,
      newData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(projectSlice.actions.updateProjectSuccess(data.message));

    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.updateProjectFailed(error.response.data.message)
    );
  }
};

export const clearAllProjectErrors = () => async (dispatch) => {
  dispatch(projectSlice.actions.clearAllErrors());
};

export const resetProjectSlice = () => async (dispatch) => {
  dispatch(projectSlice.actions.resetProjectSlice());
};

export default projectSlice.reducer;
