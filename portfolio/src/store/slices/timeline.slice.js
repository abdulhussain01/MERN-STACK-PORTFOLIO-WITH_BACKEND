import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    loading: false,
    timeline: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllTimelineRequest(state, action) {
      state.loading = true;
      state.timeline = [];
      state.error = null;
    },
    getAllTimelineSuccess(state, action) {
      state.loading = false;
      state.timeline = action.payload;
      state.error = null;
    },
    getAllTimelineFailed(state, action) {
      state.loading = false;
      state.timeline = state.timeline;
      state.error = action.payload;
    },
  },
});

export const getAllTimeline = () => async (dispatch) => {
  dispatch(timelineSlice.actions.getAllTimelineRequest());
  try {
    const { data } = await axios.get(
      "https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/timeline/getall"
    );

    dispatch(timelineSlice.actions.getAllTimelineSuccess(data.timeline));
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.getAllTimelineFailed(error.response?.data?.message)
    );
  }
};

export const clearAllTimelineErrors = () => async (dispatch) => {
  dispatch(timelineSlice.actions.clearAllErrors());
};
export const resetTimelineSlice = () => async (dispatch) => {
  dispatch(timelineSlice.actions.restTimelineSlice());
};

export default timelineSlice.reducer;
