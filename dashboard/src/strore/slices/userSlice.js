import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthenticated: false,
    error: null,
    message: null,
    isUpdated: false,
  },
  reducers: {
    // login user
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    //get user
    getUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    getUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    getUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    //logout user

    logoutUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = action.payload;
    },
    logoutUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },

    // update Password

    updatePasswordRequest(state, action) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },

    // update profile

    updateProfileRequest(state, action) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updateProfileFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },
    // update profile and reset after update
    updateProfileResetAfterUpdate(state, action) {
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },

    // clear function
    clearAllErrors(state, action) {
      state.error = null;
      state.user = state.user;
    },
  },
});

export const login = (email, password) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const { data } = await axios.post(
      `https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/user/login`,
      { email, password },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(userSlice.actions.loginSuccess(data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(error.response.data.message));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.getUserRequest());
  try {
    const { data } = await axios.get(
      `https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/user/me`,

      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(userSlice.actions.getUserSuccess(data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.getUserFailed(error.response.data.message));
  }
};
export const logoutUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/user/logout`,

      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(userSlice.actions.logoutUserSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutUserFailed(error.response.data.message));
  }
};

export const updatePassword =
  (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    dispatch(userSlice.actions.updatePasswordRequest());
    try {
      const { data } = await axios.put(
        `https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/user/update/password`,

        { currentPassword, newPassword, confirmNewPassword },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(userSlice.actions.updatePasswordSuccess(data.message));

      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        userSlice.actions.updatePasswordFailed(error.response.data.message)
      );
    }
  };

export const updateProfile = (dataVal) => async (dispatch) => {
  dispatch(userSlice.actions.updateProfileRequest());
  try {
    const { data } = await axios.put(
      `https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/user/update/profile`,

      dataVal,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(userSlice.actions.updateProfileSuccess(data.message));

    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      userSlice.actions.updateProfileFailed(error.response.data.message)
    );
  }
};
export const resetProfile = () => async (dispatch) => {
  dispatch(userSlice.actions.updateProfileResetAfterUpdate());
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;
