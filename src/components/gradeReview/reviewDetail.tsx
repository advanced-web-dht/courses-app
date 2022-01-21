import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { LinearProgress } from '@mui/material';

import { AppState } from '../../reducers';
import ReviewComment from '../reviewComment';
import ReviewAction from './reviewAction';
import { ReviewContainer, Point } from './style';
import { IReview, IStudent } from '../../type';
import useRequest from '../../hooks/useRequest';
import { GetStudentOfClass } from '../../api/client';

interface ReviewDetailProps {
  reviewId: number;
  studentId: string;
}

/**
 *
 * @param review
 * @constructor
 * @note teacher view
 */

const ReviewDetail: React.FC<ReviewDetailProps> = ({ reviewId, studentId }) => {
  const { info } = useSelector((state: AppState) => state.currentClass);
  const [student, setStudent] = useState<IStudent | null>(null);
  const { data: review, mutate } = useRequest<IReview>({ url: `/review/${reviewId}` });

  useEffect(() => {
    (async () => {
      const result = await GetStudentOfClass(info.id, studentId);
      setStudent(result);
    })();
  }, [studentId, reviewId]);

  return review ? (
    <React.Fragment>
      <ReviewContainer>
        <div>
          <Typography variant='h6' component='div'>
            {student?.studentId} - {student?.name}
          </Typography>
          <Typography variant='subtitle1' component='div'>
            Ngày đăng: {new Date(review.createdAt).toLocaleDateString('vi-VN')}
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
      {!review.isDone && (
        <ReviewAction
          reviewId={review?.id}
          pointPartId={review.pointPartId}
          csId={student?.id as number}
          classId={info.id}
          mutate={mutate}
        />
      )}
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
  ) : (
    <LinearProgress color='secondary' />
  );
};

export default ReviewDetail;
