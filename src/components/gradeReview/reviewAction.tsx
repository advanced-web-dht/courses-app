import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Zoom from '@mui/material/Zoom';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';

import useToggle from '../../hooks/useToggle';
import useInput from '../../hooks/useInput';
import { MakeReviewDone } from '../../api/client';
import { StyledModal, Form, FormHeader, FormAction } from '../addClassModal/style';

interface ReviewActionProps {
  reviewId: number;
  pointPartId: number;
  csId: number;
}

const ReviewAction: React.FC<ReviewActionProps> = ({ reviewId, csId, pointPartId }) => {
  const { isOpen, handleOpen, handleClose } = useToggle();
  const [point, error, onChangePoint, onPointError, reset] = useInput();

  const HandlePreSubmit = () => {
    if (!point) {
      onPointError('Không được bỏ trống điểm mới');
      return;
    }

    const numberPoint = Number(point);
    if (numberPoint < 0 || numberPoint > 10) {
      onPointError('Điểm số không hợp lệ (0 <= điểm >= 10');
      return;
    }

    handleOpen();
  };

  const HandleSubmit = async () => {
    const numberPoint = Number(point);
    const result = await MakeReviewDone(reviewId, csId, pointPartId, numberPoint);
    if (result) {
      toast.success('Cập nhật thành công');
      reset();
      handleClose();
    } else {
      toast.error('Đã có lỗi xảy ra');
    }
  };

  return (
    <div>
      <Accordion sx={{ mt: 1, mb: 1 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component='div' fontWeight='bold' color='error' fontSize='14pt'>
            Thay đổi điểm
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <TextField
            inputProps={{ type: 'number', min: 0, max: 10 }}
            fullWidth
            label='Điểm số cuối cùng'
            value={point}
            helperText={error.message}
            error={error.status}
            onChange={onChangePoint}
            color='secondary'
          />
          <Button
            sx={{ ml: 1, width: '120px!important', textTransform: 'none' }}
            variant='contained'
            color='error'
            onClick={HandlePreSubmit}
          >
            Cập nhật
          </Button>
        </AccordionDetails>
      </Accordion>
      <StyledModal open={isOpen} onClose={handleClose}>
        <Zoom in={isOpen}>
          <Form>
            <FormHeader>
              <Typography component='h2' fontWeight='bold' fontSize='18pt'>
                Xác nhận
              </Typography>
            </FormHeader>
            <FormAction>
              <Typography component='p' fontWeight='medium' fontSize='14pt' color='error'>
                Xác nhận thay đổi điểm và kết thúc yêu cầu phúc khảo
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                <Button variant='contained' sx={{ m: 1, p: 1 }} color='success' onClick={HandleSubmit}>
                  Thay đổi
                </Button>
                <Button variant='contained' sx={{ m: 1, p: 1 }} color='error' onClick={handleClose}>
                  Huỷ
                </Button>
              </Box>
            </FormAction>
          </Form>
        </Zoom>
      </StyledModal>
    </div>
  );
};

export default ReviewAction;
