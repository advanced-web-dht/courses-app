import React, { useState, useEffect } from 'react';
import Zoom from '@mui/material/Zoom';
import IconButton from '@mui/material/IconButton';
import XIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import useRequest from '../../hooks/useRequest';
import FullSizeModal from '../UI/FullSizeModal';
import { Form, FormAction, FormHeader } from '../addClassModal/style';
import { Point } from './style';
import { IPoint, IPointPart } from '../../type';

interface GradeReviewProps {
  open: boolean;
  handleClose: () => void;
  classId: number;
  grades: Array<IPointPart & { detail: IPoint }>;
}

const GradeReview: React.FC<GradeReviewProps> = ({ open, handleClose, classId, grades }) => {
  const [selectedGrade, setSelectedGrade] = useState('');
  const [point, setPoint] = useState(0);

  const { data: doneGrades } = useRequest<IPointPart[]>({ url: `pointpart/class/${classId}/done` });

  useEffect(() => {
    if (grades) {
      setPoint(() => {
        const target = grades.find((grade) => (grade.id = (doneGrades as IPointPart[])[Number(selectedGrade)].id));
        return target?.detail.point as number;
      });
    }
  }, [selectedGrade]);

  const handleChangeGrade = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGrade(target.value);
  };

  return (
    <FullSizeModal open={open}>
      <Zoom in={open}>
        <Form width={800}>
          <FormHeader>
            <div>Yêu cầu phúc khảo</div>
            <IconButton onClick={handleClose}>
              <XIcon />
            </IconButton>
          </FormHeader>
          <FormAction>
            <TextField id='demo-simple-select' value={selectedGrade} label='Cột điểm' onChange={handleChangeGrade} select>
              {doneGrades?.map((grade, index) => (
                <MenuItem value={index} key={grade.id}>
                  {grade.name}
                </MenuItem>
              ))}
            </TextField>
            <Point>
              <Typography>
                Số điểm đạt được: <strong>{`${point ? `${point} điểm` : ' - '}`}</strong>
              </Typography>
            </Point>
            <Divider />
          </FormAction>
        </Form>
      </Zoom>
    </FullSizeModal>
  );
};

export default GradeReview;
