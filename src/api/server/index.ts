import axios from 'axios';

import { IClass } from '../../type';

export const provider = axios.create({ baseURL: process.env.NEXT_PUBLIC_SERVER_URL });

export const GetAllClasses = async (accessToken: string): Promise<IClass[]> => {
	try {
		const response = await provider.get('/classes', { headers: { Authorization: `Bearer ${accessToken}` } });
		return response.data as IClass[];
	} finally {
		// do nothing
	}
};

export const GetClass = async (code: string, accessToken: string): Promise<IClass> => {
	try {
		const response = await provider.get(`/classes/${code}`, {
			headers: { Authorization: `Bearer ${accessToken}` }
		});
		return response.data as IClass;
	} finally {
		// do nothing
	}
};

export const GetClassByCodeToEnroll = async (classCode: string): Promise<IClass> => {
	try {
		const response = await provider.get(`/classes/${classCode}/enroll`);
		return response.data as IClass;
	} finally {
		// do nothing
	}
};
