import React from 'react';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons/faUserGraduate';
import Typography from '@mui/material/Typography';

import { ReviewItem, ReviewItemTitle } from './style';
import FontAwesomeSvgIcon from '../UI/fontAweosomeIcon';
import { IReview } from '../../type';

interface ReviewProps {
  review: IReview;
  onClick: (reviewId: number) => void;
}

const Review: React.FC<ReviewProps> = ({ review, onClick }) => {
  return (
    <ReviewItem onClick={() => onClick(review.id)}>
      <ReviewItemTitle>
        <FontAwesomeSvgIcon icon={faUserGraduate} />
        <span>
          {review.requester.name} - {review.requester.studentId} - {review.grade.name}
        </span>
      </ReviewItemTitle>
      <Typography variant='subtitle2' fontSize='10pt' fontWeight={400}>
        Ngày đăng: {new Date(review.createdAt).toLocaleString('vi-VN')}
      </Typography>
    </ReviewItem>
  );
};

export default Review;
