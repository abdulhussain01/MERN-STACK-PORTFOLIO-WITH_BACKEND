
import { createSlice, type Dispatch, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { ExperienceType } from '@/types';

const SERVERURL = import.meta.env.VITE_SERVERURL || "http://localhost:4000";

type TimelineState = {
  loading: boolean;
  timeline: ExperienceType[];
  error: string | null;
  message: string | null;
};

const initialState: TimelineState = {
  loading: false,
  timeline: [],
  error: null,
  message: null,
};

const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    getAllTimelineRequest(state) {
      state.loading = true;
      state.timeline = [];
      state.error = null;
    },
    getAllTimelineSuccess(state, action:PayloadAction<ExperienceType[]>) {
      state.loading = false;
      state.timeline = action.payload;
      state.error = null;
    },
    getAllTimelineFailed(state, action:PayloadAction<string | null>) {
      state.loading = false;
      state.timeline = state.timeline;
      state.error = action.payload;
    },
  },
});

export const getAllTimeline = () => async (dispatch:Dispatch) => {
  dispatch(timelineSlice.actions.getAllTimelineRequest(undefined));
  try {
    const { data } = await axios.get(
      `${SERVERURL}/timeline/getall`
    );

    dispatch(timelineSlice.actions.getAllTimelineSuccess(data.timeline));
    // dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error:any) {
    dispatch(
      timelineSlice.actions.getAllTimelineFailed(error.response?.data?.message)
    );
  }
};

// export const clearAllTimelineErrors = () => async (dispatch:Dispatch) => {
//   // dispatch(timelineSlice.actions.clearAllErrors());
// };
// export const resetTimelineSlice = () => async (dispatch:Dispatch) => {
//   // dispatch(timelineSlice.actions.resetTimelineSlice());
// };

export default timelineSlice.reducer;
