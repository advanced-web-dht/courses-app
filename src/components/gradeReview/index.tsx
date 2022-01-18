import React, { useState, useEffect, useMemo } from 'react';
import Zoom from '@mui/material/Zoom';
import IconButton from '@mui/material/IconButton';
import XIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import useRequest from '../../hooks/useRequest';
import FullSizeModal from '../UI/FullSizeModal';
import ReviewContent from './reviewContent';
import AddReview from './addReview';
import { Form, FormAction, FormHeader } from '../addClassModal/style';
import { Point } from './style';
import { IPoint, IPointPart, IReview } from '../../type';

interface GradeReviewProps {
  open: boolean;
  handleClose: () => void;
  classId: number;
  grades: Array<IPointPart & { detail: IPoint }>;
}

const GradeReview: React.FC<GradeReviewProps> = ({ open, handleClose, classId, grades }) => {
  const [selectedGradeIndex, setSelectedGradeIndex] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<IPointPart | null>(null);

  const { data: doneGrades, mutate } = useRequest<IPointPart[]>({ url: `pointpart/class/${classId}/done` });
  const { data: review } = useRequest<IReview>({
    url: selectedGrade?.reviews.length !== 0 ? `/review/${selectedGrade?.reviews[0].id as number}` : ''
  });

  useEffect(() => {
    const selected = Number(selectedGradeIndex);
    if (doneGrades && selected >= 0 && selectedGradeIndex) {
      setSelectedGrade(() => {
        const result = doneGrades.find((grade) => grade.id === selected);
        return result ?? null;
      });
    }
  }, [selectedGradeIndex, doneGrades]);

  const point = useMemo(() => {
    if (review && review.pointPartId === selectedGrade?.id) {
      return review.prePoint;
    }
    return grades?.find((grade) => grade.id === selectedGrade?.id)?.detail.point;
  }, [grades, selectedGrade]);

  const handleChangeGrade = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGradeIndex(target.value);
  };

  return (
    <FullSizeModal open={open}>
      <Zoom in={open}>
        <Form width={800}>
          <FormHeader>
            <Typography variant='h4' color='#1967D2' fontWeight='bold'>
              Yêu cầu phúc khảo
            </Typography>
            <IconButton onClick={handleClose}>
              <XIcon />
            </IconButton>
          </FormHeader>
          <FormAction>
            <TextField id='demo-simple-select' value={selectedGradeIndex} label='Cột điểm' onChange={handleChangeGrade} select>
              {doneGrades?.map((grade) => (
                <MenuItem value={grade.id} key={grade.id}>
                  {grade.name}
                </MenuItem>
              ))}
            </TextField>
            <Point>
              {review?.id && (
                <Typography>
                  Số điểm mong muốn: <strong>{`${review.expectedPoint} điểm`}</strong>
                </Typography>
              )}
              <Typography>
                Số điểm đạt được: <strong>{`${point !== undefined ? `${point} điểm` : ' - '}`}</strong>
              </Typography>
            </Point>
            <Divider />
            {review?.id ? (
              <ReviewContent review={review as IReview} />
            ) : (
              selectedGrade && <AddReview mutate={mutate} gradeId={selectedGrade?.id as number} currentPoint={point as number} />
            )}
          </FormAction>
        </Form>
      </Zoom>
    </FullSizeModal>
  );
};

export default GradeReview;
