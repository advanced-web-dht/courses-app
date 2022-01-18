import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSVReader } from 'react-papaparse';
import { ParseResult } from 'papaparse';
import Zoom from '@mui/material/Zoom';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import XIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

import { AppState } from '../../reducers';
import { AddStudents } from './action';
import useToggle from '../../hooks/useToggle';
import { UploadStudents } from '../../api/client';
import { StyledModal, Form, FormHeader, FormAction } from '../addClassModal/style';

const ref: React.LegacyRef<CSVReader<string>> = React.createRef();

const StudentListPreview: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, handleClose, handleOpen } = useToggle();
  const [students, setStudents] = useState<{ studentId: string; name: string }[]>([]);
  const { info } = useSelector((state: AppState) => state.currentClass);

  const handleErrorParseCSV = () => {
    toast.error('Đọc file không thành công vui lòng thử lại!!');
  };

  const handleDrop = (data: Array<ParseResult<string>>) => {
    const newStudents: { studentId: string; name: string }[] = [];
    for (let i = 0; i < data.length; i += 1) {
      const item = data[i];

      const student = {
        studentId: item.data[0],
        name: item.data[1]
      };
      newStudents.push(student);
    }
    handleOpen();
    setStudents(newStudents);
  };

  const handleSubmit = async () => {
    const check = await UploadStudents(info.id, students);
    if (check) {
      toast.success('Danh sách sinh viên được thêm thành công!');
      dispatch(AddStudents(students));
    } else {
      toast.error('Thêm không thành công');
    }
    ref?.current?.removeFile();
    handleClose();
  };

  return (
    <React.Fragment>
      <CSVReader onDrop={handleDrop} onError={handleErrorParseCSV} ref={ref}>
        <Button>Upload danh sách sinh viên</Button>
      </CSVReader>
      <StyledModal open={isOpen}>
        <Zoom in={isOpen}>
          <Form>
            <FormHeader>
              <div>Danh sách sinh viên</div>
              <IconButton onClick={handleClose}>
                <XIcon />
              </IconButton>
            </FormHeader>
            <FormAction>
              <Grid container spacing={2}>
                <Grid item xs={4} textAlign='center' fontWeight='bold'>
                  Mã sinh viên
                </Grid>
                <Grid item xs={8} textAlign='center' fontWeight='bold'>
                  Họ và tên
                </Grid>
              </Grid>
              {students.map((student) => (
                <Grid container spacing={2}>
                  <Grid item xs={4} textAlign='center'>
                    {student.studentId}
                  </Grid>
                  <Grid item xs={8} textAlign='center'>
                    {student.name}
                  </Grid>
                </Grid>
              ))}
              <Button variant='contained' color='primary' onClick={handleSubmit}>
                Upload
              </Button>
            </FormAction>
          </Form>
        </Zoom>
      </StyledModal>
    </React.Fragment>
  );
};

export default StudentListPreview;
