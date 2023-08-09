import { IUser } from '../interfaces/user.interface';

export interface IContextRequest {
  req: any;
}

export interface IContext {
  user?: IUser;
  error?: string;
}
