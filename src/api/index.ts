import axios from 'axios';

import { IClass, ICreateClassDTO } from '../type';

export const provider = axios.create({ baseURL: process.env.NEXT_PUBLIC_SERVER_URL });

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
