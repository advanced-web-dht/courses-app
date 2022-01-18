import React from 'react';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons/faUserGraduate';
import Typography from '@mui/material/Typography';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons/faHourglassHalf';

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
      <Typography
        variant='subtitle2'
        fontSize='10pt'
        fontWeight={400}
        display='flex'
        alignItems='center'
        width='200px'
        justifyContent='space-between'
      >
        <span>Ngày đăng: {new Date(review.createdAt).toLocaleString('vi-VN')} </span>
        {review.isDone ? <FontAwesomeSvgIcon icon={faCheckCircle} fill='green' /> : <FontAwesomeSvgIcon icon={faHourglassHalf} />}
      </Typography>
    </ReviewItem>
  );
};

export default Review;
