import { createToken } from "../../utility/authorize";
import { sendEmail } from "../../utility/email";
import { comparePassword, createHash } from "../../utility/password";
import userSchema, { UserSchema } from "../user/user.schema";
import userService from "../user/user.service";
import { IUser } from "../user/user.types";
import { AUTH_ERRORS } from "./auth.responses";
import { ICredentials } from "./auth.types";

const login = (credentials: ICredentials) => {
  const users = userService.getUsers();
  const user = users.find(
    (u) =>
      u.username === credentials.username &&
      comparePassword(credentials.password, u.password)
  );
  if (user?.accountStatus === false) {
    throw "ACCOUNT ACTIVATION REQUIRED";
  }
  if (!user) {
    throw AUTH_ERRORS.NOT_FOUND;
  }

  const token = createToken(user);

  return {
    token,
    role: user.role,
  };
};

const signup = (user: IUser) => {
  try {
    const existingUser = UserSchema.userDb.find(
      (u) => u.username === user.username
    );
    if (existingUser) {
      return "USER ALREADY EXIST";
    }
    const originalPassword = user.password;
    user.password = createHash(user.password);
    userSchema.create(user);

    sendEmail(
      "spencer35@ethereal.email",
      "Authorize Worker",
      `
            Hi spencer!,

            Please approve ${user.username}.
        `
    );
    return "WAITING FOR APPROVAL";
  } catch (e) {
    throw AUTH_ERRORS.INTERNAL;
  }
};

export default {
  login,
  signup,
};
