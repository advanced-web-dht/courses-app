import { IPointPart } from '../../type';
import { AppDispatch } from '../../reducers';
import { ClassActions } from '../../reducers/class';

export const addGrade = (newGrade: IPointPart) => {
	return (dispatch: AppDispatch) => {
		dispatch(ClassActions.addGrade(newGrade));
	};
};

export const updateGrade = (grade: IPointPart) => {
	return (dispatch: AppDispatch) => {
		dispatch(ClassActions.updateGrade(grade));
	};
};

export const deleteGrade = (id: number) => {
	return (dispatch: AppDispatch) => {
		dispatch(ClassActions.deleteGrade(id));
	};
};

export const updateOrder = (grades: IPointPart[]) => {
	return (dispatch: AppDispatch) => {
		dispatch(ClassActions.storeGrade(grades));
	};
};
