export interface IClass {
	id: number;
	code: string;
	cover: string;
	name: string;
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
