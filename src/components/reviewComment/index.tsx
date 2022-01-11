import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { faComments } from '@fortawesome/free-solid-svg-icons/faComments';

import Comment from './comment';
import FontAwesomeSvgIcon from '../UI/fontAweosomeIcon';
import { CommentsContainer, CommentList, CommentListHeader } from './style';
import { IComment } from '../../type';
import AddComment from './addComment';

interface ReviewCommentProps {
  comments: IComment[];
  accountId: number;
  reviewId: number;
}

const ReviewComment: React.FC<ReviewCommentProps> = ({ comments, accountId, reviewId }) => {
  return (
    <CommentsContainer>
      <CommentListHeader>
        {comments.length ? (
          <React.Fragment>
            <FontAwesomeSvgIcon icon={faComments} />
            <Typography component='div' variant='subtitle1'>
              Có {comments.length} bình luận
            </Typography>
          </React.Fragment>
        ) : (
          <Typography component='div' variant='subtitle1'>
            Chưa có bình luận về yêu cầu này
          </Typography>
        )}
      </CommentListHeader>
      <CommentList>
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} teacher={comment.accountId !== accountId} />
        ))}
      </CommentList>
      <Divider />
      <AddComment reviewId={reviewId} />
    </CommentsContainer>
  );
};

export default ReviewComment;
