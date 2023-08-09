import { generateUserSecretKey, signToken } from '../../../helpers/auth.helpers';
import {
  IGenerate2FAQrCode,
  ILoginInput,
  ILoginResponse,
  IResetPasswordInput,
  IUser,
} from '../../../interfaces/user.interface';
import User from '../../../models/User';
import * as bcrypt from 'bcrypt';
import * as QRCode from 'qrcode';

export default class UserService {
  // This method registers a new user with the provided input
  static async registerUser(input: IUser): Promise<IUser> {
    try {
      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ email: input.email });

      if (existingUser) {
        throw new Error('A user with this email already exists');
      }

      // Hash the password before storing it in the database
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

  // This method handles user login
  static async login(input: ILoginInput): Promise<ILoginResponse> {
    const { email, password, secretKey } = input;

    try {
      // Find the user based on their email
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User not found');
      }

      // Check if the provided password matches the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid login credentials');
      }

      // If two-factor authentication is enabled, validate the secret key
      if (user.twoFactorAuthEnabled === true) {
        if (!secretKey) {
          throw new Error('2FA is enabled for this user. Please provide a secret key');
        }

        if (secretKey !== user.secretKey) {
          throw new Error('Invalid secret key');
        }
      }

      // Generate an access token using the user's ID and email
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

  // this method handles reset password
  static async resetPassword(input: IResetPasswordInput): Promise<IUser> {
    try {
      const { email, oldPassword, newPassword } = input;

      // Find the user based on their email
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User not found');
      }

      // Check if the provided password matches the stored hashed password
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid login credentials');
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the User in the database
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

  // This method enables two-factor authentication for a user
  static async enable2FA(email: string): Promise<IGenerate2FAQrCode> {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User not found');
      }

      if (user.secretKey || user.twoFactorAuthEnabled === true) {
        throw new Error('2FA is already enabled for this user');
      }

      // Generate a secret key and a QR code for the user
      const secretKey = await generateUserSecretKey(user.email);
      const qrCode = await QRCode.toDataURL(secretKey);

      // Update the user's document with the secret key and 2FA status
      await User.findByIdAndUpdate(
        { _id: user.id },
        { secretKey, twoFactorAuthEnabled: true },
        { new: true },
      );

      return qrCode;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // This method regenerates the QR code for two-factor authentication
  static async regenerate2FAQrCode(email: string): Promise<IGenerate2FAQrCode> {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User not found');
      }

      if (!user.secretKey || user.twoFactorAuthEnabled === false) {
        throw new Error('2FA is not enabled for this user. Please enable 2FA first');
      }

      // Regenerate the secret key and QR code
      const secretKey = await generateUserSecretKey(user.email);
      const qrCode = await QRCode.toDataURL(secretKey);

      // Update the user's document with the new secret key and 2FA status
      await User.findByIdAndUpdate(
        { _id: user.id },
        { secretKey, twoFactorAuthEnabled: true },
        { new: true },
      );

      return qrCode;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
