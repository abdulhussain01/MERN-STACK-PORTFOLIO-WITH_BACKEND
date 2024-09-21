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

    //delete skill
    deleteSkillRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    deleteSkillSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    deleteSkillFailed(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },
    //Add skill

    addSkillRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    addSkillSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    addSkillFailed(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },
    // update skill
    updateSkillRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    updateSkillSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updateSkillFailed(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },

    resetSkillSlice(state, action) {
      state.error = null;
      state.skill = state.skill;
      state.message = null;
      state.loading = false;
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
      "https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/skill/getall",
      { withCredentials: true }
    );

    dispatch(skillSlice.actions.getAllSkillSuccess(data.skill));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.getAllSkillFailed(error.response.data.message));
  }
};

export const deleteskill = (id) => async (dispatch) => {
  dispatch(skillSlice.actions.deleteSkillRequest());
  try {
    const { data } = await axios.delete(
      `https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/skill/delete/${id}`,
      { withCredentials: true }
    );

    dispatch(skillSlice.actions.deleteSkillSuccess(data.message));

    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.deleteSkillFailed(error.response.data.message));
  }
};

export const addNewskill = (skillData) => async (dispatch) => {
  dispatch(skillSlice.actions.addSkillRequest());
  try {
    const { data } = await axios.post(
      `https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/skill/add`,
      skillData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(skillSlice.actions.addSkillSuccess(data.message));

    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.addSkillFailed(error.response.data.message));
  }
};

export const updateskill = (id, proficiency) => async (dispatch) => {
  dispatch(skillSlice.actions.updateSkillRequest());
  try {
    const { data } = await axios.put(
      `https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/skill/update/${id}`,
      { proficiency },
      {
        withCredentials: true,
      }
    );

    dispatch(skillSlice.actions.updateSkillSuccess(data.message));

    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.updateSkillFailed(error.response.data.message));
  }
};

export const clearAllskillErrors = () => async (dispatch) => {
  dispatch(skillSlice.actions.clearAllErrors());
};
export const resetskillSlice = () => async (dispatch) => {
  dispatch(skillSlice.actions.resetSkillSlice());
};

export default skillSlice.reducer;
