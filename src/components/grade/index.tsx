import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CSVDownloader } from 'react-papaparse';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';

import { AppState } from '../../reducers';
import useRequest from '../../hooks/useRequest';
import { Root, StyledTableRow } from './style';
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
          <table aria-label='grade-board'>
            <thead>
              <tr>
                <th>Sinh viên</th>
                {data.grades?.map((grade) => (
                  <th key={grade.id}>
                    {grade.name} - {grade.ratio}
                  </th>
                ))}
                <th>Tổng kết</th>
              </tr>
            </thead>
            <tbody>
              {data.students.map((student) => (
                <StyledTableRow key={student.studentId}>
                  <td style={{ minWidth: 250 }}>
                    <Tooltip title={student.account ? (student.account.email as string) : 'Sinh viên chưa tham gia lớp học'}>
                      <span>
                        {student.name}
                        <FontAwesomeSvgIcon icon={faCheckCircle} fill={student.account ? 'green' : 'grey'} />
                      </span>
                    </Tooltip>
                  </td>
                  {student.grades?.map((grade) => (
                    <td style={{ minWidth: 150 }} key={grade.id}>
                      {grade.detail.point ?? 0}
                    </td>
                  ))}
                  <td style={{ minWidth: 150 }}>{student.final}</td>
                </StyledTableRow>
              ))}
            </tbody>
          </table>
          <div>
            <CSVDownloader data={board}>
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
