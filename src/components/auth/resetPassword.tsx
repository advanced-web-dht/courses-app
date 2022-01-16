import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import RoundedButton from '../UI/RoundedButton';
import useInput from '../../hooks/useInput';
import { PostNewPassword } from '../../api/client/auth';
import { StyledContainer, FormWrapper, FormHeader, FormContent, FormActions } from './style';
import { PASSWORD_CHECK } from '../../constants';

const SignUpForm = () => {
  const [password, passwordError, onPasswordChange, onPassWordError] = useInput();
  const [rePassword, rePasswordError, onRePasswordChange, onRePassWordError] = useInput();
  const router = useRouter();

  // Check password valid
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (password) {
        if (!PASSWORD_CHECK.test(password)) {
          onPassWordError('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!');
        }
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [password]);

  // Check Password is matched
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (password !== rePassword) {
        onRePassWordError('Mật khẩu không khớp');
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [rePassword]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!password && !rePassword) {
      toast.warn('Vui lòng điền đầy đủ thông tin!!');
      return;
    }

    const result = await PostNewPassword(password, router.query.token as string);
    if (result) {
      toast.success('Lấy lại mật khẩu thành công!', { onClose: () => router.push('/signin') });
    } else {
      toast.error('Có lỗi xảy ra! Token hết hạn hoặc không hợp lệ');
    }
  };

  return (
    <StyledContainer>
      <FormWrapper>
        <FormHeader>Cập nhật mật khẩu</FormHeader>
        <FormContent>
          <TextField
            id='password'
            label='Mật khẩu'
            margin='normal'
            fullWidth
            required
            autoComplete='off'
            type='password'
            variant='standard'
            value={password}
            error={passwordError.status}
            helperText={passwordError.message}
            onChange={onPasswordChange}
          />
          <TextField
            id='re-password'
            label='Xác nhận mật khẩu'
            margin='normal'
            fullWidth
            required
            autoComplete='off'
            type='password'
            variant='standard'
            value={rePassword}
            error={rePasswordError.status}
            helperText={rePasswordError.message}
            onChange={onRePasswordChange}
          />
          <FormActions>
            <RoundedButton
              variant='contained'
              type='submit'
              onClick={handleSubmit}
              aria-label='update'
              disabled={passwordError.status || rePasswordError.status}
            >
              Cập nhật
            </RoundedButton>
          </FormActions>
        </FormContent>
      </FormWrapper>
    </StyledContainer>
  );
};

export default SignUpForm;
