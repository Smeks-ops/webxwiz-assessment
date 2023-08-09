import { signToken } from '../../../helpers/auth.helpers';
import {
  ILoginInput,
  ILoginResponse,
  IResetPasswordInput,
  IUser,
} from '../../../interfaces/user.interface';
import User from '../../../models/User';
import * as bcrypt from 'bcrypt';

export default class UserService {
  static async registerUser(input: IUser): Promise<IUser> {
    try {
      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ email: input.email });

      if (existingUser) {
        throw new Error('A user with this email already exists');
      }

      // hash password
      const hashedPassword = await bcrypt.hash(input.password, 10);

      // Create a new user based on validated input
      const newUser = await User.create({
        email: input.email,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async login(input: ILoginInput): Promise<ILoginResponse> {
    const { email, password } = input;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid login credentials');
      }

      const accessToken = signToken({
        sub: user.id,
        email: user.email,
      });

      return {
        user,
        token: accessToken,
      };
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  static async resetPassword(input: IResetPasswordInput): Promise<IUser> {
    try {
      const { email, oldPassword, newPassword } = input;

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid login credentials');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updatedUser = await User.findByIdAndUpdate(
        { _id: user.id },
        { password: hashedPassword },
        { new: true },
      );

      return updatedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
