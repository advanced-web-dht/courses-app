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
  const [isReady, setIsReady] = useState(false);
  const [selectedReview, setSelectedReview] = useState(-1);

  const { data: reviews } = useRequest<IReview[]>({ url: `/review/class/${info.id}` });
  const { data: review } = useRequest<IReview>({ url: isReady ? `/review/${selectedReview}` : undefined });

  const { isOpen, handleClose, handleOpen } = useToggle();

  useEffect(() => {
    if (selectedReview !== -1) {
      setIsReady(true);
      handleOpen();
    }
  }, [selectedReview]);

  const handleSelectReview = (reviewId: number): void => {
    setSelectedReview(reviewId);
  };

  const handleCloseModal = () => {
    setIsReady(false);
    setSelectedReview(-1);
    handleClose();
  };

  return (
    <React.Fragment>
      <ManagementList>
        {reviews?.map((item) => (
          <Review review={item} key={item.id} onClick={handleSelectReview} />
        ))}
      </ManagementList>
      <FullSizeModal open={isOpen}>
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
            <FormAction>{review?.id && <ReviewDetail review={review as IReview} />}</FormAction>
          </Form>
        </Zoom>
      </FullSizeModal>
    </React.Fragment>
  );
};

export default ReviewList;
