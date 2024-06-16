
import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./reducers/userReducer";
import taskReducer, { allTaskReducer } from "./reducers/taskReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
    tasks: allTaskReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
})