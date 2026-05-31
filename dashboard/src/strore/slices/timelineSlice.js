import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BackendUrl = import.meta.env.VITE_BACKENDURL


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

    // update timeline

    updateTimelineRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    updateTimelineSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updateTimelineFailed(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },


    //delete timeline
    deleteTimelineRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    deleteTimelineSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    deleteTimelineFailed(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },
    //Add timeline

    addTimelineRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    addTimelineSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    addTimelineFailed(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },
    restTimelineSlice(state, action) {
      state.error = null;
      state.timeline = state.timeline;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.timeline = state.timeline;
    },
  },
});

export const getAllTimeline = () => async (dispatch) => {
  dispatch(timelineSlice.actions.getAllTimelineRequest());
  try {
    const { data } = await axios.get(
      `${BackendUrl}/timeline/getall`,
      { withCredentials: true }
    );

    dispatch(timelineSlice.actions.getAllTimelineSuccess(data.timeline));
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.getAllTimelineFailed(error.response.data.message)
    );
  }
};

export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(timelineSlice.actions.deleteTimelineRequest());
  try {
    const { data } = await axios.delete(
      `${BackendUrl}/timeline/delete/${id}`,
      { withCredentials: true }
    );

    dispatch(timelineSlice.actions.deleteTimelineSuccess(data.message));

    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.deleteTimelineFailed(error.response.data.message)
    );
  }
};

export const addNewTimeline = (timelineData) => async (dispatch) => {
  dispatch(timelineSlice.actions.addTimelineRequest());
  try {
    const { data } = await axios.post(
      `${BackendUrl}/timeline/add`,
      timelineData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(timelineSlice.actions.addTimelineSuccess(data.message));

    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.addTimelineFailed(error.response.data.message)
    );
  }
};


export const updateTimeline = (id, newData) => async (dispatch) => {
  dispatch(timelineSlice.actions.updateTimelineRequest());
  try {
    const { data } = await axios.put(
      `${BackendUrl}/timeline/update/${id}`,
      newData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(timelineSlice.actions.updateTimelineSuccess(data.message));

    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.updateTimelineFailed(error.response.data.message)
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
