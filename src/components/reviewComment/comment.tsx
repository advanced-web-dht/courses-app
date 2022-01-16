import React, { useMemo } from 'react';
import { faUserGraduate, faUser } from '@fortawesome/free-solid-svg-icons';
import Typography from '@mui/material/Typography';

import FontAwesomeSvgIcon from '../UI/fontAweosomeIcon';
import { CommentItemContainer } from './style';
import { IComment } from '../../type';

interface CommentProps {
  comment: IComment;
  teacher?: boolean;
}

const Comment: React.FC<CommentProps> = ({ comment, teacher }) => {
  const date = useMemo(() => new Date(comment.createdAt), [comment.createdAt]);

  return (
    <CommentItemContainer>
      <FontAwesomeSvgIcon icon={teacher ? faUser : faUserGraduate} size='large' />
      <div>
        <Typography variant='subtitle1' fontWeight='bold'>
          {comment.sender.name}
          <Typography variant='subtitle2' component='span' fontWeight='lighter' fontSize='10pt' fontStyle='italic' sx={{ ml: 2 }}>
            {date?.toLocaleString('vi-VN')}
          </Typography>
        </Typography>
        <Typography variant='body1'>{comment.message}</Typography>
      </div>
    </CommentItemContainer>
  );
};

Comment.defaultProps = {
  teacher: false
};

export default Comment;
