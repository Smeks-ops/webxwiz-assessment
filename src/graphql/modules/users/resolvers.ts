import {
  MutationCreateUserArgs,
  MutationLoginArgs,
  MutationResetPasswordArgs,
} from '../../../types/generated';
import UserService from './services';
import { loginInputSchema, registrationInputSchema, resetPasswordInputSchema } from './validators';

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

    login: async (_, { email, password }: MutationLoginArgs) => {
      try {
        // Validate input against the schema with zod
        const validatedInput = loginInputSchema.parse({ email, password });

        const loggedInUser = await UserService.login({
          email: validatedInput.email,
          password: validatedInput.password,
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
  },
};

export default resolvers;
