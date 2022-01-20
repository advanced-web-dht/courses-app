import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableCell } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import { AppState } from '../../reducers';
import useRequest from '../../hooks/useRequest';
import useToggle from '../../hooks/useToggle';
import GradeReview from '../gradeReview';
import { Root } from './style';
import { IPoint, IPointPart, IStudent } from '../../type';

const StudentGrade: React.FC = () => {
  const { info } = useSelector((state: AppState) => state.currentClass);
  const { data } = useRequest<IStudent>({ url: `/pointpart/student/class/${info.id}` });
  const { isOpen, handleOpen, handleClose } = useToggle();

  return data?.final ? (
    <React.Fragment>
      <Root>
        <TableContainer>
          <Typography component='h4' fontWeight='bold' fontSize='15pt' alignSelf='flex-start' marginBottom={1} color='primary'>
            {data?.studentId} - {data?.name}
          </Typography>
          <Table aria-label='student-grade' stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Cột điểm</TableCell>
                <TableCell align='right'>Tỉ lệ</TableCell>
                <TableCell align='right'>Số điểm</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.grades?.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell>{grade.name}</TableCell>
                  <TableCell align='right'>{grade.ratio}</TableCell>
                  <TableCell align='right'>{grade.isDone ? grade.detail.point : ' - '}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>Tổng kết</TableCell>
                <TableCell align='right'> - </TableCell>
                <TableCell align='right'>{data?.final?.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant='contained' color='error' onClick={handleOpen} sx={{ mt: 1.5 }}>
          Yêu cầu phúc khảo
        </Button>
      </Root>
      <GradeReview
        open={isOpen}
        handleClose={handleClose}
        classId={info.id}
        grades={data?.grades as Array<IPointPart & { detail: IPoint }>}
      />
    </React.Fragment>
  ) : (
    <Root>
      <Typography variant='h5' fontWeight='bold'>
        Chưa có cột điểm nào hoàn thành
      </Typography>
    </Root>
  );
};

export default StudentGrade;
