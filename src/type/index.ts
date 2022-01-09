export interface IClassMember {
  id?: number;
  name: string;
  studentId: string;
}

export interface IStudent {
  studentId?: string;
  name: string;
  account: IClassMember;
}

export interface IClass {
  id: number;
  code: string;
  name: string;
  teachers: IClassMember[];
  students: IStudent[];
  role: string;
  grades?: IPointPart[];
  owner: IClassMember;
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
  isDone: number;
}

export interface IAssignment {
  id: number;
  name: string;
  dateEnded: string;
}
