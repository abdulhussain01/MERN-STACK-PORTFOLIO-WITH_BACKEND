import { configureStore } from '@reduxjs/toolkit'
// ...
import userReducer from './slices/user.slice'
import projectReducer from './slices/project.slice';
import skillReducer from './slices/skill.slice';
import timelineReducer from './slices/timeline.slice';
import softwareApplicationReducer from './slices/software.slice'; 
import messageReducer from "./slices/message.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
    skill: skillReducer,
    timeline: timelineReducer,
    softwares: softwareApplicationReducer,
    message: messageReducer,

  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

