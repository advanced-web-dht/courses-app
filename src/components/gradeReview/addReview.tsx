import React, { useState } from 'react';
import { KeyedMutator } from 'swr';
import Button from '@mui/material/Button';
import Zoom from '@mui/material/Zoom';
import XIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import useToggle from '../../hooks/useToggle';
import useInput from '../../hooks/useInput';
import { AddReviewContainer, TextArea } from './style';
import { StyledModal, Form, FormAction, FormHeader } from '../addClassModal/style';
import RoundedButton from '../UI/RoundedButton';
import { PostNewReview } from '../../api/client';
import { IPointPart } from '../../type';

interface AddReviewProps {
  mutate: KeyedMutator<AxiosResponse<IPointPart[], unknown>>;
  gradeId: number;
  currentPoint: number;
}

const AddReview: React.FC<AddReviewProps> = ({ mutate, gradeId, currentPoint }) => {
  const { isOpen, handleOpen, handleClose } = useToggle();

  const [content, setContent] = useState('');
  const [expectedPoint, expectedPointError, onChangeExpectedPoint, onExpectedPointError, resetExpectedPoint] = useInput();

  const HandleCloseModal = () => {
    setContent('');
    resetExpectedPoint();
    handleClose();
  };

  const handleChangeContent = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(target.value);
  };

  const handleSubmit = async () => {
    const trimmedContent = content.trim();
    if (!trimmedContent) {
      toast.error('Vui lòng trình bày nội dung!');
      return;
    }

    if (!expectedPoint) {
      onExpectedPointError('Vui lòng nhập số điểm mong muốn!');
      return;
    }

    const result = await PostNewReview(gradeId, trimmedContent, currentPoint, Number(expectedPoint));
    if (result) {
      mutate();
      toast.success('Yêu cầu phúc khảo của bạn đã được gửi! Giảng viên sẽ sớm trả lời');
      HandleCloseModal();
    } else {
      toast.error('Yêu cầu phúc khảo không thành công!');
    }
  };

  return (
    <AddReviewContainer>
      <Button variant='contained' onClick={handleOpen}>
        Yêu cầu phúc khảo
      </Button>
      <StyledModal open={isOpen}>
        <Zoom in={isOpen}>
          <Form width={700}>
            <FormHeader>
              <div>Yêu cầu phúc khảo</div>
              <IconButton onClick={HandleCloseModal}>
                <XIcon />
              </IconButton>
            </FormHeader>
            <FormAction>
              <TextArea aria-label='content' placeholder='Nội dung yêu cầu' value={content} onChange={handleChangeContent} />
              <TextField
                label='Số điểm mong muốn'
                helperText={expectedPointError.message}
                error={expectedPointError.status}
                value={expectedPoint}
                sx={{ mt: 2 }}
                inputProps={{
                  min: 0,
                  max: 10,
                  type: 'number'
                }}
                onChange={onChangeExpectedPoint}
              />
              <RoundedButton variant='contained' color='warning' onClick={handleSubmit} sx={{ width: '70px!important' }}>
                Gửi
              </RoundedButton>
            </FormAction>
          </Form>
        </Zoom>
      </StyledModal>
    </AddReviewContainer>
  );
};

export default AddReview;
