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
