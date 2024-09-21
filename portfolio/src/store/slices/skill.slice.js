import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    loading: false,
    skill: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllSkillRequest(state, action) {
      state.loading = true;
      state.skill = [];
      state.error = null;
    },
    getAllSkillSuccess(state, action) {
      state.loading = false;
      state.skill = action.payload;
      state.error = null;
    },
    getAllSkillFailed(state, action) {
      state.loading = false;
      state.skill = state.skill;
      state.error = action.payload;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.skill = state.skill;
    },
  },
});

export const getAllSkill = () => async (dispatch) => {
  dispatch(skillSlice.actions.getAllSkillRequest());
  try {
    const { data } = await axios.get(
      "https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/skill/getall"
    );

    dispatch(skillSlice.actions.getAllSkillSuccess(data.skill));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.getAllSkillFailed(error.response.data.message));
  }
};

export default skillSlice.reducer;
