import React from 'react';
import Typography from '@mui/material/Typography';

import Container from '../UI/Container';
import ReviewList from './reviewList';
import { ManagementHeader } from './style';

const ReviewManagement: React.FC = () => {
  return (
    <Container>
      <ManagementHeader>
        <Typography variant='h4' fontWeight='bold'>
          Danh sách yêu cầu phúc khảo
        </Typography>
      </ManagementHeader>
      <ReviewList />
    </Container>
  );
};

export default ReviewManagement;
