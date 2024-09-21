import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import projectReducer from "./slices/project.slice";
import themeReducer from "./slices/theme.slice";
import messageReducer from "./slices/message.slice";
import timelineReducer from "./slices/timeline.slice";
import softwareApplicationReducer from "./slices/software.slice";
import skillReducer from "./slices/skill.slice";

const store = configureStore(
  {
    reducer: {
      user: userReducer,
      project: projectReducer,
      message: messageReducer,
      timeline: timelineReducer,
      softwareApplication: softwareApplicationReducer,
      skill: skillReducer,
      theme: themeReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
