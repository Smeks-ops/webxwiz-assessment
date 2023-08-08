import { z } from 'zod';

export const registrationInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});