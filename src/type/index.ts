export interface IClassMember {
	id?: number;
	name: string;
	detail?: {
		role: string;
	};
}

export interface IClass {
	id: number;
	code: string;
	name: string;
	members: IClassMember[];
	isOwner: boolean;
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
}
