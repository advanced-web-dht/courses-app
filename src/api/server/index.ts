import axios from 'axios';

import { IClass, IPointPart } from '../../type';

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

export const GetAllGrades = async (classId: number, accessToken: string): Promise<IPointPart[]> => {
  try {
    const response = await provider.get(`/pointpart/${classId}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data.result as IPointPart[];
  } finally {
    // do nothing
  }
};
