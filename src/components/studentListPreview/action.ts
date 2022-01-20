import { AppDispatch } from '../../reducers';
import { ClassActions } from '../../reducers/class';
import { IStudent } from '../../type';

export const AddStudents = (students: IStudent[]) => {
  return (dispatch: AppDispatch) => {
    dispatch(ClassActions.addStudents(students));
  };
};
