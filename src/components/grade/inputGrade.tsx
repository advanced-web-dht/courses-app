import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Zoom from '@mui/material/Zoom';
import IconButton from '@mui/material/IconButton';
import XIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import { CSVReader, CSVDownloader } from 'react-papaparse';
import { ParseResult } from 'papaparse';

import { AppState } from '../../reducers';
import useRequest from '../../hooks/useRequest';
import { UploadGradePoints } from '../../api/client';
import { Form, FormAction, FormHeader } from '../addClassModal/style';
import FullSizeModal from '../UI/FullSizeModal';
import { Root, StyledTableRow, GradeAction } from './style';
import { IPoint, IStudent } from '../../type';
import { GradeType, findStudent } from './helper';

interface GradeTableProps {
  open: boolean;
  handleClose: () => void;
  gradeId: number;
  gradeName: string;
}

const InputGradeTable: React.FC<GradeTableProps> = ({ open, handleClose, gradeId, gradeName }) => {
  const { students, info } = useSelector((state: AppState) => state.currentClass);
  const { data } = useRequest<Array<IStudent & { detail: IPoint }>>({ url: `/pointpart/${gradeId}/points` });

  const [grades, setGrade] = useState<GradeType>(() => {
    return students.map((student) => ({ csId: student.id, studentId: student.studentId, point: 0 }));
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const studentsList = data as Array<IStudent & { detail: IPoint }>;
      const newGrades = studentsList.map((student) => ({ csId: student.id, studentId: student.studentId, point: student.detail.point }));
      setGrade(newGrades);
    }
  }, [data]);

  const downloadGrades = useMemo(() => data?.map((student) => ({ MSSV: student.studentId, điểm: student.detail.point })), [data]);

  const HandleSubmit = async () => {
    const gradesToSubmit = grades.map((grade) => ({ csId: grade.csId, point: Number(grade.point) }));
    const check = await UploadGradePoints(info.id, gradesToSubmit, gradeId);
    if (check) {
      toast.success('Upload điểm thành công');
    } else {
      toast.error('Upload điểm không thành công');
    }
    handleClose();
  };

  const HandleCloseModal = () => {
    handleClose();
  };

  const handleChangeGrade = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, studentId: string) => {
    const newGrades = [...grades];
    const target = newGrades.findIndex((grade) => grade.studentId === studentId);
    newGrades[target].point = Number(event.target.value);
    setGrade(newGrades);
  };

  const handleDropCSV = (rows: Array<ParseResult<string>>) => {
    const newGrades: GradeType = [];
    const check = rows.some((row) => {
      const csId = findStudent(grades, row.data[0]);
      const point = Number(row.data[1]);

      if (!csId) {
        return true;
      }

      if (Number.isNaN(point)) {
        return true;
      }

      newGrades.push({ studentId: row.data[0], point, csId });
      return false;
    });
    if (newGrades.length < grades.length || check) {
      toast.error('Import thất bại! Vui lòng kiểm tra lại file!');
    } else {
      setGrade(newGrades);
    }
  };

  return (
    <FullSizeModal open={open} onClose={HandleCloseModal}>
      <Zoom in={open}>
        <Form width={800}>
          <FormHeader>
            <div>
              {info.name} - {gradeName}
            </div>
            <IconButton onClick={HandleCloseModal}>
              <XIcon />
            </IconButton>
          </FormHeader>
          <FormAction component='form'>
            <Root>
              <table aria-label='custom table' style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th>Mã số sinh viên</th>
                    <th>Điểm</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((row) => (
                    <StyledTableRow key={row.studentId}>
                      <td style={{ minWidth: 60 }} className='student-id'>
                        <Typography>{row.studentId}</Typography>
                      </td>
                      <td style={{ minWidth: 60 }}>
                        <Input
                          disableUnderline
                          type='number'
                          inputProps={{ min: 0, max: 100 }}
                          value={row.point}
                          onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                            handleChangeGrade(event, row?.studentId as string)
                          }
                        />
                      </td>
                    </StyledTableRow>
                  ))}
                </tbody>
              </table>
            </Root>
            <CSVReader onDrop={handleDropCSV}>
              <span>Kéo thả file điểm</span>
            </CSVReader>
            <GradeAction>
              <Button variant='contained' color='primary' onClick={HandleSubmit}>
                Cập nhật
              </Button>
              <CSVDownloader data={downloadGrades} filename={`${info.name}_${gradeName}`}>
                <Button variant='contained' color='success'>
                  Download
                </Button>
              </CSVDownloader>
            </GradeAction>
          </FormAction>
        </Form>
      </Zoom>
    </FullSizeModal>
  );
};
export default InputGradeTable;
