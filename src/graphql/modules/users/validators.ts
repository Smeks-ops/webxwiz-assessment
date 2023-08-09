import { z } from 'zod';

export const registrationInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const resetPasswordInputSchema = z.object({
  email: z.string().email(),
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});