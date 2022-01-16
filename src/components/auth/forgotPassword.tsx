import React, { useEffect, useRef } from 'react';
import Zoom from '@mui/material/Zoom';
import IconButton from '@mui/material/IconButton';
import XIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

import useToggle from '../../hooks/useToggle';
import useInput from '../../hooks/useInput';
import { RequestResetPassword, checkEmailExisted } from '../../api/client/auth';
import { StyledModal, Form, FormHeader, FormAction } from '../addClassModal/style';

const ForgotPassword: React.FC = () => {
  const { isOpen, handleClose, handleOpen } = useToggle();
  const [email, error, onEmailChange, onError, reset] = useInput();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (email) {
        const result = await checkEmailExisted(email);
        if (!result) {
          onError('Email chưa tồn tại! Vui lòng kiểm tra lại');
        }
      }
    }, 800);
    return () => clearTimeout(timeout);
  }, [email]);

  const HandleCloseModal = () => {
    reset();
    handleClose();
  };

  const HandleSubmit = async () => {
    if (email.trim() && !error.status) {
      const result = await RequestResetPassword(email);
      if (result) {
        toast.success('Yêu cầu lấy lại mật khẩu thành công! Vui lòng kiểm tra email');
        HandleCloseModal();
      } else {
        toast.warning('Có lỗi xảy ra! Vui lòng thử lại!');
      }
    } else {
      inputRef.current?.focus();
    }
  };

  const HandleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      await HandleSubmit();
    }
  };

  return (
    <React.Fragment>
      <Button variant='text' color='error' onClick={handleOpen} sx={{ textTransform: 'none' }}>
        Quên mật khẩu ?
      </Button>
      <StyledModal open={isOpen} onClose={HandleCloseModal}>
        <Zoom in={isOpen}>
          <Form>
            <FormHeader>
              <div>Quên mật khẩu</div>
              <IconButton onClick={HandleCloseModal}>
                <XIcon />
              </IconButton>
            </FormHeader>
            <FormAction component='form'>
              <TextField
                required
                variant='outlined'
                label='Email'
                placeholder='Nhập email đê lấy lại tài khoản'
                color='primary'
                value={email}
                onChange={onEmailChange}
                error={error.status}
                helperText={error.message}
                inputRef={inputRef}
                onKeyDown={HandleKeyPress}
                autoFocus
              />
              <Button variant='contained' color='primary' onClick={HandleSubmit} disabled={error.status}>
                Lấy
              </Button>
            </FormAction>
          </Form>
        </Zoom>
      </StyledModal>
    </React.Fragment>
  );
};

export default ForgotPassword;
