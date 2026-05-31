import { createSlice, type Dispatch, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { ProjectType } from '@/types';

const SERVERURL = import.meta.env.VITE_SERVERURL || "http://localhost:4000";

type ProjectState = {
  loading: boolean;
  projects: ProjectType[];
  singleProject: ProjectType | null;
  error: string | null;
};

const initialState: ProjectState = {
  loading: false,
  projects: [],
  singleProject: null,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    getProjectRequest(state) {
      state.loading = true;
      state.projects = [];
      state.error = null;
    },
    getProjectSuccess(state, action:PayloadAction<ProjectType[]>) {
      state.loading = false;
      state.projects = action.payload;
      state.error = null;
    },
    getProjectFailed(state, action:PayloadAction<string | null>) {
      state.loading = false;
      state.projects = state.projects;
      state.error = action.payload;
    },
  },
});

export const getProject = () => async (dispatch:Dispatch) => {
  dispatch(projectSlice.actions.getProjectRequest(undefined));

  try {
    const { data } = await axios.get(
      `${SERVERURL}/project/getall`
    );

    dispatch(projectSlice.actions.getProjectSuccess(data.project));
  } catch (error:any) {
    dispatch(projectSlice.actions.getProjectFailed(error));
  }
};

export default projectSlice.reducer;
