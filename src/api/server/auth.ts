import { User } from 'next-auth';
import { provider } from './index';

export const submitGoogleSignIn = async (email: string, name: string, accessToken: string): Promise<User> => {
	try {
		const response = await provider.post('/auth/signin/google', { name, email, accessToken });
		return response.data;
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

export const getProfile = async (accessToken: string): Promise<Record<string, string>> => {
	try {
		const response = await provider.get('/accounts/profile', {
			headers: { Authorization: `Bearer ${accessToken}` }
		});
		return response.data;
	} finally {
		// do nothing
	}
};
