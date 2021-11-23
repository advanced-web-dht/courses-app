import axios, { AxiosError, AxiosRequestConfig } from 'axios';
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

export const EnrollClass = async (classId: number): Promise<{ isSuccess: boolean; message: string }> => {
	try {
		const response = await provider.post(`/classes/${classId}/students`);
		return {
			isSuccess: response.data.isSuccess as boolean,
			message: 'Ghi danh lớp học thành công'
		};
	} catch (e) {
		const axiosError = e as AxiosError;
		if (axiosError.response?.status === 409) {
			return {
				isSuccess: false,
				message: 'Bạn đã tham gia lớp học này trước đó'
			};
		}
		return {
			isSuccess: false,
			message: 'Lỗi server'
		};
	}
};

export const EnrollClassForTeacher = async (
	classId: number,
	token: string
): Promise<{ isSuccess: boolean; message: string }> => {
	try {
		const response = await provider.post(`/classes/${classId}/teachers`, { token });
		return { isSuccess: response.data.isSuccess as boolean, message: 'Bạn đã trở thành giảng viên' };
	} catch (e) {
		const axiosError = e as AxiosError;
		if (axiosError.response?.status === 409) {
			return {
				isSuccess: false,
				message: 'Bạn đã tham gia lớp học này trước đó'
			};
		}
		if (axiosError.response?.status === 401) {
			return {
				isSuccess: false,
				message: 'Token đã hết hạn hoặc không hợp lệ'
			};
		}

		return {
			isSuccess: false,
			message: 'Lỗi server'
		};
	}
};

export const InviteStudent = async (classCode: string, email: string, isTeacher: boolean): Promise<boolean> => {
	try {
		const url = `/classes/${classCode}/invite`;
		const response = await provider.post(url, { email, isTeacher });
		return response.data.isSuccess as boolean;
	} catch (e) {
		return false;
	}
};
