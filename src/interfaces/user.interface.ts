export interface IUser {
  id?: string;
  email: string;
  password: string;
}

export interface ILoginInput {
  email: string;
  password: string;
  secretKey?: string;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}

export interface IResetPasswordInput {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface IResetPasswordResponse {
  user: IUser;
  token: string;
}

export interface IGenerate2FAQrCode {
  code: string;
}
