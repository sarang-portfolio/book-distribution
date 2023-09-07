import { body } from "express-validator";
import { validate } from "../../utility/validate";

export const SignupValidator = [
  body("username").isString().notEmpty().withMessage("username is required"),
  body("password")
    .isString()
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("password is invalid"),
  body("email").isEmail().withMessage("required email"),
  validate,
];
