import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllMessagesRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.messages = [];
    },
    getAllMessagesSuccess(state, action) {
      state.loading = false;

      state.error = null;

      state.messages = action.payload;
    },
    getAllMessagesFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.messages = state.messages;
    },

    deleteMessageRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteMessageSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteMessageFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    restMessageSlice(state, action) {
      state.error = null;
      state.messages = state.messages;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.messages = state.messages;
    },
  },
});

export const getAllMessages = () => async (dispatch) => {
  dispatch(messageSlice.actions.getAllMessagesRequest());
  try {
    const { data } = await axios.get(
      "https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/message/getall",
      { withCredentials: true }
    );

    dispatch(messageSlice.actions.getAllMessagesSuccess(data.messages));
    dispatch(messageSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      messageSlice.actions.getAllMessagesFailed(error.response.data.message)
    );
  }
};
export const deleteMessage = (id) => async (dispatch) => {
  dispatch(messageSlice.actions.deleteMessageRequest());
  try {
    const { data } = await axios.delete(
      `https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/message/delete/${id}`,
      { withCredentials: true }
    );

    dispatch(messageSlice.actions.deleteMessageSuccess(data.message));

    dispatch(messageSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      messageSlice.actions.deleteMessageFailed(error.response.data.message)
    );
  }
};
export const clearAllMessageErrors = () => async (dispatch) => {
  dispatch(messageSlice.actions.clearAllErrors());
};
export const resetMessageSlice = () => async (dispatch) => {
  dispatch(messageSlice.actions.restMessageSlice());
};

export default messageSlice.reducer;
