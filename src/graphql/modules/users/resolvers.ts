import { IContext } from '../../../types/context';
import {
  MutationCreateUserArgs,
  MutationEnable2FAArgs,
  MutationLoginArgs,
  MutationResetPasswordArgs,
} from '../../../types/queryArgs';
import UserService from './services';
import {
  enable2FAInputSchema,
  loginInputSchema,
  registrationInputSchema,
  resetPasswordInputSchema,
} from './validators';

const resolvers = {
  Mutation: {
    registerUser: async (_, { email, password }: MutationCreateUserArgs) => {
      try {
        // Validate input against the schema with zod
        const validatedInput = registrationInputSchema.parse({ email, password });

        const user = await UserService.registerUser({
          email: validatedInput.email,
          password: validatedInput.password,
        });

        return {
          user,
          success: true,
          message: 'User registered successfully',
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    login: async (_, { email, password, secretKey }: MutationLoginArgs) => {
      try {
        // Validate input against the schema with zod
        const validatedInput = loginInputSchema.parse({ email, password, secretKey });

        const loggedInUser = await UserService.login({
          email: validatedInput.email,
          password: validatedInput.password,
          secretKey: validatedInput.secretKey,
        });

        return {
          user: loggedInUser.user,
          token: loggedInUser.token,
          success: true,
          message: 'User logged in successfully',
        };
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    },

    resetPassword: async (_, { email, oldPassword, newPassword }: MutationResetPasswordArgs) => {
      try {
        const validatedInput = resetPasswordInputSchema.parse({ email, oldPassword, newPassword });

        const user = await UserService.resetPassword({
          email: validatedInput.email,
          oldPassword: validatedInput.oldPassword,
          newPassword: validatedInput.newPassword,
        });

        return {
          user,
          success: true,
          message: 'Password reset successfully',
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    enable2FA: async (_, { email }: MutationEnable2FAArgs) => {
      try {
        const validatedInput = enable2FAInputSchema.parse({ email });

        const code = await UserService.enable2FA(validatedInput.email);

        return {
          code,
          success: true,
          message: '2FA enabled successfully',
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Query: {
    regenerate2FAQrCode: async (_, args, context: IContext) => {
      try {
        const { email } = context.user;
        const validatedInput = enable2FAInputSchema.parse({ email });

        const qrCode = await UserService.regenerate2FAQrCode(validatedInput.email);

        return {
          code: qrCode,
          success: true,
          message: 'QR code generated successfully',
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

export default resolvers;
