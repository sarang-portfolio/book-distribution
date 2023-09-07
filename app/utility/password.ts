import {
  compareSync,
  genSaltSync,
  hashSync,
} from "bcryptjs";

export const createPassword = async () => {
  const alphaNumeric =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const symbols = "!@#$%^&**()";

  let password = "";
  for (let count = 0; count < 6; count++) {
    const shouldBeSymbol = Math.random() > 0.5;
    if (shouldBeSymbol) {
      const index = Math.floor(Math.random() * symbols.length);
      password += symbols[index];
      continue;
    }

    const index = Math.floor(Math.random() * alphaNumeric.length);
    password += alphaNumeric[index];
  }

  const hashedPassword = createHash(password);

  return hashedPassword;
};

export const comparePassword = (password: string, hashedPassword: string) => {
  return compareSync(password, hashedPassword);
};

export const createHash = (password: string) => {
  const salt = genSaltSync();

  const hashedPassword = hashSync(password, salt);

  return hashedPassword;
};
