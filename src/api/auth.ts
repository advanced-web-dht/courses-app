import { provider } from './index';
import { ISignUpDTO, SignInResponse } from '../type';

export const checkEmailExisted = async (email: string): Promise<boolean> => {
	try {
		const response = await provider.post('/accounts/check-email', { email });
		return response.data.isExist as boolean;
	} finally {
		// do nothing
	}
};

export const checkUsernameExisted = async (username: string): Promise<boolean> => {
	try {
		const response = await provider.post('/accounts/check-username', { username });
		return response.data.isExist as boolean;
	} finally {
		// do nothing
	}
};

export const submitSignUp = async (newAccount: ISignUpDTO): Promise<boolean> => {
	try {
		const response = await provider.post('/auth/signup', newAccount);
		return response.data.isSuccess as boolean;
	} finally {
		// do nothing
	}
};

export const submitSignIn = async (credential: Record<string, string>): Promise<Record<string, string>> => {
	try {
		const response = await provider.post('/auth/signin', credential);
		return response.data;
	} finally {
		// do nothing
	}
};
