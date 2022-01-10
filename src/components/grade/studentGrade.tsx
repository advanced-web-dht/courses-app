import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';

import { AppState } from '../../reducers';
import useRequest from '../../hooks/useRequest';
import { StudentGradeContainer } from './style';
import { IStudent } from '../../type';

const StudentGrade: React.FC = () => {
  const { info } = useSelector((state: AppState) => state.currentClass);
  const { data } = useRequest<IStudent>({ url: `/pointpart/student/class/${info.id}` });

  return (
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
    </StudentGradeContainer>
  );
};

export default StudentGrade;
