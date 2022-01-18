import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

import RoundedButton from '../UI/RoundedButton';
import useInput from '../../hooks/useInput';
import useRedirect from '../../hooks/useRedirect';
import { checkEmailExisted, checkUsernameExisted, submitSignUp } from '../../api/client/auth';
import GoogleSignIn from './google';
import { StyledContainer, FormWrapper, FormHeader, FormContent, FormFooter, GoogleButton, FormActions } from './style';
import { EMAIL_CHECK, PASSWORD_CHECK } from '../../constants';

const SignUpForm = () => {
  const [email, emailError, onEmailChange, onEmailError] = useInput();
  const [username, usernameError, onUsernameChange, onUsernameError] = useInput();
  const [password, passwordError, onPasswordChange, onPassWordError] = useInput();
  const [rePassword, rePasswordError, onRePasswordChange, onRePassWordError] = useInput();
  const [name, nameError, onNameChange] = useInput();

  const [popup, setPopup] = useState(false);
  const redirect = useRedirect('/signin');
  const redirectUrl = redirect.url ? `?redirect=${redirect.url}` : '';

  // Check email existed
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (email) {
        if (EMAIL_CHECK.test(email)) {
          const isExisted = await checkEmailExisted(email);

          if (isExisted) {
            onEmailError('Email đã tồn tại!');
          }
        } else {
          onEmailError('Email không hợp lệ!');
        }
      }
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [email]);

  // Check username existed
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (username) {
        const isExisted = await checkUsernameExisted(username);
        if (isExisted) {
          onUsernameError('Tên đăng nhập đã tồn tại!');
        }
      }
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [username]);

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

  const handleSignUpSuccess = useCallback(() => {
    (async () => {
      await redirect.doRedirect('/signin');
    })();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !username || !password || !rePassword || !name) {
      toast.warn('Vui lòng điền đầy đủ thông tin!!');
      return;
    }

    if (emailError.status || usernameError.status || rePasswordError.status || passwordError.status) {
      toast.warn('Vui lòng kiểm tra lại thông tin!!');
      return;
    }
    const res = await submitSignUp({ email, username, password, name });
    if (res) {
      toast.success('Đăng ký thành công!', { onClose: handleSignUpSuccess });
    } else {
      toast.error('Đăng ký thất bại!');
    }
  };

  const handleGoogleSignIn = async () => {
    setPopup(true);
  };

  return (
    <StyledContainer>
      <FormWrapper>
        <FormHeader>Đăng ký tài khoản mới</FormHeader>
        <FormContent>
          <TextField
            id='email'
            label='Email'
            margin='normal'
            fullWidth
            required
            autoComplete='off'
            variant='standard'
            type='email'
            value={email}
            error={emailError.status}
            helperText={emailError.message}
            onChange={onEmailChange}
          />
          <TextField
            id='username'
            label='Tên đăng nhập'
            margin='normal'
            fullWidth
            required
            autoComplete='off'
            variant='standard'
            value={username}
            error={usernameError.status}
            helperText={usernameError.message}
            onChange={onUsernameChange}
          />
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
          <TextField
            id='name'
            label='Họ và tên'
            margin='normal'
            fullWidth
            required
            autoComplete='off'
            variant='standard'
            value={name}
            error={nameError.status}
            helperText={nameError.message}
            onChange={onNameChange}
          />
          <FormActions>
            <RoundedButton variant='contained' type='submit' onClick={handleSubmit} aria-label='Sign up'>
              Đăng ký
            </RoundedButton>
            <div>hoặc</div>
            <GoogleButton variant='contained' color='error' type='button' onClick={handleGoogleSignIn} aria-label='Google Sign in'>
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                <path d='M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z' />
              </svg>
              Google
            </GoogleButton>
          </FormActions>
        </FormContent>
        <FormFooter>
          <div>
            <span>Đã có tài khoản? </span>
            <Link href={`/signin${redirectUrl}`} passHref>
              <Button variant='text' color='error'>
                Đăng nhập
              </Button>
            </Link>
          </div>
        </FormFooter>
      </FormWrapper>
      {popup && <GoogleSignIn onSuccess={() => setPopup(false)} />}
    </StyledContainer>
  );
};

export default SignUpForm;
