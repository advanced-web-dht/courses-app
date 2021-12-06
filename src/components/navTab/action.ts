import { AppDispatch } from '../../reducers';
import { ClassActions } from '../../reducers/class';

export const changeTab = (targetIndex: number) => {
	return (dispatch: AppDispatch) => {
		dispatch(ClassActions.changeTab(targetIndex));
	};
};
