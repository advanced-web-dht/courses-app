import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { AppState } from '../../reducers';
import ReviewComment from '../reviewComment';
import ReviewAction from './reviewAction';
import { ReviewContainer, Point } from './style';
import { GetStudentOfClass } from '../../api/client';
import { IReview, IStudent } from '../../type';

interface ReviewDetailProps {
  review: IReview;
}

/**
 *
 * @param review
 * @constructor
 * @note teacher view
 */

const ReviewDetail: React.FC<ReviewDetailProps> = ({ review }) => {
  const { info } = useSelector((state: AppState) => state.currentClass);
  const [student, setStudent] = useState<IStudent | null>(null);

  useEffect(() => {
    (async () => {
      const result = await GetStudentOfClass(info.id, review.requester.studentId);
      setStudent(result);
    })();
  }, []);

  return (
    <React.Fragment>
      <ReviewContainer>
        <div>
          <Typography variant='h6' component='div'>
            {student?.studentId} - {student?.name}
          </Typography>
          <Typography variant='subtitle1' component='div'>
            Ngày đăng: {new Date(review.createdAt).toLocaleDateString()}
          </Typography>
        </div>
        <Point>
          {review?.id && (
            <Typography>
              Số điểm mong muốn: <strong>{`${review.expectedPoint} điểm`}</strong>
            </Typography>
          )}
          <Typography>
            Số điểm đạt được: <strong>{`${review.prePoint} điểm`}</strong>
          </Typography>
        </Point>
        <Typography variant='body1' component='p' border='1px solid grey' borderRadius={5} padding={2}>
          <strong>Nội dung: </strong>
          {review.content}
        </Typography>
      </ReviewContainer>
      <ReviewAction reviewId={review?.id} pointPartId={review.pointPartId} csId={student?.id as number} />
      <Divider />
      <ReviewComment comments={review.comments} accountId={review.accountId} reviewId={review.id} pending={!review.isDone} />
      {review.isDone && (
        <React.Fragment>
          <Divider />
          <Typography variant='h6' component='div' sx={{ mt: 1 }}>
            <strong>Kết quả phúc khảo: </strong>
            {review.finalPoint} điểm
          </Typography>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ReviewDetail;
