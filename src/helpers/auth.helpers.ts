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