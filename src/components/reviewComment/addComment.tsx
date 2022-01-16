import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import { toast } from 'react-toastify';

import { PostNewComment } from '../../api/client';
import { AddCommentWrapper } from './style';
import { IReview } from '../../type';
import useRequest from '../../hooks/useRequest';

interface AddCommentProps {
  reviewId: number;
}

const AddComment: React.FC<AddCommentProps> = ({ reviewId }) => {
  const [message, setMessage] = useState('');
  const { mutate } = useRequest<IReview>({
    url: `/review/${reviewId}`
  });

  const handleChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(target.value);
  };

  const handleSubmit = async () => {
    const result = await PostNewComment(reviewId, message);
    if (result) {
      mutate();
      setMessage('');
    } else {
      toast.error('Vui lòng thử lại!');
    }
  };

  const disabled = message.length === 0;

  return (
    <AddCommentWrapper>
      <TextField
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton aria-label='submit' edge='end' onClick={handleSubmit} disabled={disabled}>
                <SendSharpIcon color={disabled ? 'inherit' : 'success'} />
              </IconButton>
            </InputAdornment>
          )
        }}
        value={message}
        onChange={handleChange}
        multiline
        color='success'
      />
    </AddCommentWrapper>
  );
};

export default AddComment;
