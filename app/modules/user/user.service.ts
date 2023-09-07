import { createPassword } from "../../utility/password";
import userSchema, { UserSchema } from "./user.schema";
import { IUser } from "./user.types";

const getUsers = () => userSchema.get();

const getWorkerList = () => userSchema.getWorker();

const createUser = async (user: IUser) => {
  const password = await createPassword();
  userSchema.create({ ...user, password });
};

const getPendingUser = () => userSchema.getUser();

const approvePendingUser = (id: string) => {
  const user = UserSchema.userDb.find((u) => u.id === id);
  return userSchema.updateUserStatus(user as IUser);
};

const deleteWorker = (userid: string) => {
  const deleteUser = userSchema.delete(userid);
  if (deleteUser) {
    return "USER DELETED";
  }
  return "USER NOT FOUND";
};

export default {
  getUsers,
  createUser,
  getWorkerList,
  getPendingUser,
  approvePendingUser,
  deleteWorker,
};
