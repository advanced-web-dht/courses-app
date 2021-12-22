import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Zoom from '@mui/material/Zoom';
import IconButton from '@mui/material/IconButton';
import XIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import Input from '@mui/material/Input';
import { Form, FormAction, FormHeader, StyledModal } from '../addClassModal/style';
import { Root, StyledTableRow } from './style';
import { AddNewClass } from '../../api/client';
import { IClass } from '../../type';
import { Typography } from '@mui/material';

const ariaLabel = { 'aria-label': 'description' };

interface GradeTableProps {
  open: boolean;
  handleClose: () => void;
}

const createData = (name: string, diem1: number) => {
  return { name, diem1 };
};

// const createData = (name: string, diem: array) => {
//   return { name, diem };
// };

const rows = [
  createData('Khang', 10),
  createData('Tan', 10),
  createData('Tin', 10),
  createData('Vi', 10),
  createData('Yen', 10),
  createData('Duy', 10)
].sort((a, b) => (a.name < b.name ? -1 : 1));

const InputGradeTable: React.FC<GradeTableProps> = ({ open, handleClose }) => {
  const [canSubmit, setCanSubmit] = useState(true);
  const HandleSubmit = async () => {};

  const HandleCloseModal = () => {
    resetVal();
    handleClose();
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
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <td style={{ minWidth: 60 }}>
                        <Typography>{row.name}</Typography>
                      </td>
                      <td style={{ minWidth: 60 }}>
                        <Input disableUnderline defaultValue={row.diem1} inputProps={ariaLabel} />
                      </td>
                    </StyledTableRow>
                  ))}
                </tbody>
              </table>
            </Root>
            <Button variant='contained' color='primary' onClick={HandleSubmit} disabled={!canSubmit}>
              Cập nhập
            </Button>
          </FormAction>
        </Form>
      </Zoom>
    </StyledModal>
  );
};
export default InputGradeTable;
