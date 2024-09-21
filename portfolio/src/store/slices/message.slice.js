import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,

    error: null,
    resmessage: null,
  },
  reducers: {
    sendMessageRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    sendMessageSuccess(state, action) {
      state.loading = false;

      state.error = null;

      state.resmessage = action.payload;
    },
    sendMessageFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.resmessage = null;
    },

    resetMessageSlice(state, action) {
      state.error = null;
      state.resmessage = null;
      state.loading = false;
    },

    clearAllErrors(state, action) {
      state.error = null;
      state.resmessage = state.resmessage;
    },
  },
});

export const sendMessage = (messageData) => async (dispatch) => {
  dispatch(messageSlice.actions.sendMessageRequest());
  try {
    const { data } = await axios.post(
      "https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/message/send",
      messageData
    );
    dispatch(messageSlice.actions.sendMessageSuccess(data.message));
    dispatch(messageSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      messageSlice.actions.sendMessageFailed(error.response.data.message)
    );
  }
};

export const clearAllMessageErrors = () => async (dispatch) => {
  dispatch(messageSlice.actions.clearAllErrors());
};
export const resetMessage = () => async (dispatch) => {
  dispatch(messageSlice.actions.resetMessageSlice());
};

export default messageSlice.reducer;
