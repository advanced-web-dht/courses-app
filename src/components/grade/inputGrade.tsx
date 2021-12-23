import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Zoom from '@mui/material/Zoom';
import IconButton from '@mui/material/IconButton';
import XIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import { CSVReader } from 'react-papaparse';
import { ParseResult } from 'papaparse';

import { AppState } from '../../reducers';
import { UploadGradePoints } from '../../api/client';
import { Form, FormAction, FormHeader, StyledModal } from '../addClassModal/style';
import { Root, StyledTableRow } from './style';

const ariaLabel = { 'aria-label': 'description' };

interface GradeTableProps {
  open: boolean;
  handleClose: () => void;
  gradeId: number;
}

const InputGradeTable: React.FC<GradeTableProps> = ({ open, handleClose, gradeId }) => {
  const { members, info } = useSelector((state: AppState) => state.currentClass);
  const [grades, setGrade] = useState(() => {
    return members.map((member) => ({ studentId: member.studentId, point: 0 }));
  });

  const HandleSubmit = async () => {
    const check = await UploadGradePoints(info.id, grades, gradeId);
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

  const handleChangeGrade = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, studentId: number) => {
    const newGrades = [...grades];
    const target = newGrades.findIndex((grade) => grade.studentId === studentId);
    newGrades[target].point = Number(event.target.value);
    setGrade(newGrades);
  };

  const handleDropCSV = (data: Array<ParseResult<string>>) => {
    const newGrades: { studentId: number; point: number }[] = [];
    for (let i = 0; i < data.length; i += 1) {
      const item = data[i];
      const grade = {
        studentId: Number(item.data[0]),
        point: Number(item.data[1])
      };
      newGrades.push(grade);
    }
    setGrade(newGrades);
  };

  return (
    <StyledModal open={open} onClose={HandleCloseModal}>
      <Zoom in={open}>
        <Form>
          <FormHeader>
            <div>Nhập cột điểm</div>
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
                      <td style={{ minWidth: 60 }}>
                        <Typography>{row.studentId}</Typography>
                      </td>
                      <td style={{ minWidth: 60 }}>
                        <Input
                          disableUnderline
                          inputProps={ariaLabel}
                          value={row.point}
                          onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                            handleChangeGrade(event, row.studentId)
                          }
                        />
                      </td>
                    </StyledTableRow>
                  ))}
                </tbody>
              </table>
            </Root>
            <Button variant='contained' color='primary' onClick={HandleSubmit}>
              Cập nhập
            </Button>
            <CSVReader onDrop={handleDropCSV}>
              <span>Kéo thả file điểm</span>
            </CSVReader>
          </FormAction>
        </Form>
      </Zoom>
    </StyledModal>
  );
};
export default InputGradeTable;
