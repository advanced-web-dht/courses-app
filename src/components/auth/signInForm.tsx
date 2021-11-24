import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/client';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { FormActions, FormContent, FormFooter, FormHeader, FormWrapper, GoogleButton, StyledContainer } from './style';
import RoundedButton from '../UI/RoundedButton';
import GoogleSignIn from './google';
import useInput from '../../hooks/useInput';
import useRedirect from '../../hooks/useRedirect';

const SignInForm = () => {
	const [username, setUsername] = useState('');
	const [popup, setPopup] = useState(false);
	const [password, error, setPassword, setError] = useInput();
	const { url } = useRedirect();
	const redirectUrl = url ? `?redirect=${url}` : '';

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const response = await signIn('credentials', { redirect: false, password, username });
		if (response?.error) {
			setError('Tên đăng nhập hoặc mật khẩu không chính xác');
		}
	};

	const handleGoogleSignIn = async () => {
		setPopup(true);
	};

	return (
		<StyledContainer>
			<FormWrapper>
				<FormHeader>Đăng nhập vào Fit Class</FormHeader>
				<FormContent>
					<TextField
						id='email'
						label='Tên đăng nhập hoặc email'
						margin='normal'
						fullWidth
						required
						autoComplete='off'
						variant='standard'
						value={username}
						onChange={({ target }) => setUsername(target.value)}
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
						onChange={setPassword}
						error={error.status}
						helperText={error.message}
					/>
					<FormActions>
						<RoundedButton variant='contained' type='submit' onClick={handleSubmit} aria-label='Sign in'>
							Đăng Nhập
						</RoundedButton>
						<div>hoặc</div>
						<GoogleButton
							variant='contained'
							color='error'
							type='button'
							onClick={handleGoogleSignIn}
							aria-label='Google Sign in'
						>
							<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
								<path d='M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z' />
							</svg>
							Google
						</GoogleButton>
					</FormActions>
				</FormContent>
				<FormFooter>
					<span>Chưa có tài khoản? </span>
					<Link href={`/signup${redirectUrl}`} passHref>
						<Button variant='text' color='error'>
							Đăng Ký
						</Button>
					</Link>
				</FormFooter>
			</FormWrapper>
			{popup && <GoogleSignIn onSuccess={() => setPopup(false)} />}
		</StyledContainer>
	);
};

export default SignInForm;
