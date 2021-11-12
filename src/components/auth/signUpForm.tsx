import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

import { StyledContainer, FormHeader, FormContent, FormFooter } from './style';
import useInput from '../../hooks/useInput';
import { checkEmailExisted, checkUsernameExisted, submitSignUp } from '../../api/auth';

const SignUpForm = () => {
	const router = useRouter();

	const [email, emailError, onEmailChange, onEmailError] = useInput();
	const [username, usernameError, onUsernameChange, onUsernameError] = useInput();
	const [password, passwordError, onPasswordChange, onPassWordError] = useInput();
	const [name, nameError, onNameChange, onNameError] = useInput();

	const checkEmailAvailable = useCallback(async () => {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(email)) {
			const isExisted = await checkEmailExisted(email);
			if (isExisted) {
				onEmailError('Email đã tồn tại!');
			}
		} else {
			onEmailError('Email không hợp lệ!');
		}
	}, [email]);

	const checkUsernameAvailable = useCallback(async () => {
		const isExisted = await checkUsernameExisted(username);
		if (isExisted) {
			onUsernameError('Tên đăng nhập đã tồn tại!');
		}
	}, [username]);

	const handleSubmit = async (e: React.MouseEvent) => {
		e.preventDefault();
		// need improve
		if (password.length === 0) {
			onPassWordError('Mật khẩu không hợp lệ');
			return;
		}

		if (name.length === 0) {
			onNameError('Họ và tên không được để trống');
			return;
		}

		if (emailError.status || usernameError.status) {
			return;
		}
		const res = await submitSignUp({ email, username, password, name });
		if (res) {
			toast.success('Đăng ký thành công!', { onClose: () => router.push('/signin') });
		} else {
			toast.error('Đăng ký thất bại!');
		}
	};

	return (
		<StyledContainer>
			<div id='signin-form'>
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
						onBlur={checkEmailAvailable}
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
						onBlur={checkUsernameAvailable}
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
					<Button variant='contained' type='submit' onClick={handleSubmit}>
						Đăng ký
					</Button>
				</FormContent>
				<FormFooter>
					<span>Đã có tài khoản? </span>
					<Link href='/signin' passHref>
						<Button variant='text'>Đăng nhập</Button>
					</Link>
				</FormFooter>
			</div>
		</StyledContainer>
	);
};

export default SignUpForm;
