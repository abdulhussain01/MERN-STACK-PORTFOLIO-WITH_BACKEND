import { createSlice, type Dispatch, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { ToolsType } from '@/types';

const SERVERURL = import.meta.env.VITE_SERVERURL || "http://localhost:4000";

type SkillState = {
  loading: boolean;
  skill: ToolsType[];
  error: string | null;
  message: string | null;
};

const initialState: SkillState = {
  loading: false,
  skill: [],
  error: null,
  message: null,
};

const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    getAllSkillRequest(state) {
      state.loading = true;
      state.skill = [];
      state.error = null;
    },
    getAllSkillSuccess(state, action:PayloadAction<ToolsType[]>) {
      state.loading = false;
      state.skill = action.payload;
      state.error = null;
    },
    getAllSkillFailed(state, action:PayloadAction<string | null>) {
      state.loading = false;
      state.skill = state.skill;
      state.error = action.payload;
    },
    clearAllErrors(state) {
      state.error = null;
      state.skill = state.skill;
    },
  },
});

export const getAllSkill = () => async (dispatch:Dispatch) => {
  dispatch(skillSlice.actions.getAllSkillRequest());
  try {
    const { data } = await axios.get(
      `${SERVERURL}/skill/getall`
    );

    dispatch(skillSlice.actions.getAllSkillSuccess(data.skill));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error:any) {
    dispatch(skillSlice.actions.getAllSkillFailed(error.response.data.message));
  }
};

export default skillSlice.reducer;
