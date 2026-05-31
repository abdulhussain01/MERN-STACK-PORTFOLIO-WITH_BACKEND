import { createSlice, type Dispatch, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const SERVERURL = import.meta.env.VITE_SERVERURL || "http://localhost:4000";

type ContactFormValues = {
  senderName: string;
  email: string;
  message: string;
  subject: string;
};


const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,

    error: null,
    resmessage: null,
  },
  reducers: {
    sendMessageRequest(state) {
      state.loading = true;
      state.error = null;
    },
    sendMessageSuccess(state, action:PayloadAction<any>) {
      state.loading = false;

      state.error = null;

      state.resmessage = action.payload;
    },
    sendMessageFailed(state, action:PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
      state.resmessage = null;
    },

    resetMessageSlice(state, ) {
      state.error = null;
      state.resmessage = null;
      state.loading = false;
    },

    clearAllErrors(state, ) {
      state.error = null;
      state.resmessage = state.resmessage;
    },
  },
});

export const sendMessage = (messageData: ContactFormValues) => async (dispatch:Dispatch) => {
  dispatch(messageSlice.actions.sendMessageRequest(undefined));
  try {
    const { data } = await axios.post(
      `${SERVERURL}/message/send`,
      messageData
    );
    dispatch(messageSlice.actions.sendMessageSuccess(data.message));
    dispatch(messageSlice.actions.clearAllErrors());
  } catch (error: any) {
    dispatch(
      messageSlice.actions.sendMessageFailed(error.response.data.message)
    );
  }
};

export const clearAllMessageErrors = () => async (dispatch:Dispatch) => {
  dispatch(messageSlice.actions.clearAllErrors());
};
export const resetMessage = () => async (dispatch:Dispatch) => {
  dispatch(messageSlice.actions.resetMessageSlice());
};

export default messageSlice.reducer;
