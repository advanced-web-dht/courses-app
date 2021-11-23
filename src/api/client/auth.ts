import { provider } from './index';
import { ISignUpDTO } from '../../type';

export const checkEmailExisted = async (email: string): Promise<boolean> => {
	try {
		const response = await provider.post('/accounts/check-email', { email });
		return response.data.isExisted as boolean;
	} finally {
		// do nothing
	}
};

export const checkUsernameExisted = async (username: string): Promise<boolean> => {
	try {
		const response = await provider.post('/accounts/check-username', { username });
		return response.data.isExisted as boolean;
	} finally {
		// do nothing
	}
};

export const submitSignUp = async (newAccount: ISignUpDTO): Promise<boolean> => {
	try {
		const response = await provider.post('/auth/register', newAccount);
		return response.data.isSuccess as boolean;
	} finally {
		// do nothing
	}
};

export const getProfile = async (): Promise<Record<string, string>> => {
	try {
		const response = await provider.get('/accounts/profile');
		return response.data;
	} finally {
		// do nothing
	}
};

export const updateProfie = async (name: string, studentId: string): Promise<Record<string, string>> => {
	try {
		const response = await provider.put('/accounts', { name, studentId });
		return response.data;
	} catch (e) {
		return {
			message: 'Cập nhật không thành công'
		};
	}
};
