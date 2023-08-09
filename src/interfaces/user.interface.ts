export interface IUser {
    id?: string;
    email: string;
    password: string;
    secretKey?: string;
}

export interface ILoginInput {
    email: string;
    password: string;
}