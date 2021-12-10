import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { IClass } from '../type';

interface StateType {
  list: IClass[];
}

const initialState: StateType = {
  list: []
};

const ClassesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    storeClass(state, action) {
      state.list = action.payload;
    },
    addClass(state, action) {
      state.list.push(action.payload);
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.list = action.payload.classes.list;
    }
  }
});

export const ClassesActions = ClassesSlice.actions;

export default ClassesSlice.reducer;
