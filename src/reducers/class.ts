import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { IClass, IAccount, IPointPart, IStudent } from '../type';

interface StateType {
  info: IClass;
  teachers: IAccount[];
  students: IStudent[];
  grades: IPointPart[];
  currentTab: number;
}

const initialState: StateType = {
  info: { id: -1, code: '', name: '', role: 'role', teachers: [], students: [], owner: { id: -1, name: '', studentId: '' } },
  teachers: [],
  grades: [],
  currentTab: 0,
  students: []
};

const ClassSlice = createSlice({
  name: 'currentClass',
  initialState,
  reducers: {
    enterClass(state, action) {
      state.info = action.payload;
      state.students = action.payload.students;
      state.teachers = action.payload.teachers;
      state.grades = action.payload.grades;
    },
    storeGrade(state, action) {
      state.grades = action.payload;
    },
    addGrade(state, action) {
      state.grades.push(action.payload);
    },
    updateGrade(state, action) {
      const index = state.grades.findIndex((grade) => grade.id === action.payload.id);
      state.grades[index] = action.payload;
    },
    deleteGrade(state, action) {
      state.grades.filter((grade) => grade.id !== action.payload);
    },
    changeTab(state, action) {
      state.currentTab = action.payload;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.currentClass
      };
    }
  }
});

export const ClassActions = ClassSlice.actions;

export default ClassSlice.reducer;
