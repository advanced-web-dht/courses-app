export interface IAccount {
  id?: number;
  name: string;
  studentId: string;
  email?: string;
}

export interface IStudent {
  id: number;
  studentId: string;
  name: string;
  account: IAccount;
  final?: number;
  grades?: Array<IPointPart & { detail: IPoint }>;
}

export interface IClass {
  id: number;
  code: string;
  name: string;
  teachers: IAccount[];
  students: IStudent[];
  role: string;
  grades?: IPointPart[];
  owner: IAccount;
}

export interface ICreateClassDTO {
  name: string;
}

export interface ISignUpDTO {
  email: string;
  username: string;
  password: string;
  name: string;
}

export interface SignInResponse {
  token: string;
  username: string;
  name: string;
}

export interface IPointPart {
  id: number;
  classId: number;
  name: string;
  ratio: number;
  order: number;
  isDone: boolean;
  students?: Array<IStudent & { detail: IPoint }>;
  reviews: IReview[];
}

export interface IAssignment {
  id: number;
  name: string;
  dateEnded: string;
}

export interface IPoint {
  studentId: string;
  pointPartId: number;
  classId: number;
  point: number;
}

export interface IReview {
  id: number;
  accountId: number;
  pointPartId: number;
  content: string;
  comments: IComment[];
  grade: IPointPart;
  requester: IAccount;
  createdAt: string;
  prePoint: number;
  expectedPoint: number;
  finalPoint: number;
  isDone: boolean;
}

export interface IComment {
  id: number;
  reviewId: number;
  accountId: number;
  message: string;
  sender: IAccount;
  review: IReview;
  createdAt: string;
}
