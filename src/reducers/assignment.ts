import { createSlice } from '@reduxjs/toolkit';

import { IAssignment } from '../type';

interface StateType {
  list: IAssignment[];
}

const initialState: StateType = {
  list: []
};

const AssignmentSlice = createSlice({
  name: 'assignment',
  initialState,
  reducers: {
    storeAssignments(state, action) {
      state.list = action.payload;
    },
    addAssignment(state, action) {
      state.list.push(action.payload);
    },
    updateAssignment(state, action) {
      const targetIndex = state.list.findIndex((assignment) => assignment.id === action.payload.id);
      const target = state.list[targetIndex];
      state.list[targetIndex] = { ...target, ...action.payload };
    },
    deleteAssignment(state, action) {
      state.list.filter((assignment) => assignment.id !== action.payload);
    }
  }
});

export const AssignmentActions = AssignmentSlice.actions;

export default AssignmentSlice.reducer;
