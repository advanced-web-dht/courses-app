import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import NewWindow from 'react-new-window';

import { StyledContainer, FormHeader, FormContent, FormFooter } from './style';
import useInput from '../../hooks/useInput';
import { checkEmailExisted, checkUsernameExisted, submitSignUp } from '../../api/client/auth';

const SignUpForm = () => {
	const router = useRouter();

	const [email, emailError, onEmailChange, onEmailError] = useInput();
	const [username, usernameError, onUsernameChange, onUsernameError] = useInput();
	const [password, passwordError, onPasswordChange, onPassWordError] = useInput();
	const [rePassword, rePasswordError, onRePasswordChange, onRePassWordError] = useInput();
	const [name, nameError, onNameChange, onNameError] = useInput();

	const [popup, setPopup] = useState(false);

	// Check Password is matched
	useEffect(() => {
		const id = setTimeout(() => {
			if (password !== rePassword) {
				onRePassWordError('Mật khẩu không khớp');
			}
		}, 500);
		return () => {
			clearTimeout(id);
		};
	}, [rePassword]);

	const checkEmailAvailable = useCallback(async () => {
		if (email) {
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
		}
	}, [email]);

	const checkUsernameAvailable = useCallback(async () => {
		if (username) {
			const isExisted = await checkUsernameExisted(username);
			if (isExisted) {
				onUsernameError('Tên đăng nhập đã tồn tại!');
			}
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

		if (emailError.status || usernameError.status || rePasswordError.status) {
			return;
		}
		const res = await submitSignUp({ email, username, password, name });
		if (res) {
			toast.success('Đăng ký thành công!', { onClose: () => router.push('/signin') });
		} else {
			toast.error('Đăng ký thất bại!');
		}
	};

	const handleGoogleSignIn = async () => {
		setPopup(true);
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
					<div id='signin-buttons'>
						<Button variant='contained' type='submit' onClick={handleSubmit} aria-label='Sign up'>
							Đăng ký
						</Button>
						<div>hoặc</div>
						<Button
							variant='contained'
							id='google-signin'
							type='button'
							onClick={handleGoogleSignIn}
							aria-label='Google Sign in'
						>
							<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
								<path d='M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z' />
							</svg>
							Google
						</Button>
					</div>
				</FormContent>
				<FormFooter>
					<span>Đã có tài khoản? </span>
					<Link href='/signin' passHref>
						<Button variant='text'>Đăng nhập</Button>
					</Link>
				</FormFooter>
			</div>
			{popup ? (
				<NewWindow
					url='/signin/google'
					onUnload={async () => {
						setPopup(false);
					}}
					features={{
						height: 700,
						width: 500,
						top: (window.outerHeight - 700) / 2,
						left: (window.outerWidth - 600) / 2
					}}
				/>
			) : null}
		</StyledContainer>
	);
};

export default SignUpForm;
