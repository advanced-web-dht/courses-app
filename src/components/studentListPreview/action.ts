import { AppDispatch } from '../../reducers';
import { ClassActions } from '../../reducers/class';

export const AddStudents = (students: Record<string, string>[]) => {
  return (dispatch: AppDispatch) => {
    dispatch(ClassActions.addStudents(students));
  };
};
