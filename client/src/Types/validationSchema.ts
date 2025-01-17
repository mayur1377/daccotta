
import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  username: z.string()
  .min(3, 'Username must be at least 3 characters long')
  .max(25, 'Username must not exceed 25 characters')
  .regex(/^[a-zA-Z][a-zA-Z0-9]+$/, 'Username must start with a letter and contain only letters and numbers'),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
  age: z.number().min(0, { message: "Age cannot be negative" }).max(100, { message: "Age cannot be more than 100" }).optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});


export type SignUpFormData = z.infer<typeof signUpSchema>;

