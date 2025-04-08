import { createSlice } from "@reduxjs/toolkit";
const TaskModalSlice = createSlice({
  name: "taskModal",
  initialState: { taskModal: false, status: "create", taskId: "" },
  reducers: {
    setTaskModal(state, action) {
      // console.log(action.payload, "test");
      state.taskModal = action.payload.taskModal;
      state.status = action.payload.status;
      if (action.payload.taskId) {
        state.taskId = action.payload.taskId;
      }
    },
    setTaskStatus(state, action) {
      //console.log(action.payload);
      state.postSearch = action.payload;
    },
  },
});

export default TaskModalSlice;

export const taskModalAction = TaskModalSlice.actions;
