import { MutationCreateUserArgs } from '../../../types/generated';
import UserService from './services';
import { registrationInputSchema } from './validators';

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
  },
};

export default resolvers;
