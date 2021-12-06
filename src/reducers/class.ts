import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { IClass, IClassMember, IPointPart } from '../type';

interface StateType {
	info: IClass;
	members: IClassMember[];
	grades: IPointPart[];
	currentTab: number;
}

const initialState: StateType = {
	info: { id: -1, code: '', name: '', role: 'role', members: [] },
	members: [],
	grades: [],
	currentTab: 0
};

const ClassSlice = createSlice({
	name: 'currentClass',
	initialState,
	reducers: {
		enterClass(state, action) {
			state.info = action.payload;
			state.members = action.payload.members;
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
