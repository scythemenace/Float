const z = require("zod");

const signUpValidator = z.object({
  username: z.string().email().min(3).max(30),
  firstName: z.string().min(2),
  lastName: z.string().max(50),
  password: z.string().max(50),
});

const signInValidator = z.object({
  username: z.string().email().min(3).max(30),
  password: z.string().max(50),
});

const updateValidator = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().max(50).optional(),
  password: z.string().max(50).optional(),
});

module.exports = {
  signUpValidator,
  signInValidator,
  updateValidator,
};
