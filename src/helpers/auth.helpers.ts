import * as jwt from 'jsonwebtoken';

export const signToken = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  };
  
  export const verifyToken = async (token: string, hashKey) => {
    try {
      const decoded = await jwt.verify(token, hashKey);
      return { valid: true, decoded, expired: false };
    } catch (error) {
      return { valid: false, decoded: null, expired: true };
    }
  };

  export const generateUserSecretKey = async (text: string): Promise<string> => {
    try {
      let result = ' ';
      const characters =
        `${text}ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
      const charactersLength = characters.length;
      for (let i = 0; i < 18; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      const code = result;
      return code;
    } catch (error) {
      throw new Error(error);
    }
  };