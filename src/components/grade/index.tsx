import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CSVDownloader } from 'react-papaparse';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

import { AppState } from '../../reducers';
import useRequest from '../../hooks/useRequest';
import { Root } from './style';
import FontAwesomeSvgIcon from '../UI/fontAweosomeIcon';
import { IClass } from '../../type';

const GradeTable: React.FC = () => {
  const { info } = useSelector((state: AppState) => state.currentClass);
  const { data } = useRequest<IClass>({ url: `/classes/${info.id}/grade-board` });

  const board = useMemo(() => {
    const result: Array<Record<string, string | number | undefined>> = [];
    data?.students.forEach((student) => {
      const row: Record<string, string | number | undefined> = {};
      row.MSSV = student.studentId;
      student.grades?.forEach((grade) => {
        row[grade?.name as string] = grade.detail.point;
      });
      row['Tổng kết'] = student.final;
      result.push(row);
    });
    return result;
  }, [data]);

  return (
    <Root>
      {data ? (
        <React.Fragment>
          <TableContainer>
            <Table aria-label='grade-board' stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Sinh viên</TableCell>
                  {data.grades?.map((grade) => (
                    <TableCell key={grade.id} align='right'>
                      {grade.name} - {grade.ratio}
                    </TableCell>
                  ))}
                  <TableCell align='right'>Tổng kết</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.students.map((student) => (
                  <TableRow key={student.studentId}>
                    <TableCell>
                      <Tooltip title={student.account ? (student.account.email as string) : 'Sinh viên chưa tham gia lớp học'}>
                        <span>
                          {student.studentId} - {student.name}
                          <FontAwesomeSvgIcon icon={faCheckCircle} fill={student.account ? 'green' : 'grey'} />
                        </span>
                      </Tooltip>
                    </TableCell>
                    {student.grades?.map((grade) => (
                      <TableCell key={grade.id} align='right'>
                        {grade.detail.point ?? 0}
                      </TableCell>
                    ))}
                    <TableCell align='right'>{student.final?.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div>
            <CSVDownloader data={board} filename={`${info.name} - Bảng điểm`}>
              <Button variant='contained'>Download</Button>
            </CSVDownloader>
          </div>
        </React.Fragment>
      ) : (
        <LinearProgress color='secondary' />
      )}
    </Root>
  );
};
export default GradeTable;
