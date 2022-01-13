import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';

import ReviewComment from '../reviewComment';
import { ReviewContainer } from './style';
import { IReview } from '../../type';

interface ReviewContentProps {
  review: IReview;
}

/**
 *
 * @param review
 * @constructor
 * @note student view
 */
const ReviewContent: React.FC<ReviewContentProps> = ({ review }) => {
  return review ? (
    <React.Fragment>
      <ReviewContainer>
        <div>
          <Typography variant='h6' component='div'>
            Yêu cầu của bạn
          </Typography>
          <Typography variant='subtitle1' component='div'>
            Ngày đăng: {new Date(review.createdAt).toLocaleDateString()}
          </Typography>
        </div>
        <Typography variant='body1' component='p'>
          <strong>Nội dung: </strong>
          {review.content}
        </Typography>
      </ReviewContainer>
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

export default ReviewContent;
