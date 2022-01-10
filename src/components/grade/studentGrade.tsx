import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { AppState } from '../../reducers';
import useRequest from '../../hooks/useRequest';
import useToggle from '../../hooks/useToggle';
import GradeReview from '../gradeReview';
import { StudentGradeContainer } from './style';
import { IPoint, IPointPart, IStudent } from '../../type';

const StudentGrade: React.FC = () => {
  const { info } = useSelector((state: AppState) => state.currentClass);
  const { data } = useRequest<IStudent>({ url: `/pointpart/student/class/${info.id}` });
  const { isOpen, handleOpen, handleClose } = useToggle();

  return (
    <React.Fragment>
      <StudentGradeContainer>
        <Typography component='span'>18120171 - Nguyen Thanh Duy</Typography>
        <table aria-label='student-grade'>
          <thead>
            <tr>
              <th>Cột điểm</th>
              <th>Tỉ lệ</th>
              <th>Số điểm</th>
            </tr>
          </thead>
          <tbody>
            {data?.grades?.map((grade) => (
              <tr key={grade.id}>
                <td>{grade.name}</td>
                <td>{grade.ratio}</td>
                <td>{grade.isDone ? grade.detail.point : ' - '}</td>
              </tr>
            ))}
            <tr>
              <td>Tổng kết</td>
              <td> - </td>
              <td>{data?.final}</td>
            </tr>
          </tbody>
        </table>
        <Button variant='contained' color='error' onClick={handleOpen}>
          Yêu cầu phúc khảo
        </Button>
      </StudentGradeContainer>
      <GradeReview
        open={isOpen}
        handleClose={handleClose}
        classId={info.id}
        grades={data?.grades as Array<IPointPart & { detail: IPoint }>}
      />
    </React.Fragment>
  );
};

export default StudentGrade;
