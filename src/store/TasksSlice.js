import { createSlice } from "@reduxjs/toolkit";
const TaskSlice = createSlice({
  name: "taskModal",
  initialState: {
    allTasks: [],
    myTasks: [],
    currentTask: null,
    taskStatus: null,
  },
  reducers: {
    setAllTasks(state, action) {
      state.allTasks = action.payload;
    },
    setMyTasks(state, action) {
      //console.log(action.payload);
      state.myTasks = action.payload;
    },
    setCurrentTask(state, action) {
      // Add this action
      state.currentTask = action.payload;
    },
    setTaskStatus(state, action) {
      state.taskStatus = action.payload;
    },
  },
});

export default TaskSlice;

export const tasksAction = TaskSlice.actions;
