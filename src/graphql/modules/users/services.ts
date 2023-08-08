import IUser from '../../../interfaces/user.interface';
import User from '../../../models/User';
import * as bcrypt from 'bcrypt';

export default class UserService {
  static async registerUser(input: IUser) {
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
}
