import { z } from "zod";

const signUpValidator = z.object({
  username: z.string().email().min(3).max(30),
  firstName: z.string().min(6),
  lastName: z.string().max(50),
  password: z.string().max(50),
});

const signInValidator = z.object({
  username: z.string().email().min(3).max(30),
  password: z.string().max(50),
});

const updateValidator = z.object({
  firstName: z.string().min(6),
  lastName: z.string().max(50),
  password: z.string().max(50),
});

module.exports = {
  signUpValidator,
  signInValidator,
  updateValidator,
};
