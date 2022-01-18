import React, { useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';

import { checkEmailExisted, RequestActivate } from '../../api/client/auth';
import { FormActions, FormContent, FormHeader, FormWrapper, StyledContainer } from './style';
import RoundedButton from '../UI/RoundedButton';
import useInput from '../../hooks/useInput';

const SignInForm = () => {
  const [email, error, onEmailChange, onError] = useInput();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const result = await checkEmailExisted(email);
      if (!result) {
        onError('Email chưa tồn tại! Vui lòng kiểm tra lại');
      }
    }, 800);
    return () => clearTimeout(timeout);
  }, [email]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (email.trim() && !error.status) {
      const result = await RequestActivate(email);
      if (result) {
        toast.success('Yêu cầu kích hoạt tài khoản thành công! Vui lòng kiểm tra email');
      } else {
        toast.warning('Có lỗi xảy ra! Vui lòng thử lại');
      }
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <StyledContainer>
      <FormWrapper>
        <FormHeader>Yêu cầu kích hoạt tài khoản</FormHeader>
        <FormContent>
          <TextField
            id='email'
            label='Email'
            margin='normal'
            fullWidth
            required
            autoComplete='off'
            variant='standard'
            value={email}
            onChange={onEmailChange}
            inputRef={inputRef}
            error={error.status}
            helperText={error.message}
          />
          <FormActions>
            <RoundedButton variant='contained' type='submit' onClick={handleSubmit} aria-label='Activate' disabled={error.status}>
              Đăng Nhập
            </RoundedButton>
          </FormActions>
        </FormContent>
      </FormWrapper>
    </StyledContainer>
  );
};

export default SignInForm;
