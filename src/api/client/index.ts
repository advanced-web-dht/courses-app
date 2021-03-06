import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/client';

import { IAssignment, IClass, ICreateClassDTO, IPointPart, IStudent } from '../../type';

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

export const EnrollClass = async (classId: number, studentId: string): Promise<{ isSuccess: boolean; message: string }> => {
  try {
    const response = await provider.post(`/classes/${classId}/students`, { studentId });
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

export const EnrollClassForTeacher = async (classId: number, token: string): Promise<{ isSuccess: boolean; message: string }> => {
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

export const AddPointPart = async (classId: number, order: number, ratio: number, name: string): Promise<IPointPart> => {
  try {
    const url = `/pointpart/add`;
    const response = await provider.post(url, { classId, order, ratio, name });
    return response.data.PointPart as IPointPart;
  } finally {
    // nothing
  }
};

export const UpdatePointPart = async (classId: number, ratio: number, name: string, id: number): Promise<boolean> => {
  try {
    const url = `/pointpart/${id}`;
    const response = await provider.put(url, { classId, ratio, name });
    return response.data.isSuccess as boolean;
  } catch {
    return false;
  }
};

export const UpdatePointPartOrder = async (classId: number, order: Record<string, number>[]): Promise<boolean> => {
  try {
    const url = `/pointpart/order`;
    const response = await provider.put(url, { classId, order });
    return response.data.isSuccess as boolean;
  } catch {
    return false;
  }
};

export const GetAllGrades = async (classId: number): Promise<IPointPart[]> => {
  try {
    const response = await provider.get(`/pointpart/${classId}`);
    return response.data.result as IPointPart[];
  } finally {
    // do nothing
  }
};

export const AddAssignment = async (classId: number, pointPartId: number, name: string, dateEnded: Date): Promise<IAssignment> => {
  try {
    const url = `/assignment/add`;
    const response = await provider.post(url, { classId, pointPartId, dateEnded, name });
    return response.data.assignment as IAssignment;
  } finally {
    // nothing
  }
};

export const GetAllAssignments = async (classId: number): Promise<IAssignment[]> => {
  try {
    const response = await provider.get(`/assignment/${classId}`);
    return response.data.result as IAssignment[];
  } finally {
    // do nothing
  }
};

export const DeleteAssignment = async (classId: number, id: number): Promise<boolean> => {
  try {
    const url = `/assignment/${id}`;
    const response = await provider.put(url, { classId });
    return response.data.isSuccess as boolean;
  } catch {
    return false;
  }
};

export const UpdateAssignment = async (classId: number, name: string, dateEnded: Date, id: number): Promise<boolean> => {
  try {
    const url = `/assignment`;
    const response = await provider.put(url, { classId, name, dateEnded, id });
    return response.data.isSuccess as boolean;
  } catch {
    return false;
  }
};

export const UploadStudents = async (classId: number, students: Array<unknown>): Promise<IStudent[]> => {
  try {
    const url = `/classes/${classId}/list`;
    const { data } = await provider.post(url, students);
    return data;
  } catch {
    return [];
  }
};

export const UploadGradePoints = async (classId: number, points: Array<unknown>, pointPartId: number): Promise<boolean> => {
  try {
    const url = `/points/list`;
    await provider.post(url, { classId, points, pointPartId });
    return true;
  } catch {
    return false;
  }
};

export const MarkGradeDone = async (pointpartId: number, classId: number): Promise<boolean> => {
  try {
    const url = `/pointpart/${pointpartId}/done`;
    await provider.patch(url, { classId });
    return true;
  } catch {
    return false;
  }
};

export const MarkGradePending = async (pointpartId: number, classId: number): Promise<boolean> => {
  try {
    const url = `/pointpart/${pointpartId}/pending`;
    await provider.patch(url, { classId });
    return true;
  } catch {
    return false;
  }
};

export const PostNewReview = async (pointPartId: number, content: string, prePoint: number, expectedPoint: number): Promise<boolean> => {
  try {
    const url = '/review';
    await provider.post(url, { pointPartId, content, prePoint, expectedPoint });
    return true;
  } catch {
    return false;
  }
};

export const PostNewComment = async (reviewId: number, message: string): Promise<boolean> => {
  try {
    const url = `/review/${reviewId}/comments`;
    await provider.post(url, { message });
    return true;
  } catch {
    return false;
  }
};

export const GetStudentOfClass = async (classId: number, studentId: string): Promise<IStudent | null> => {
  try {
    const url = `/classes/${classId}/student/${studentId}`;
    const result = await provider.get(url);
    return result.data;
  } catch {
    return null;
  }
};

export const MakeReviewDone = async (
  reviewId: number,
  csId: number,
  pointPartId: number,
  finalPoint: number,
  classId: number
): Promise<IStudent | null> => {
  try {
    const url = `/review/${reviewId}/done`;
    const result = await provider.put(url, { csId, pointPartId, finalPoint, classId });
    return result.data;
  } catch {
    return null;
  }
};

export const UpdateNotificationStatus = async (notificationId: number): Promise<boolean> => {
  try {
    const url = `/notifications/${notificationId}`;
    await provider.patch(url);
    return true;
  } catch {
    return false;
  }
};

export const DeleteGrade = async (id: number, classId: number): Promise<boolean> => {
  try {
    const url = `/pointpart/${id}/class/${classId}`;
    await provider.delete(url);
    return true;
  } catch {
    return false;
  }
};
