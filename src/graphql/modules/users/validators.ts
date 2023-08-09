import { z } from 'zod';

export const registrationInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  secretKey: z.string().min(6).optional(),
});

export const resetPasswordInputSchema = z.object({
  email: z.string().email(),
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

export const enable2FAInputSchema = z.object({
  email: z.string().email(),
});