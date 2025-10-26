import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .min(1, { message: "Email is required" })
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email is too long" }),
  password: z
    .string({ message: "Password is required" })
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(100, { message: "Password is too long" }),
});

export const signupSchema = z
  .object({
    name: z
      .string({ message: "Name is required" })
      .min(1, { message: "Name is required" })
      .trim()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(100, { message: "Name is too long" }),
    email: z
      .string({ message: "Email is required" })
      .min(1, { message: "Email is required" })
      .trim()
      .email({ message: "Please enter a valid email address" })
      .max(255, { message: "Email is too long" }),
    password: z
      .string({ message: "Password is required" })
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(100, { message: "Password is too long" }),
    confirmPassword: z
      .string({ message: "Please confirm your password" })
      .min(1, { message: "Please confirm your password" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(100, { message: "Password is too long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
