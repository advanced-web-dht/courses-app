import { IClass } from '../../type';
import { AppDispatch } from '../../reducers';
import { ClassesActions } from '../../reducers/classes';

export const addClass = (newClass: IClass) => {
  return (dispatch: AppDispatch) => {
    dispatch(ClassesActions.addClass(newClass));
  };
};
