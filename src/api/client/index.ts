import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getSession } from 'next-auth/client';

import { IClass, ICreateClassDTO } from '../../type';

export const provider = axios.create({ baseURL: process.env.NEXT_PUBLIC_SERVER_URL });

provider.interceptors.request.use(async (req: AxiosRequestConfig) => {
	const session = await getSession();
	if (session && req?.headers) {
		req.headers.Authorization = `Bearer ${session.accessToken}`;
	}
	return req;
});

export const AddNewClass = async ({ name }: ICreateClassDTO): Promise<IClass> => {
	try {
		const response = await provider.post('/classes', { name });
		return response.data as IClass;
	} finally {
		// do nothing
	}
};

export const GetAllClasses = async (): Promise<IClass[]> => {
	try {
		const response = await provider.get('/classes');
		return response.data as IClass[];
	} finally {
		// do nothing
	}
};

export const GetClassByCode = async (classCode: string): Promise<IClass> => {
	try {
		const response = await provider.get(`/classes/${classCode}`);
		return response.data as IClass;
	} finally {
		// do nothing
	}
};

export const EnrollClass = async (classId: number): Promise<boolean> => {
	try {
		const response = await provider.post(`/classes/${classId}/students`);
		return response.data.isSuccess as boolean;
	} catch (e) {
		const axiosError = e as AxiosError;
		if (axiosError.response?.status === 301) {
			return false;
		}
		console.log('Internal Server Error');
		return false;
	}
};

export const InviteStudent = async (classCode: string, email: string): Promise<boolean> => {
	try {
		const response = await provider.post(`/classes/${classCode}/invite`, { email });
		return response.data.isSuccess as boolean;
	} catch (e) {
		return false;
	}
};
