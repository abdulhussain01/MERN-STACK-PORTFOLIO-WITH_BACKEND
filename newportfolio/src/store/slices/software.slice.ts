import { createSlice, type Dispatch, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { ToolsType } from '@/types';

const SERVERURL = import.meta.env.VITE_SERVERURL || "http://localhost:4000";

type SoftwareState = {
  loading: boolean;
  softwareApplication: ToolsType[];
  error: string | null;
  message: string | null;
};

const initialState: SoftwareState = {
  loading: false,
  softwareApplication: [],
  error: null,
  message: null,
};

const softwareApplicationSlice = createSlice({
  name: "softwares",
  initialState,
  reducers: {
    getAllSoftwareApplicationRequest(state) {
      state.loading = true;
      state.softwareApplication = [];
      state.error = null;
    },
    getAllSoftwareApplicationSuccess(state, action: PayloadAction<ToolsType[]>) {
      state.loading = false;
      state.softwareApplication = action.payload;
      state.error = null;
    },
    getAllSoftwareApplicationFailed(state, action: PayloadAction<string | null>) {
      state.loading = false;
      state.softwareApplication = state.softwareApplication;
      state.error = action.payload;
    },
    clearAllErrors(state, ) {
      state.error = null;
      state.softwareApplication = state.softwareApplication;
    },
  },
});

export const getAllSoftwareApplication = () => async (dispatch:Dispatch) => {
  dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationRequest(undefined));
  try {
    const { data } = await axios.get(
     `${SERVERURL}/softwareapplication/getall`,
      { withCredentials: true }
    );

    dispatch(
      softwareApplicationSlice.actions.getAllSoftwareApplicationSuccess(
        data.softwareApplication
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error: any) {
    dispatch(
      softwareApplicationSlice.actions.getAllSoftwareApplicationFailed(
        error.response.data.message
      )
    );
  }
};

export default softwareApplicationSlice.reducer;
