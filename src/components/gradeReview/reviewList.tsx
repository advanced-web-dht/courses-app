import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import XIcon from '@mui/icons-material/Close';
import Zoom from '@mui/material/Zoom';

import { AppState } from '../../reducers';
import useRequest from '../../hooks/useRequest';
import useToggle from '../../hooks/useToggle';
import Review from './review';
import { ManagementList } from './style';
import { IReview } from '../../type';
import FullSizeModal from '../UI/FullSizeModal';
import { Form, FormAction, FormHeader } from '../addClassModal/style';
import ReviewDetail from './reviewDetail';

const ReviewList: React.FC = () => {
  const { info } = useSelector((state: AppState) => state.currentClass);
  const [selectedReview, setSelectedReview] = useState(-1);

  const { data: reviews, mutate } = useRequest<IReview[]>({ url: `/review/class/${info.id}` });

  const { isOpen, handleClose, handleOpen } = useToggle();

  useEffect(() => {
    if (selectedReview !== -1) {
      handleOpen();
    }
  }, [selectedReview]);

  const handleCloseModal = () => {
    setSelectedReview(-1);
    mutate();
    handleClose();
  };

  return reviews ? (
    <React.Fragment>
      <ManagementList>
        {reviews.map((item, index) => (
          <Review review={item} key={item.id} onClick={() => setSelectedReview(index)} />
        ))}
      </ManagementList>
      <FullSizeModal open={isOpen} keepMounted={false}>
        <Zoom in={isOpen}>
          <Form width={800}>
            <FormHeader>
              <Typography variant='h4' color='#1967D2' fontWeight='bold'>
                Yêu cầu phúc khảo
              </Typography>
              <IconButton onClick={handleCloseModal}>
                <XIcon />
              </IconButton>
            </FormHeader>
            <FormAction>
              {selectedReview !== -1 && (
                <ReviewDetail reviewId={reviews[selectedReview].id} studentId={reviews[selectedReview].requester.studentId} />
              )}
            </FormAction>
          </Form>
        </Zoom>
      </FullSizeModal>
    </React.Fragment>
  ) : null;
};

export default ReviewList;
